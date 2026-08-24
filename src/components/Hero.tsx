import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[400px] md:h-[600px] overflow-hidden">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container mx-auto max-w-7xl h-full flex items-center justify-center lg:justify-start px-4 py-12 md:py-0">
        <div className="relative z-10 bg-yellow-400/90 p-6 sm:p-10 md:p-16 w-full max-w-xl backdrop-blur-sm text-center lg:text-left rounded-sm shadow-2xl">
          <h2 className="text-xl sm:text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            DAFTAR SERTIFIKAT KOMPETENSI KERJA
          </h2>
          
          <div className="w-full h-[2px] bg-gray-900 mb-4 md:mb-6 opacity-30"></div>
          
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-medium text-gray-800 mb-6 md:mb-10">
            Lisensi oleh BNSP
          </h3>

          <button className="bg-zinc-900 text-white px-6 py-3 sm:px-8 sm:py-4 flex items-center gap-3 font-bold text-xs sm:text-sm tracking-widest hover:bg-black transition-all mx-auto lg:mx-0 rounded-md shadow-lg group">
            KLIK UNTUK DAFTAR 
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;