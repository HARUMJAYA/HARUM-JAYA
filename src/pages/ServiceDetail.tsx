import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/public/ContactFormSection";
import { ArrowLeft, Loader2, Cog, CheckCircle2, MessageSquare } from "lucide-react";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();
      
      if (data) setService(data);
      setLoading(false);
    };
    fetchService();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 italic">Layanan tidak ditemukan.</p>
        <Link to="/services" className="text-blue-500 font-bold underline">Kembali ke Layanan</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      
      <main>
        <div className="bg-[#2c3e50] text-white py-20 md:py-32 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-20 translate-y-20">
            <Cog size={400} strokeWidth={1} />
          </div>
          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-orange-400 transition-colors uppercase tracking-widest mb-8">
              <ArrowLeft size={14} /> Kembali ke Layanan
            </Link>
            <span className="text-orange-400 font-bold text-xs uppercase tracking-[0.3em] block mb-4">
              Kategori: {service.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold italic uppercase tracking-tighter max-w-4xl leading-none">
              {service.title}
            </h1>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-2 space-y-12">
              <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                {service.image_url ? (
                  <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">No Image</div>
                )}
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 italic uppercase">Tentang Pelayanan</h2>
                <div className="w-20 h-1 bg-orange-500"></div>
                <div className="prose prose-lg max-w-none text-gray-600 leading-loose text-lg whitespace-pre-line">
                  {service.description || "Layanan kami dirancang untuk memberikan solusi konstruksi dan arsitektur yang komprehensif, mulai dari perencanaan hingga penyelesaian akhir dengan standar kualitas tertinggi."}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t">
                {[
                  "Kualitas Terjamin & Bergaransi",
                  "Teknologi Konstruksi Modern",
                  "Tim Ahli & Profesional",
                  "Tepat Waktu & Sesuai Budget",
                  "Transparansi Material",
                  "Dukungan Konsultasi Gratis"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                    <span className="font-bold text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-8 sticky top-24">
              <div className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 uppercase italic mb-6">Butuh Penawaran?</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Konsultasikan kebutuhan proyek Anda dan dapatkan estimasi biaya yang akurat dari tim estimator kami.
                </p>
                <div className="space-y-4">
                  <a href="https://wa.me/6282272077675" className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 px-6 rounded-xl font-bold uppercase tracking-widest text-xs transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-100">
                    <MessageSquare size={18} /> Chat Via WhatsApp
                  </a>
                  <button className="w-full bg-[#2c3e50] text-white py-4 px-6 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors hover:bg-[#1a252f]">
                    Jadwalkan Survei
                  </button>
                </div>
              </div>

              <div className="bg-orange-500 p-8 rounded-3xl text-white">
                <h4 className="font-bold text-lg mb-4">Kenapa Memilih CV IM?</h4>
                <p className="text-orange-50 text-sm leading-relaxed italic">
                  "Kami tidak hanya membangun struktur, kami mewujudkan impian Anda dengan integritas dan keunggulan teknik yang tak tertandingi."
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <ContactFormSection />
      <Footer />
    </div>
  );
};

export default ServiceDetail;