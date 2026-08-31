import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Trash2, Loader2, Upload, ImageIcon, X } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const ProjectManager = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const categories = [
    "eksterior",
    "interior",
    "pekerjaan gedung",
    "pekerjaan rancang bangun",
    "pekerjaan sipil",
    "pekerjaan umum"
  ];

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (err: any) {
      showError("Gagal mengambil data proyek: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // Limit 5MB
        showError("Ukuran file terlalu besar (maks 5MB)");
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearForm = () => {
    setTitle("");
    setCategory("");
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !imageFile) {
      showError("Harap isi semua kolom dan pilih gambar");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload Gambar ke Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('projects')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // 2. Ambil URL Publik Gambar
      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);

      // 3. Simpan data ke tabel projects
      const { error: insertError } = await supabase.from("projects").insert([
        { 
          title, 
          category, 
          image_url: publicUrl 
        }
      ]);

      if (insertError) throw insertError;

      showSuccess("Proyek berhasil disimpan");
      clearForm();
      fetchProjects();
    } catch (error: any) {
      showError("Gagal menyimpan proyek: " + (error.message || "Terjadi kesalahan"));
      console.error("Upload error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek ini?")) return;

    try {
      // Hapus data dari tabel database
      const { error: deleteError } = await supabase.from("projects").delete().eq("id", id);
      if (deleteError) throw deleteError;

      // Coba hapus file dari storage jika URL-nya dari storage kita
      if (imageUrl && imageUrl.includes('storage.co/storage/v1/object/public/projects/')) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage.from('projects').remove([fileName]);
        }
      }

      showSuccess("Proyek berhasil dihapus");
      fetchProjects();
    } catch (err: any) {
      showError("Gagal menghapus: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
            <Plus size={20} className="text-[#4834d4]" /> Tambah Proyek yang Ditangani
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Judul Proyek</label>
                <Input 
                  placeholder="Contoh: Pembangunan Jembatan Merdeka" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-50 border-gray-200 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Kategori Proyek</label>
                <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Visual Proyek (Gambar)</label>
              <div 
                className={`relative border-2 border-dashed rounded-xl transition-all duration-200 min-h-[180px] flex flex-col items-center justify-center p-4 ${
                  previewUrl ? 'border-[#4834d4]/30 bg-[#4834d4]/5' : 'border-gray-200 hover:border-[#4834d4]/50 hover:bg-gray-50/80 bg-gray-50/30'
                }`}
              >
                {previewUrl ? (
                  <div className="relative group w-full flex flex-col items-center">
                    <div className="relative w-full max-w-[200px] h-[120px] rounded-lg overflow-hidden shadow-md mb-3">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => { setPreviewUrl(null); setImageFile(null); }}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        title="Hapus gambar"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-xs font-medium text-gray-500 italic">Gambar siap diunggah</p>
                  </div>
                ) : (
                  <label className="cursor-pointer w-full h-full absolute inset-0 flex flex-col items-center justify-center p-6">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3 text-[#4834d4]">
                      <Upload size={28} />
                    </div>
                    <p className="text-sm font-bold text-gray-700 mb-1">Pilih atau Seret Gambar</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">PNG, JPG up to 5MB</p>
                  </label>
                )}
              </div>
            </div>

            <div className="md:col-span-2 pt-2">
              <Button 
                type="submit" 
                className="w-full md:w-auto px-10 py-6 bg-[#4834d4] hover:bg-[#341f97] text-white font-bold rounded-lg transition-all shadow-lg shadow-[#4834d4]/20 flex items-center justify-center gap-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>SEDANG MEMPROSES...</span>
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    <span>SIMPAN PROYEK</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-gray-700">Daftar Inventaris Proyek Ditangani</CardTitle>
          <div className="text-[10px] font-bold text-gray-400 bg-white px-2 py-1 rounded border uppercase tracking-wider">
            Total: {projects.length}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
              <Loader2 className="animate-spin text-[#4834d4]" size={32} />
              <p className="text-xs text-gray-400 font-medium animate-pulse">MEMUAT DATA...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 bg-gray-50/20">
              <div className="inline-flex p-4 rounded-full bg-gray-100 text-gray-300 mb-4">
                <ImageIcon size={40} />
              </div>
              <p className="text-gray-500 font-medium italic">Belum ada proyek yang terdaftar.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[100px] font-bold text-xs">VISUAL</TableHead>
                    <TableHead className="font-bold text-xs">JUDUL PROYEK</TableHead>
                    <TableHead className="font-bold text-xs">KATEGORI</TableHead>
                    <TableHead className="text-right font-bold text-xs">MANAJEMEN</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell>
                        <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center shadow-sm border border-white">
                          {project.image_url ? (
                            <img 
                              src={project.image_url} 
                              alt={project.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon size={20} className="text-gray-300" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-gray-700 text-sm">{project.title}</TableCell>
                      <TableCell>
                        <span className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider border border-orange-100">
                          {project.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                          onClick={() => handleDelete(project.id, project.image_url)}
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

export default ProjectManager;