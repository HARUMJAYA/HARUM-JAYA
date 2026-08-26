import React, { useState } from "react";
import { showSuccess } from "@/utils/toast";

const ContactFormSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Pesan Anda telah dikirim! Kami akan segera menghubungi Anda.");
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Logo Column */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src="/logo_hd.png" 
              alt="Logo CV IM" 
              className="w-64 md:w-full max-w-[400px] h-auto object-contain"
            />
          </div>

          {/* Form Column */}
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-bold text-[#2c3e50] mb-2 uppercase italic tracking-tight">
              HUBUNGI KAMI
            </h2>
            <div className="w-24 h-1 bg-orange-500 mb-10"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-800">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <input required type="text" className="w-full border border-gray-300 p-2 outline-none focus:border-orange-500" />
                      <span className="text-[10px] text-gray-500">First</span>
                    </div>
                    <div className="space-y-1">
                      <input required type="text" className="w-full border border-gray-300 p-2 outline-none focus:border-orange-500" />
                      <span className="text-[10px] text-gray-500">Last</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-800">
                  Pilih Pelayanan yang diinginkan <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 p-2 outline-none focus:border-orange-500 bg-white">
                  <option>Pekerjaan Gedung</option>
                  <option>Kontraktor Umum</option>
                  <option>Rancang & Bangun</option>
                  <option>Kontraktor Sipil</option>
                  <option>Teknologi & Inovasi</option>
                  <option>Program Magang</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-800">
                  No Telpon/ HP <span className="text-red-500">*</span>
                </label>
                <input required type="tel" className="w-full border border-gray-300 p-2 outline-none focus:border-orange-500" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-800">
                  Email <span className="text-red-500">*</span>
                </label>
                <input required type="email" className="w-full border border-gray-300 p-2 outline-none focus:border-orange-500" />
              </div>

              <button 
                type="submit" 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-2 font-bold uppercase tracking-widest text-xs transition-colors border border-gray-300"
              >
                KIRIM
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;