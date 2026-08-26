import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Target, Loader2 } from "lucide-react";

const VisionMission = () => {
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
          <h1 className="text-3xl font-bold italic uppercase tracking-tight">Visi & Misi</h1>
          <p className="text-gray-500 text-sm mt-1">Filosofi dan tujuan utama CV IM</p>
        </div>
      </div>
      <main className="container mx-auto max-w-4xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="space-y-16">
            <div className="relative pl-10 border-l-8 border-[#4834d4] py-4">
              <div className="absolute -left-6 top-0 bg-white p-2">
                <Target className="text-[#4834d4]" size={32} />
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-400 mb-6 italic">Visi Kami</h2>
              <p className="text-2xl text-gray-700 leading-relaxed italic font-light">
                {data.vision || "Menjadi mitra terpercaya dalam pembangunan infrastruktur berkualitas."}
              </p>
            </div>

            <div className="relative pl-10 border-l-8 border-[#2c3e50] py-4">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-400 mb-6 italic">Misi Kami</h2>
              <div className="text-lg text-gray-600 leading-loose whitespace-pre-line bg-gray-50 p-8 rounded-lg">
                {data.mission || "1. Memberikan kualitas konstruksi terbaik\n2. Inovasi berkelanjutan"}
              </div>
            </div>
          </div>
        )}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default VisionMission;