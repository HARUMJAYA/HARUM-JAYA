import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Upload, ImageIcon, X } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const CompanyManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Data state
  const [data, setData] = useState<Record<string, string>>({
    vision: "",
    mission: "",
    values: "",
    strategy: "",
    structure_url: "",
    awards: ""
  });

  const [structureFile, setStructureFile] = useState<File | null>(null);
  const [structurePreview, setStructurePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    setLoading(true);
    try {
      const { data: dbData, error } = await supabase
        .from("company_info")
        .select("key, value");
      
      if (error) throw error;
      
      const formattedData: Record<string, string> = {};
      dbData?.forEach(item => {
        formattedData[item.key] = item.value;
      });
      
      setData(prev => ({ ...prev, ...formattedData }));
      if (formattedData.structure_url) setStructurePreview(formattedData.structure_url);
      
    } catch (err: any) {
      showError("Gagal mengambil data perusahaan");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStructureFile(file);
      setStructurePreview(URL.createObjectURL(file));
    }
  };

  const saveInfo = async (key: string) => {
    setSaving(true);
    try {
      let finalValue = data[key];

      // Jika key adalah struktur dan ada file baru, upload dulu
      if (key === "structure_url" && structureFile) {
        const fileExt = structureFile.name.split('.').pop();
        const fileName = `structure-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('company')
          .upload(fileName, structureFile);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('company')
          .getPublicUrl(fileName);
          
        finalValue = publicUrl;
      }

      const { error } = await supabase
        .from("company_info")
        .upsert({ key, value: finalValue }, { onConflict: 'key' });

      if (error) throw error;
      showSuccess(`Berhasil memperbarui ${key.replace('_', ' ')}`);
      
      if (key === "structure_url") {
        setStructureFile(null);
        setData(prev => ({ ...prev, structure_url: finalValue }));
      }
    } catch (err: any) {
      showError("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="vision-mission" className="w-full">
        <TabsList className="bg-white border mb-4 p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="vision-mission" className="px-4 py-2">Visi & Misi</TabsTrigger>
          <TabsTrigger value="values-strategy" className="px-4 py-2">Nilai & Strategi</TabsTrigger>
          <TabsTrigger value="structure" className="px-4 py-2">Struktur Organisasi</TabsTrigger>
          <TabsTrigger value="awards" className="px-4 py-2">Penghargaan & Sertifikat</TabsTrigger>
        </TabsList>

        <TabsContent value="vision-mission" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b">
              <CardTitle className="text-lg">Visi Perusahaan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <Textarea 
                placeholder="Tuliskan visi perusahaan di sini..."
                value={data.vision}
                onChange={(e) => handleInputChange("vision", e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={() => saveInfo("vision")} disabled={saving} className="bg-[#4834d4]">
                <Save size={18} className="mr-2" /> Simpan Visi
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b">
              <CardTitle className="text-lg">Misi Perusahaan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <Textarea 
                placeholder="Tuliskan misi perusahaan di sini..."
                value={data.mission}
                onChange={(e) => handleInputChange("mission", e.target.value)}
                className="min-h-[150px]"
              />
              <Button onClick={() => saveInfo("mission")} disabled={saving} className="bg-[#4834d4]">
                <Save size={18} className="mr-2" /> Simpan Misi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="values-strategy" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b">
              <CardTitle className="text-lg">Nilai-Nilai Perusahaan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <Textarea 
                placeholder="Contoh: Integritas, Inovasi, Kualitas..."
                value={data.values}
                onChange={(e) => handleInputChange("values", e.target.value)}
                className="min-h-[150px]"
              />
              <Button onClick={() => saveInfo("values")} disabled={saving} className="bg-[#4834d4]">
                <Save size={18} className="mr-2" /> Simpan Nilai
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b">
              <CardTitle className="text-lg">Strategi Perusahaan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <Textarea 
                placeholder="Tuliskan strategi perusahaan..."
                value={data.strategy}
                onChange={(e) => handleInputChange("strategy", e.target.value)}
                className="min-h-[150px]"
              />
              <Button onClick={() => saveInfo("strategy")} disabled={saving} className="bg-[#4834d4]">
                <Save size={18} className="mr-2" /> Simpan Strategi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure">
          <Card className="border-none shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b">
              <CardTitle className="text-lg">Struktur Organisasi</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-center">
              <div className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
                structurePreview ? 'border-orange-200 bg-orange-50/20' : 'border-gray-200 bg-gray-50/30'
              }`}>
                {structurePreview ? (
                  <div className="flex flex-col items-center">
                    <img src={structurePreview} alt="Struktur" className="max-w-full h-auto max-h-[400px] rounded shadow-lg mb-4" />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => { setStructurePreview(null); setStructureFile(null); }}
                      className="text-red-500 border-red-200 hover:bg-red-50"
                    >
                      <X size={14} className="mr-2" /> Hapus / Ganti Gambar
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center py-10">
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                      <Upload size={32} className="text-gray-400" />
                    </div>
                    <p className="font-bold text-gray-700">Unggah Struktur Organisasi</p>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">PNG, JPG up to 10MB</p>
                  </label>
                )}
              </div>
              
              <Button 
                onClick={() => saveInfo("structure_url")} 
                disabled={saving || (!structureFile && data.structure_url === structurePreview)} 
                className="bg-[#4834d4] w-full max-w-xs"
              >
                {saving ? <Loader2 className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
                Simpan Gambar Struktur
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="awards">
          <Card className="border-none shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b">
              <CardTitle className="text-lg">Penghargaan & Sertifikat</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-xs text-gray-500 italic mb-2">Tuliskan penghargaan atau sertifikat (bisa dalam format daftar/list)</p>
              <Textarea 
                placeholder="Contoh: ISO 9001:2015, Sertifikat Keahlian..."
                value={data.awards}
                onChange={(e) => handleInputChange("awards", e.target.value)}
                className="min-h-[200px]"
              />
              <Button onClick={() => saveInfo("awards")} disabled={saving} className="bg-[#4834d4]">
                <Save size={18} className="mr-2" /> Simpan Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyManager;