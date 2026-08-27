import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ShieldCheck, TrendingUp, Loader2, Star, MessageSquareQuote } from "lucide-react";
import ReviewForm from "@/components/public/ReviewForm";
import ReviewList from "@/components/public/ReviewList";

const Strategy = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

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

  const handleReviewSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

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
      
      <main className="container mx-auto max-w-7xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="space-y-24">
            {/* Visi Misi Summary Section */}
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

            {/* Native Review Section */}
            <div className="space-y-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-blue-50 p-3 rounded-full text-[#4834d4]">
                  <MessageSquareQuote size={32} />
                </div>
                <h2 className="text-3xl font-bold italic uppercase text-gray-800">Ulasan & Kepuasan Pelanggan</h2>
                <div className="w-20 h-1 bg-orange-500"></div>
                <p className="text-gray-500 max-w-2xl">Pendapat Anda adalah kunci kesuksesan kami. Berikan penilaian langsung di sini untuk membantu kami menjadi lebih baik.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-1 sticky top-24">
                  <ReviewForm onSuccess={handleReviewSuccess} />
                </div>
                <div className="lg:col-span-2">
                  <ReviewList refreshKey={refreshKey} />
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