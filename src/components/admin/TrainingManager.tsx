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
import { Plus, Trash2, Loader2, Upload, ImageIcon, X, Monitor } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const TrainingManager = () => {
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
    "Akademik Tukang",
    "Bimtek",
    "BIMTEK - Metodologi Pelatihan",
    "Open Training (Calon Asesor Kompetensi BNSP)",
    "SKK (Sertifikasi Kompetisi Kerja)"
  ];

  const fetchTrainings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("trainings")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      showError("Gagal mengambil data pelatihan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
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

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `training-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('trainings')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: url } } = supabase.storage
          .from('trainings')
          .getPublicUrl(fileName);
        
        publicUrl = url;
      }

      const { error: insertError } = await supabase.from("trainings").insert([
        { title, category, description, image_url: publicUrl }
      ]);

      if (insertError) throw insertError;

      showSuccess("Data pelatihan berhasil disimpan");
      clearForm();
      fetchTrainings();
    } catch (error: any) {
      showError("Gagal menyimpan data pelatihan: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Hapus data pelatihan ini?")) return;

    try {
      const { error: deleteError } = await supabase.from("trainings").delete().eq("id", id);
      if (deleteError) throw deleteError;

      if (imageUrl && imageUrl.includes('/storage/v1/object/public/trainings/')) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage.from('trainings').remove([fileName]);
        }
      }

      showSuccess("Data pelatihan berhasil dihapus");
      fetchTrainings();
    } catch (err: any) {
      showError("Gagal menghapus: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
            <Monitor size={20} className="text-[#4834d4]" /> Tambah Info Pelatihan
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Judul Pelatihan</label>
                  <Input 
                    placeholder="Contoh: Pelatihan Asesor Kompetensi" 
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
                <label className="text-sm font-semibold text-gray-600">Poster / Gambar (Opsional)</label>
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
                      <p className="text-xs text-gray-500">Klik untuk unggah poster</p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Deskripsi / Detail Pelatihan</label>
              <Textarea 
                placeholder="Tuliskan detail jadwal, persyaratan, atau informasi lainnya..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 min-h-[100px]"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="bg-[#4834d4] hover:bg-[#341f97] text-white font-bold px-8">
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
              SIMPAN INFO PELATIHAN
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="text-lg text-gray-700">Daftar Pelatihan Terdaftar</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#4834d4]" /></div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-400 italic">Belum ada data pelatihan terdaftar.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[80px]">POSTER</TableHead>
                    <TableHead>JUDUL PELATIHAN</TableHead>
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
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100">
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

export default TrainingManager;