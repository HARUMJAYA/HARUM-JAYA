import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { Loader2, ImageIcon } from "lucide-react";

const Organization = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      const { data } = await supabase.from("company_info").select("value").eq("key", "structure_url").single();
      if (data) setUrl(data.value);
      setLoading(false);
    };
    fetchInfo();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <div className="bg-[#f8f9fa] py-12 border-b">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold italic uppercase tracking-tight">Struktur Organisasi</h1>
          <p className="text-gray-500 text-sm mt-1">Manajemen dan tata kelola profesional CV IM</p>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="max-w-5xl mx-auto text-center">
            {url ? (
              <div className="bg-white p-6 shadow-2xl rounded-2xl border">
                <img src={url} alt="Struktur Organisasi" className="w-full h-auto" />
              </div>
            ) : (
              <div className="bg-gray-50 p-32 rounded-2xl flex flex-col items-center text-gray-400">
                <ImageIcon size={64} className="mb-4 opacity-20" />
                <p className="italic">Bagan struktur organisasi belum tersedia.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Organization;