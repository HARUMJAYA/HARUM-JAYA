import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Cog, ChevronRight } from "lucide-react";

const ServiceSection = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("*")
        .limit(6);
      if (data) setServices(data);
    };
    fetchServices();
  }, []);

  if (services.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 italic">LAYANAN KAMI</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Kami menyediakan berbagai solusi konstruksi dan arsitektur dengan standar kualitas tinggi untuk memenuhi kebutuhan proyek Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group bg-gray-50 border border-gray-100 p-8 hover:bg-white hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cog size={80} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors uppercase tracking-tight">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {service.description || "Solusi konstruksi profesional terintegrasi dengan teknologi terkini untuk hasil yang maksimal."}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-orange-500 transition-colors tracking-widest uppercase">
                SELENGKAPNYA <ChevronRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;