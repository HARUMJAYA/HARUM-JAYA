import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Trash2, Loader2, Upload, ImageIcon, X, Newspaper, Heart, Camera, CalendarDays } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const NewsManager = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("Semua");
  
  // Form state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Berita");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const categories = [
    { label: "Berita", icon: <Newspaper size={14} /> },
    { label: "CSR", icon: <Heart size={14} /> },
    { label: "Kegiatan", icon: <CalendarDays size={14} /> },
    { label: "Galeri", icon: <Camera size={14} /> }
  ];

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("published_at", { ascending: false });
      
      if (error) throw error;
      setNews(data || []);
    } catch (err: any) {
      showError("Gagal mengambil data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showError("Ukuran file terlalu besar (maks 5MB)");
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setCategory("Berita");
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || (category !== "Galeri" && !content)) {
      showError("Harap lengkapi data yang wajib diisi");
      return;
    }

    setIsSubmitting(true);
    try {
      let publicUrl = "";

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('news')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: url } } = supabase.storage
          .from('news')
          .getPublicUrl(filePath);
        
        publicUrl = url;
      }

      const { error: insertError } = await supabase.from("news").insert([
        { 
          title, 
          author, 
          content,
          category,
          image_url: publicUrl || null
        }
      ]);

      if (insertError) throw insertError;

      showSuccess(`${category} berhasil disimpan`);
      clearForm();
      fetchNews();
    } catch (error: any) {
      showError("Gagal menyimpan: " + (error.message || "Terjadi kesalahan"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      const { error: deleteError } = await supabase.from("news").delete().eq("id", id);
      if (deleteError) throw deleteError;

      if (imageUrl && imageUrl.includes('/storage/v1/object/public/news/')) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage.from('news').remove([fileName]);
        }
      }

      showSuccess("Data berhasil dihapus");
      fetchNews();
    } catch (err: any) {
      showError("Gagal menghapus: " + err.message);
    }
  };

  const filteredNews = activeTab === "Semua" 
    ? news 
    : news.filter(item => item.category === activeTab);

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
            <Plus size={20} className="text-[#4834d4]" /> Tambah Konten Baru
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Judul Konten</label>
                  <Input 
                    placeholder="Masukkan judul berita/kegiatan..." 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">Penulis / Sumber</label>
                    <Input 
                      placeholder="Admin" 
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">Kategori</label>
                    <Select onValueChange={setCategory} value={category}>
                      <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.label} value={cat.label}>
                            <div className="flex items-center gap-2">
                              {cat.icon} {cat.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Gambar Utama / Foto Galeri</label>
                <div className={`relative border-2 border-dashed rounded-xl min-h-[145px] flex flex-col items-center justify-center p-4 transition-all ${
                  previewUrl ? 'border-[#4834d4]/30 bg-[#4834d4]/5' : 'border-gray-200 bg-gray-50/30'
                }`}>
                  {previewUrl ? (
                    <div className="relative w-full flex flex-col items-center">
                      <div className="relative w-32 h-20 rounded overflow-hidden shadow-sm mb-2">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => { setPreviewUrl(null); setImageFile(null); }}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer w-full h-full absolute inset-0 flex flex-col items-center justify-center">
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">Klik untuk unggah gambar</p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">
                Konten / Deskripsi {category === 'Galeri' && '(Opsional)'}
              </label>
              <Textarea 
                placeholder="Tulis isi berita atau keterangan kegiatan di sini..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-gray-50 min-h-[150px]"
              />
            </div>

            <Button 
              type="submit" 
              className="bg-[#4834d4] hover:bg-[#341f97] text-white font-bold px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin mr-2" size={18} /> MEMPROSES...</>
              ) : (
                <><Plus className="mr-2" size={18} /> SIMPAN {category.toUpperCase()}</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg text-gray-700">Daftar Konten</CardTitle>
          <Tabs defaultValue="Semua" className="w-full sm:w-auto" onValueChange={setActiveTab}>
            <TabsList className="bg-white border">
              <TabsTrigger value="Semua">Semua</TabsTrigger>
              {categories.map(cat => (
                <TabsTrigger key={cat.label} value={cat.label}>{cat.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <Loader2 className="animate-spin text-[#4834d4]" size={32} />
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12 text-gray-500 italic">Belum ada konten dalam kategori {activeTab}.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[80px]">MEDIA</TableHead>
                    <TableHead>JUDUL & PENULIS</TableHead>
                    <TableHead>KATEGORI</TableHead>
                    <TableHead>TANGGAL</TableHead>
                    <TableHead className="text-right">AKSI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNews.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={20} className="text-gray-300" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-gray-800 text-sm line-clamp-1">{item.title}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-medium">Oleh: {item.author}</p>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.category === 'CSR' ? 'bg-pink-50 text-pink-600 border-pink-100' :
                          item.category === 'Kegiatan' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                          item.category === 'Galeri' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                          'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {item.category?.toUpperCase() || 'BERITA'}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {new Date(item.published_at).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-400 hover:text-red-600"
                          onClick={() => handleDelete(item.id, item.image_url)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsManager;