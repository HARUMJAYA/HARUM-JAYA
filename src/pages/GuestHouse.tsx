import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { MapPin, Globe, Hotel, Loader2 } from "lucide-react";

const GuestHouse = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGH = async () => {
      const { data } = await supabase.from("guest_houses").select("*").order("created_at", { ascending: false });
      if (data) setItems(data);
      setLoading(false);
    };
    fetchGH();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <div className="bg-[#2c3e50] text-white py-16">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold italic uppercase tracking-tighter">Guest House</h1>
            <p className="text-gray-400 mt-2">Hunian nyaman dan tenang untuk peristirahatan Anda</p>
          </div>
          <Hotel size={48} className="text-orange-500 opacity-50" />
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {items.map((gh) => (
              <div key={gh.id} className="flex flex-col lg:flex-row gap-8 bg-gray-50 border p-6 hover:bg-white transition-colors">
                <div className="w-full lg:w-1/2 aspect-video overflow-hidden rounded shadow-md">
                  {gh.image_url ? (
                    <img src={gh.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center"><Hotel size={32} className="text-gray-400" /></div>
                  )}
                </div>
                <div className="w-full lg:w-1/2 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-800 italic uppercase mb-4 leading-tight">{gh.name}</h3>
                  <div className="flex items-start gap-2 text-sm text-gray-500 mb-8">
                    <MapPin size={18} className="text-orange-500 shrink-0 mt-1" />
                    <span>{gh.address}</span>
                  </div>
                  <div className="mt-auto flex gap-4">
                    {gh.map_url && (
                      <a href={gh.map_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors">
                        <Globe size={14} /> LIHAT LOKASI
                      </a>
                    )}
                  </div>
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

export default GuestHouse;