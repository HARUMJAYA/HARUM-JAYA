import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ShieldCheck, TrendingUp, Loader2, Star, Sparkles } from "lucide-react";
import ReviewForm from "@/components/public/ReviewForm";
import ReviewList from "@/components/public/ReviewList";
import { Button } from "@/components/ui/button";

const Strategy = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className="space-y-32">
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

            {/* GOOGLE REVIEWS SECTION */}
            <div className="space-y-10">
              <div className="bg-[#f8f9fa] p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold text-3xl">G</span>
                    <span className="text-red-500 font-bold text-3xl">o</span>
                    <span className="text-yellow-500 font-bold text-3xl">o</span>
                    <span className="text-blue-500 font-bold text-3xl">g</span>
                    <span className="text-green-500 font-bold text-3xl">l</span>
                    <span className="text-red-500 font-bold text-3xl">e</span>
                    <span className="text-gray-700 font-bold text-3xl ml-2">Reviews</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-gray-800">4.9</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm">(308)</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-6 rounded-xl text-base shadow-lg shadow-blue-200"
                >
                  Review us on Google
                </Button>
              </div>

              {/* Verified Summary Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                 <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Sparkles size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-[13px] text-blue-600">AI-Generated Sum...</h4>
                          <p className="text-[10px] text-gray-400">Based on 308 Google reviews</p>
                       </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-[13px] font-bold text-gray-800 flex items-center gap-2">
                       ✓ Trusted and high-quality construction company
                    </p>
                 </div>
              </div>

              <ReviewList refreshKey={refreshKey} />
              
              <ReviewForm 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={handleReviewSuccess} 
              />
            </div>
          </div>
        )}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Strategy;