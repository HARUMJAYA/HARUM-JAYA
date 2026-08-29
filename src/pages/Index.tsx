import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceSection from "@/components/public/ServiceSection";
import ProjectSection from "@/components/public/ProjectSection";
import NewsSection from "@/components/public/NewsSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <main>
        <Hero />
        
        {/* About Summary */}
        <section className="py-20 px-4 bg-white relative overflow-hidden">
          <div className="absolute -left-20 top-10 text-[120px] font-bold text-gray-50 opacity-[0.03] select-none pointer-events-none italic uppercase">
            History
          </div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 uppercase italic tracking-tight">
              Membangun Masa Depan Dengan Presisi
            </h2>
            <div className="w-16 h-1 bg-[#4834d4] mx-auto mb-8"></div>
            <p className="text-gray-600 leading-loose text-lg font-light">
              CV IM adalah perusahaan konstruksi dan arsitektur terkemuka yang berdedikasi untuk memberikan kualitas terbaik dalam setiap proyek. Kami percaya bahwa setiap perencanaan dapat menjadi kenyataan melalui keahlian teknik yang tepat dan komitmen terhadap detail.
            </p>
          </div>
        </section>

        <ServiceSection />
        <ProjectSection />
        <NewsSection />

        {/* Career CTA Only */}
        <section className="py-16 bg-[#2c3e50] text-white">
          <div className="container mx-auto max-w-2xl px-4 text-center">
            <div className="bg-[#34495e] p-10 border-t-4 border-blue-500 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 italic">KARIR & BUDAYA</h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">Bergabunglah dengan tim inovatif kami. Kami mencari talenta terbaik untuk membangun infrastruktur Indonesia yang lebih baik.</p>
              <Link to="/career">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 text-xs font-bold uppercase tracking-widest transition-colors rounded">
                  Cari Lowongan Pekerjaan
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;