import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Award, Loader2, ScrollText } from "lucide-react";

const Awards = () => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      const { data } = await supabase.from("company_info").select("value").eq("key", "awards").single();
      if (data) setContent(data.value);
      setLoading(false);
    };
    fetchInfo();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      {/* Header diubah menjadi Hitam */}
      <div className="bg-[#1a1a1a] text-white py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <Award size={48} className="mx-auto mb-4 opacity-50 text-gray-400" />
          <h1 className="text-4xl font-bold italic uppercase tracking-tighter">Penghargaan & Sertifikat</h1>
          <p className="text-gray-400 mt-2">Bukti komitmen kami terhadap kualitas dan standar profesional</p>
        </div>
      </div>
      <main className="container mx-auto max-w-4xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-black" size={40} /></div>
        ) : (
          <div className="bg-gray-50 p-12 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="flex items-center gap-4 mb-8 text-gray-800 pb-4 border-b">
              {/* Ikon diubah menjadi Hitam */}
              <ScrollText className="text-black" size={32} />
              <h2 className="text-2xl font-bold italic uppercase">Pencapaian Kami</h2>
            </div>
            <div className="text-gray-600 leading-loose whitespace-pre-line text-lg italic">
              {content || "Data penghargaan sedang diperbarui oleh tim manajemen."}
            </div>
          </div>
        )}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Awards;