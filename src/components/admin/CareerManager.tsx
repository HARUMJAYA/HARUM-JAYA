import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Trash2, Loader2, Upload, ImageIcon, X, UserPlus } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const CareerManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const categories = [
    "Budaya kami",
    "Karir Area",
    "Daftar kerja",
    "Daftar praktek"
  ];

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      showError("Gagal mengambil data karir: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) {
      showError("Harap isi Judul dan Kategori");
      return;
    }

    setIsSubmitting(true);
    try {
      let publicUrl = null;

      // Upload Gambar jika ada
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `career-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('careers')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: url } } = supabase.storage
          .from('careers')
          .getPublicUrl(fileName);
        
        publicUrl = url;
      }

      // Simpan Data
      const { error: insertError } = await supabase.from("careers").insert([
        { title, category, description, image_url: publicUrl }
      ]);

      if (insertError) throw insertError;

      showSuccess("Informasi karir berhasil disimpan");
      clearForm();
      fetchCareers();
    } catch (error: any) {
      showError("Gagal menyimpan data karir: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Hapus data karir ini?")) return;

    try {
      const { error: deleteError } = await supabase.from("careers").delete().eq("id", id);
      if (deleteError) throw deleteError;

      if (imageUrl && imageUrl.includes('/storage/v1/object/public/careers/')) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage.from('careers').remove([fileName]);
        }
      }

      showSuccess("Data karir berhasil dihapus");
      fetchCareers();
    } catch (err: any) {
      showError("Gagal menghapus: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
            <UserPlus size={20} className="text-[#4834d4]" /> Tambah Info Karir
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Judul / Posisi</label>
                  <Input 
                    placeholder="Contoh: Site Engineer atau Budaya Kerja" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Gambar Pendukung (Opsional)</label>
                <div className={`relative border-2 border-dashed rounded-xl min-h-[145px] flex flex-col items-center justify-center p-4 transition-all ${
                  previewUrl ? 'border-[#4834d4]/30 bg-[#4834d4]/5' : 'border-gray-200 bg-gray-50/30'
                }`}>
                  {previewUrl ? (
                    <div className="relative w-full flex flex-col items-center">
                      <div className="relative w-32 h-20 rounded overflow-hidden shadow-sm mb-2">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => { setPreviewUrl(null); setImageFile(null); }} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"><X size={12} /></button>
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
              <label className="text-sm font-semibold text-gray-600">Deskripsi / Detail</label>
              <Textarea 
                placeholder="Tuliskan detail pekerjaan atau informasi budaya di sini..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 min-h-[100px]"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="bg-[#4834d4] hover:bg-[#341f97] text-white font-bold px-8">
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
              SIMPAN INFO KARIR
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="text-lg text-gray-700">Daftar Karir & Budaya</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#4834d4]" /></div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-400 italic">Belum ada data karir terdaftar.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[80px]">GAMBAR</TableHead>
                    <TableHead>JUDUL / POSISI</TableHead>
                    <TableHead>KATEGORI</TableHead>
                    <TableHead className="text-right">AKSI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
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
                      <TableCell className="font-bold text-gray-800 text-sm">{item.title}</TableCell>
                      <TableCell>
                        <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold border border-green-100 uppercase">
                          {item.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600" onClick={() => handleDelete(item.id, item.image_url)}>
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

export default CareerManager;