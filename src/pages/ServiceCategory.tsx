import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Loader2, Cog, ImageIcon, ChevronRight } from "lucide-react";

interface ServiceCategoryProps {
  category: string;
  title: string;
}

const ServiceCategory = ({ category, title }: ServiceCategoryProps) => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });
      
      if (data) setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, [category]);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <div className="bg-[#2c3e50] text-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold italic uppercase tracking-tight">{title}</h1>
          <p className="text-gray-400 text-sm mt-1">Layanan profesional kategori {category}</p>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <Cog size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 italic">Belum ada layanan terdaftar untuk kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <div key={service.id} className="group border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all overflow-hidden flex flex-col">
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  {service.image_url ? (
                    <img src={service.image_url} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon size={48} className="opacity-20" />
                    </div>
                  )}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase italic tracking-tight">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-4">
                    {service.description || "Solusi profesional dengan standar industri terbaik untuk mendukung keberhasilan proyek Anda."}
                  </p>
                  <div className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold text-orange-500 tracking-widest uppercase">
                    SELENGKAPNYA <ChevronRight size={12} />
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

export default ServiceCategory;