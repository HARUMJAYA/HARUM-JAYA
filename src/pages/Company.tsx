import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Building2, Award, Target, LayoutTemplate, Loader2 } from "lucide-react";

const Company = () => {
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      const { data: dbData } = await supabase.from("company_info").select("key, value");
      const formatted: Record<string, string> = {};
      dbData?.forEach(item => {
        formatted[item.key] = item.value;
      });
      setData(formatted);
      setLoading(false);
    };
    fetchInfo();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <div className="bg-[#f8f9fa] py-20 border-b">
        <div className="container mx-auto max-w-4xl text-center px-4">
          <h1 className="text-5xl font-bold italic text-gray-800 tracking-tighter uppercase mb-6">Tentang Kami</h1>
          <div className="w-20 h-1.5 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-gray-500 text-lg font-light leading-relaxed">Membangun impian Anda menjadi kenyataan melalui keunggulan teknik dan dedikasi profesional.</p>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-4 py-24">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="space-y-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center" id="vision">
              <div>
                <h2 className="text-3xl font-bold italic uppercase flex items-center gap-4 mb-8 text-gray-800">
                  <Target className="text-orange-500" size={32} /> Visi & Misi
                </h2>
                <div className="space-y-12">
                  <div className="relative pl-8 border-l-4 border-orange-500">
                    <h3 className="font-bold text-lg mb-3 uppercase tracking-widest text-gray-400">Visi Kami</h3>
                    <p className="text-gray-600 leading-relaxed italic">{data.vision || "Menjadi perusahaan konstruksi terdepan di Indonesia."}</p>
                  </div>
                  <div className="relative pl-8 border-l-4 border-[#2c3e50]">
                    <h3 className="font-bold text-lg mb-3 uppercase tracking-widest text-gray-400">Misi Kami</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{data.mission || "Memberikan layanan berkualitas tinggi dan inovatif."}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-12 rounded-2xl" id="awards">
                <h2 className="text-3xl font-bold italic uppercase flex items-center gap-4 mb-8 text-gray-800">
                  <Award className="text-orange-500" size={32} /> Penghargaan
                </h2>
                <p className="text-gray-600 leading-loose whitespace-pre-line">{data.awards || "Belum ada data penghargaan terdaftar."}</p>
              </div>
            </div>

            {data.structure_url && (
              <div className="text-center bg-gray-50 p-16 rounded-3xl" id="structure">
                <h2 className="text-3xl font-bold italic uppercase flex items-center justify-center gap-4 mb-12 text-gray-800">
                  <LayoutTemplate className="text-orange-500" size={32} /> Struktur Organisasi
                </h2>
                <div className="max-w-4xl mx-auto bg-white p-4 shadow-2xl rounded-xl">
                  <img src={data.structure_url} alt="Struktur Organisasi" className="w-full h-auto" />
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16" id="values">
               <div className="space-y-6">
                 <h2 className="text-3xl font-bold italic uppercase text-gray-800 border-b-2 border-orange-500 pb-2 w-fit">Nilai Perusahaan</h2>
                 <p className="text-gray-600 leading-relaxed whitespace-pre-line">{data.values}</p>
               </div>
               <div className="space-y-6">
                 <h2 className="text-3xl font-bold italic uppercase text-gray-800 border-b-2 border-orange-500 pb-2 w-fit">Strategi Kami</h2>
                 <p className="text-gray-600 leading-relaxed whitespace-pre-line">{data.strategy}</p>
               </div>
            </div>
          </div>
        )}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Company;