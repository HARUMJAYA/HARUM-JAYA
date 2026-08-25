import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Loader2, UserPlus, Briefcase } from "lucide-react";

interface CareerCategoryProps {
  category: string;
  title: string;
}

const CareerCategory = ({ category, title }: CareerCategoryProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("careers")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });
      
      if (data) setItems(data);
      setLoading(false);
    };
    fetchCareers();
  }, [category]);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <div className="bg-[#4834d4] text-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold italic uppercase tracking-tighter">{title}</h1>
          <p className="mt-2 text-gray-200">Kategori: {category}</p>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#4834d4]" size={40} /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 italic">Belum ada informasi untuk kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                {item.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img src={item.image_url} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 italic uppercase mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">{item.description}</p>
                  <button className="bg-[#4834d4] hover:bg-[#341f97] text-white py-3 px-6 text-xs font-bold uppercase tracking-widest transition-colors rounded">
                    Lamar Sekarang
                  </button>
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

export default CareerCategory;