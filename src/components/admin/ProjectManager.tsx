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
import { Plus, Trash2, Loader2, Upload, ImageIcon } from "lucide-react";
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
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) showError("Gagal mengambil data proyek");
    else setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !imageFile) {
      showError("Judul, Kategori, dan Gambar wajib diisi");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload Gambar ke Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('projects')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // 2. Ambil URL Publik Gambar
      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);

      // 3. Simpan data ke tabel projects
      const { error: insertError } = await supabase.from("projects").insert([
        { title, category, image_url: publicUrl }
      ]);

      if (insertError) throw insertError;

      showSuccess("Proyek berhasil ditambahkan");
      setTitle("");
      setCategory("");
      setImageFile(null);
      setPreviewUrl(null);
      fetchProjects();
    } catch (error: any) {
      showError("Gagal menyimpan proyek: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek ini?")) return;

    // Hapus data dari tabel
    const { error: deleteError } = await supabase.from("projects").delete().eq("id", id);
    
    if (deleteError) {
      showError("Gagal menghapus data proyek");
      return;
    }

    // Coba hapus file dari storage jika ada URL
    if (imageUrl) {
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage.from('projects').remove([fileName]);
      }
    }

    showSuccess("Proyek berhasil dihapus");
    fetchProjects();
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus size={20} /> Tambah Proyek Baru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Judul Proyek</label>
                <Input 
                  placeholder="Contoh: Pembangunan Gedung A" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Kategori</label>
                <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Unggah Gambar</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[150px] relative">
                {previewUrl ? (
                  <div className="relative w-full h-full flex flex-col items-center">
                    <img src={previewUrl} alt="Preview" className="max-h-[120px] rounded object-cover mb-2" />
                    <button 
                      type="button"
                      onClick={() => { setPreviewUrl(null); setImageFile(null); }}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Hapus & ganti gambar
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="text-gray-400 mb-2" size={32} />
                    <p className="text-xs text-gray-500 mb-2">Klik untuk pilih gambar</p>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="md:col-span-2 bg-[#4834d4] hover:bg-[#341f97]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin mr-2" /> Sedang menyimpan...</>
              ) : (
                <><Plus className="mr-2" /> Simpan Proyek</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daftar Proyek</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Belum ada proyek yang ditambahkan.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gambar</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                          {project.image_url ? (
                            <img 
                              src={project.image_url} 
                              alt={project.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon size={20} className="text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell className="capitalize">{project.category}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
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