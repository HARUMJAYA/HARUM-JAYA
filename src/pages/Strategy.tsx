import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ShieldCheck, TrendingUp, Loader2, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      
      {/* New Hero Section */}
      <section className="relative w-full h-[500px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/strategy-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter mb-4 animate-in fade-in slide-in-from-left duration-700">
              CV INGAT MATI
            </h1>
            <p className="text-xl md:text-2xl font-bold text-orange-400 italic uppercase mb-8 tracking-widest animate-in fade-in slide-in-from-left duration-1000">
              Contractor & Leveransier
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://www.google.com/search?q=CV+INGAT+MATI+Banda+Aceh#lrd=0x3040375a00000001:0x0,3" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-6 px-8 rounded-none flex items-center gap-2 shadow-xl transition-all hover:scale-105">
                  <Star fill="currentColor" size={18} />
                  BERI ULASAN GOOGLE
                  <ExternalLink size={16} />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-7xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <h2 className="text-3xl font-bold italic uppercase flex items-center gap-3 text-gray-800">
                <ShieldCheck className="text-orange-500" size={32} /> Nilai Perusahaan
              </h2>
              <div className="bg-gray-50 p-10 border-l-8 border-orange-500 rounded-r-xl shadow-sm">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg italic">
                  {data.values || "Integritas, Kualitas, dan Profesionalisme adalah fondasi utama dalam setiap langkah operasional kami."}
                </p>
              </div>
            </div>

            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <h2 className="text-3xl font-bold italic uppercase flex items-center gap-3 text-gray-800">
                <TrendingUp className="text-[#2c3e50]" size={32} /> Strategi Bisnis
              </h2>
              <div className="bg-gray-50 p-10 border-l-8 border-[#2c3e50] rounded-r-xl shadow-sm">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                  {data.strategy || "Kami fokus pada pengembangan SDM yang kompeten serta pemanfaatan teknologi konstruksi terkini untuk efisiensi dan ketepatan proyek."}
                </p>
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