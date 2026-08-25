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
      <div className="bg-[#2c3e50] text-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold italic uppercase tracking-tighter">Nilai & Strategi</h1>
          <p className="text-gray-400 mt-2">Pilar kekuatan dan langkah strategis operasional kami</p>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold italic uppercase flex items-center gap-3 text-gray-800">
                <ShieldCheck className="text-orange-500" size={28} /> Nilai Perusahaan
              </h2>
              <div className="bg-gray-50 p-10 border-t-4 border-orange-500 rounded-b-xl">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                  {data.values || "Integritas, Kualitas, dan Profesionalisme."}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold italic uppercase flex items-center gap-3 text-gray-800">
                <TrendingUp className="text-blue-500" size={28} /> Strategi Bisnis
              </h2>
              <div className="bg-gray-50 p-10 border-t-4 border-blue-500 rounded-b-xl">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                  {data.strategy || "Pengembangan SDM dan pemanfaatan teknologi terkini."}
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