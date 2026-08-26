import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ShieldCheck, TrendingUp, Loader2 } from "lucide-react";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold italic uppercase flex items-center gap-3 text-gray-800">
                <ShieldCheck className="text-orange-500" size={28} /> Nilai Perusahaan
              </h2>
              <div className="bg-gray-50 p-8 border-l-4 border-orange-500 rounded-r-lg">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line italic">
                  {data.values || "Integritas, Kualitas, dan Profesionalisme adalah fondasi utama dalam setiap langkah operasional kami."}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold italic uppercase flex items-center gap-3 text-gray-800">
                <TrendingUp className="text-[#2c3e50]" size={28} /> Strategi Kami
              </h2>
              <div className="bg-gray-50 p-8 border-l-4 border-[#2c3e50] rounded-r-lg">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
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