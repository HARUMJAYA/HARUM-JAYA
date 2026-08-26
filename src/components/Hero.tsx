import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('/hero-bg.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Konten Hero telah dihapus sesuai permintaan */}
    </div>
  );
};

export default Hero;