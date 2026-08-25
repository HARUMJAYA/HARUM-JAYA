import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Loader2, Monitor } from "lucide-react";

interface TrainingCategoryProps {
  category: string;
  title: string;
}

const TrainingCategory = ({ category, title }: TrainingCategoryProps) => {
  const [trainings, setTrainings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainings = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("trainings")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });
      
      if (data) setTrainings(data);
      setLoading(false);
    };
    fetchTrainings();
  }, [category]);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <div className="bg-[#f39c12] text-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold italic uppercase tracking-tighter">{title}</h1>
          <p className="mt-2 text-gray-100">Program pelatihan kategori {category}</p>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#f39c12]" size={40} /></div>
        ) : trainings.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <Monitor size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 italic">Belum ada informasi pelatihan untuk kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {trainings.map((t) => (
              <div key={t.id} className="group border-2 border-gray-50 hover:border-orange-500 transition-colors p-1">
                <div className="bg-gray-50 overflow-hidden relative aspect-[4/5]">
                  {t.image_url ? (
                    <img src={t.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><Monitor size={48} className="text-gray-200" /></div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8 text-center">
                    <p className="text-white text-xs font-medium leading-relaxed">{t.description}</p>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-lg text-gray-800 uppercase italic line-clamp-2">{t.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default TrainingCategory;