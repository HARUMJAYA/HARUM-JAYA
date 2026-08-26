import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ShieldCheck, TrendingUp, Loader2, Star, ExternalLink } from "lucide-react";

const Strategy = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      const { data: dbData } = await supabase.from("company_info").select("key, value");
      const formatted: any = {};
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
      <div className="bg-[#f8f9fa] py-16 border-b">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold italic uppercase tracking-tight">Nilai & Strategi</h1>
          <p className="text-gray-500 text-sm mt-1">Prinsip kerja dan pendekatan strategis CV IM</p>
        </div>
      </div>
      
      <main className="container mx-auto max-w-4xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="space-y-16">
            {/* Foto Tim & Review Section */}
            <div className="space-y-6 flex flex-col items-center">
              {/* Image container reduced to max-w-2xl */}
              <div className="relative group overflow-hidden rounded-xl shadow-xl border-4 border-gray-100 max-w-2xl w-full">
                <img 
                  src="/team-action.jpg" 
                  alt="Tim CV INGAT MATI sedang bekerja" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <h2 className="text-2xl md:text-4xl font-black italic text-white uppercase tracking-tighter drop-shadow-md">
                    CV INGAT MATI
                  </h2>
                </div>
              </div>
              
              {/* Review Section with purple-blue button */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100 w-full max-w-2xl">
                <div className="text-center md:text-left">
                  <h3 className="font-bold text-gray-800 uppercase tracking-wide text-sm">Kepuasan Anda adalah Prioritas Kami</h3>
                  <p className="text-xs text-gray-500">Bantu kami meningkatkan layanan dengan memberikan ulasan Anda.</p>
                </div>
                <a 
                  href="https://www.google.com/search?q=CV+INGAT+MATI+Banda+Aceh#lrd=0x3040375a00000001:0x0,3" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#4834d4] hover:bg-[#341f97] text-white px-6 py-3 rounded font-black uppercase tracking-widest text-[10px] transition-all shadow-lg hover:-translate-y-1"
                >
                  <Star size={14} fill="currentColor" />
                  BERI ULASAN GOOGLE
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold italic uppercase flex items-center gap-3 text-gray-800">
                  <ShieldCheck className="text-orange-500" size={28} /> Nilai Perusahaan
                </h2>
                <div className="bg-gray-50 p-8 border-l-4 border-orange-500 rounded-r-lg shadow-sm">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line italic">
                    {data.values || "Integritas, Kualitas, dan Profesionalisme adalah fondasi utama dalam setiap langkah operasional kami."}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-2xl font-bold italic uppercase flex items-center gap-3 text-gray-800">
                  <TrendingUp className="text-[#2c3e50]" size={28} /> Strategi Kami
                </h2>
                <div className="bg-gray-50 p-8 border-l-4 border-[#2c3e50] rounded-r-lg shadow-sm">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {data.strategy || "Kami fokus pada pengembangan SDM yang kompeten serta pemanfaatan teknologi konstruksi terkini untuk efisiensi dan ketepatan proyek."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Strategy;