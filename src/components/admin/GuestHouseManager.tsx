import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Loader2, Upload, ImageIcon, X, MapPin, Globe } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const GuestHouseManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("guest_houses")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      showError("Gagal mengambil data guest house: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearForm = () => {
    setName("");
    setAddress("");
    setMapUrl("");
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !imageFile) {
      showError("Harap isi Nama, Alamat, dan pilih Gambar");
      return;
    }

    setIsSubmitting(true);
    try {
      let publicUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `gh-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('guesthouses')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: url } } = supabase.storage
          .from('guesthouses')
          .getPublicUrl(fileName);
        
        publicUrl = url;
      }

      const { error: insertError } = await supabase.from("guest_houses").insert([
        { name, address, map_url: mapUrl, image_url: publicUrl }
      ]);

      if (insertError) throw insertError;

      showSuccess("Guest house berhasil ditambahkan");
      clearForm();
      fetchItems();
    } catch (error: any) {
      showError("Gagal menyimpan data: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Hapus data guest house ini?")) return;

    try {
      const { error: deleteError } = await supabase.from("guest_houses").delete().eq("id", id);
      if (deleteError) throw deleteError;

      if (imageUrl && imageUrl.includes('/storage/v1/object/public/guesthouses/')) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage.from('guesthouses').remove([fileName]);
        }
      }

      showSuccess("Data berhasil dihapus");
      fetchItems();
    } catch (err: any) {
      showError("Gagal menghapus: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
            <Plus size={20} className="text-[#4834d4]" /> Tambah Guest House Baru
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Nama Guest House</label>
                  <Input 
                    placeholder="Contoh: Guest House Harum Jaya" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Alamat Lengkap (Lokasi)</label>
                  <Input 
                    placeholder="Masukkan alamat lengkap..." 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Tautan Peta (Google Maps URL)</label>
                  <Input 
                    placeholder="Tempel tautan Google Maps di sini..." 
                    value={mapUrl}
                    onChange={(e) => setMapUrl(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Foto Guest House</label>
                <div className={`relative border-2 border-dashed rounded-xl min-h-[190px] flex flex-col items-center justify-center p-4 transition-all ${
                  previewUrl ? 'border-[#4834d4]/30 bg-[#4834d4]/5' : 'border-gray-200 bg-gray-50/30'
                }`}>
                  {previewUrl ? (
                    <div className="relative w-full flex flex-col items-center">
                      <div className="relative w-full max-w-[240px] h-32 rounded-lg overflow-hidden shadow-sm mb-2">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => { setPreviewUrl(null); setImageFile(null); }} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"><X size={12} /></button>
                      </div>
                      <p className="text-xs text-gray-500">Gambar terpilih</p>
                    </div>
                  ) : (
                    <label className="cursor-pointer w-full h-full absolute inset-0 flex flex-col items-center justify-center">
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      <Upload size={28} className="text-gray-400 mb-2" />
                      <p className="text-sm font-medium text-gray-600">Klik untuk unggah foto</p>
                      <p className="text-[10px] text-gray-400 mt-1">PNG, JPG, JPEG (Max. 5MB)</p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="bg-[#4834d4] hover:bg-[#341f97] text-white font-bold px-10">
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
              SIMPAN DATA GUEST HOUSE
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-gray-700">Daftar Guest House</CardTitle>
          <span className="text-[10px] font-bold text-gray-400 bg-white px-2 py-1 rounded border">TOTAL: {items.length}</span>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#4834d4]" /></div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-400 italic">Belum ada guest house terdaftar.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[100px]">FOTO</TableHead>
                    <TableHead>NAMA & LOKASI</TableHead>
                    <TableHead>PETA</TableHead>
                    <TableHead className="text-right">AKSI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="w-16 h-12 rounded bg-gray-100 overflow-hidden shadow-sm">
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={20} className="text-gray-300 mx-auto mt-3" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                          <MapPin size={10} /> {item.address}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.map_url ? (
                          <a 
                            href={item.map_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100 hover:bg-blue-100 transition-colors"
                          >
                            <Globe size={10} /> LIHAT PETA
                          </a>
                        ) : (
                          <span className="text-[10px] text-gray-400 italic">Tidak ada tautan</span>
                        )}
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

export default GuestHouseManager;