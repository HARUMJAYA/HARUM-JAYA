import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('/hero-bg.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Logo Overlay */}
      <div className="relative z-10 animate-in fade-in zoom-in duration-1000">
        <img 
          src="/logo_hd.png" 
          alt="CV IM Logo" 
          className="w-48 sm:w-64 md:w-80 h-auto object-contain drop-shadow-2xl mix-blend-multiply"
        />
      </div>
    </div>
  );
};

export default Hero;