import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Hero Content Overlay */}
      <div className="container mx-auto max-w-7xl h-full flex flex-col items-center justify-center px-4 relative z-10">
        <div className="bg-[#4834d4]/90 p-6 sm:p-10 w-full max-w-lg md:max-w-xl text-left border-l-4 border-white shadow-xl backdrop-blur-sm">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-2 leading-tight uppercase tracking-tight">
            DAFTAR SERTIFIKAT KOMPETENSI KERJA
          </h2>
          
          <div className="w-3/4 h-[1px] bg-white/40 mb-4"></div>
          
          <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-medium text-gray-100 mb-8">
            Lisensi oleh BNSP
          </h3>

          <div className="flex justify-start">
            <button className="bg-white text-[#4834d4] px-8 py-3 rounded-full flex items-center gap-3 font-bold text-sm sm:text-base italic tracking-wide hover:bg-gray-100 transition-all shadow-lg border border-transparent group">
              KLIK UNTUK DAFTAR 
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;