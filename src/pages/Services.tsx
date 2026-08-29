import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cog, ChevronRight, Loader2, ImageIcon } from "lucide-react";
import ContactFormSection from "@/components/public/ContactFormSection";

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from("services").select("*").order("created_at", { ascending: false });
      if (data) setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <div className="bg-[#2c3e50] text-white py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold italic uppercase mb-4 tracking-tighter">Layanan Kami</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Solusi teknik terintegrasi untuk hasil konstruksi yang presisi dan berkualitas tinggi</p>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-4 py-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <Link to={`/services/${service.id}`} key={service.id} className="group border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all overflow-hidden flex flex-col">
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  {service.image_url ? (
                    <img src={service.image_url} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon size={48} className="opacity-20" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-orange-500 text-white p-2 rounded shadow-lg">
                    <Cog size={20} strokeWidth={2} />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase italic tracking-tight group-hover:text-orange-500 transition-colors">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-4">{service.description || "Kami menawarkan solusi profesional dengan standar industri terbaik untuk mendukung keberhasilan proyek Anda."}</p>
                  <div className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold text-gray-400 group-hover:text-orange-500 tracking-widest uppercase transition-colors">
                    Kategori: {service.category} <ChevronRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <ContactFormSection />
      <Footer />
    </div>
  );
};

export default Services;