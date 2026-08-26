import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceSection from "@/components/public/ServiceSection";
import ProjectSection from "@/components/public/ProjectSection";
import NewsSection from "@/components/public/NewsSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { MadeWithDyad } from "@/components/made-with-dyad";
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

        {/* Training & Career CTA */}
        <section className="py-16 bg-[#2c3e50] text-white">
          <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-[#34495e] p-10 border-l-4 border-orange-500">
              <h3 className="text-2xl font-bold mb-4 italic">PROGRAM PELATIHAN</h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">Tingkatkan kompetensi Anda melalui program sertifikasi SKK, Bimtek, dan Akademik Tukang bersama mentor profesional kami.</p>
              <Link to="/training">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors">
                  Info Pelatihan
                </button>
              </Link>
            </div>
            <div className="flex-1 bg-[#34495e] p-10 border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold mb-4 italic">KARIR & BUDAYA</h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">Bergabunglah dengan tim inovatif kami. Kami mencari talenta terbaik untuk membangun infrastruktur Indonesia yang lebih baik.</p>
              <Link to="/career">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors">
                  Cari Lowongan
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="text-xl font-bold italic mb-6">CV IM</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                We engineer your plan to a reality. Perusahaan jasa konstruksi, arsitektur, dan pusat pengembangan kompetensi SDM konstruksi.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-800">Quick Links</h4>
              <ul className="text-gray-500 text-sm space-y-3">
                <li><Link to="/company" className="hover:text-orange-500 transition-colors">Tentang Kami</Link></li>
                <li><Link to="/projects" className="hover:text-orange-500 transition-colors">Proyek Pilihan</Link></li>
                <li><Link to="/services" className="hover:text-orange-500 transition-colors">Layanan Konstruksi</Link></li>
                <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Hubungi Kami</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-800">Office</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Banda Aceh, Indonesia<br />
                cvingatmati@gmail.com<br />
                +62 822-7207-7675
              </p>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">
            <p>© 2024 CV IM Construction & Architecture. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <WhatsAppFloat />
      <MadeWithDyad />
    </div>
  );
};

export default Index;