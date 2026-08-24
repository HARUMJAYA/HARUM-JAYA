import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <main>
        <Hero />
        
        {/* Simple About Section to fill the page */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Tentang Kami</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              PT Harum Jaya adalah perusahaan konstruksi dan arsitektur terkemuka yang berdedikasi untuk memberikan kualitas terbaik dalam setiap proyek. Kami percaya bahwa setiap perencanaan dapat menjadi kenyataan melalui keahlian teknik yang tepat.
            </p>
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 PT Harum Jaya. All rights reserved.</p>
        </div>
      </footer>
      <MadeWithDyad />
    </div>
  );
};

export default Index;