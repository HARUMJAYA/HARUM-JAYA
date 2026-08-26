import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] overflow-hidden flex items-center justify-center bg-gray-100">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url('/hero-bg.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Logo Overlay - Menggunakan logo baru tanpa background */}
      <div className="relative z-10 animate-in fade-in zoom-in duration-1000 flex items-center justify-center p-4">
        <img 
          src="/logo_hd.png" 
          alt="CV IM Logo" 
          className="w-72 sm:w-96 md:w-[500px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        />
      </div>
    </div>
  );
};

export default Hero;