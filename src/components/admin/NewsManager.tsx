import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Loader2, Upload, ImageIcon, X, Newspaper } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const NewsManager = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
      showError("Gagal mengambil data berita: " + err.message);
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
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !content) {
      showError("Harap isi Judul, Penulis, dan Konten");
      return;
    }

    setIsSubmitting(true);
    try {
      let publicUrl = "";

      // Upload Gambar jika ada
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

      // Simpan data ke tabel news
      const { error: insertError } = await supabase.from("news").insert([
        { 
          title, 
          author, 
          content,
          image_url: publicUrl || null
        }
      ]);

      if (insertError) throw insertError;

      showSuccess("Berita berhasil diterbitkan");
      clearForm();
      fetchNews();
    } catch (error: any) {
      showError("Gagal menyimpan berita: " + (error.message || "Terjadi kesalahan"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;

    try {
      const { error: deleteError } = await supabase.from("news").delete().eq("id", id);
      if (deleteError) throw deleteError;

      if (imageUrl && imageUrl.includes('/storage/v1/object/public/news/')) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage.from('news').remove([fileName]);
        }
      }

      showSuccess("Berita berhasil dihapus");
      fetchNews();
    } catch (err: any) {
      showError("Gagal menghapus: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
            <Newspaper size={20} className="text-[#4834d4]" /> Tulis Berita Baru
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Judul Berita</label>
                  <Input 
                    placeholder="Masukkan judul berita..." 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Penulis / Sumber</label>
                  <Input 
                    placeholder="Contoh: Admin atau Nama Penulis" 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Gambar Utama (Opsional)</label>
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
              <label className="text-sm font-semibold text-gray-600">Konten Berita</label>
              <Textarea 
                placeholder="Tulis isi berita di sini..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-gray-50 min-h-[200px]"
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
                <><Plus className="mr-2" size={18} /> TERBITKAN BERITA</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="text-lg text-gray-700">Arsip Berita</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <Loader2 className="animate-spin text-[#4834d4]" size={32} />
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12 text-gray-500 italic">Belum ada berita yang diterbitkan.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[80px]">GAMBAR</TableHead>
                    <TableHead>JUDUL & PENULIS</TableHead>
                    <TableHead>TANGGAL</TableHead>
                    <TableHead className="text-right">AKSI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {news.map((item) => (
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