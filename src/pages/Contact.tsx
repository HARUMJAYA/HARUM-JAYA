import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { showSuccess } from "@/utils/toast";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />

      <div className="bg-[#2c3e50] text-white py-20 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-20 translate-y-20">
          <Mail size={300} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center md:text-left">
          <h1 className="text-5xl font-bold italic uppercase tracking-tighter mb-4">Hubungi Kami</h1>
          <p className="text-gray-400 max-w-2xl text-lg">Konsultasikan rencana proyek Anda bersama tim ahli kami. Kami siap melayani dengan presisi dan kualitas.</p>
        </div>
      </div>

      <main className="container mx-auto max-w-7xl px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info Sidebar */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 uppercase italic mb-8 border-b-2 border-orange-500 pb-2 w-fit">Informasi Kantor</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-600 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700 text-sm uppercase mb-1">Alamat Utama</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Jalan Kampus UNIDA Nomor 16, Gampong Lamteumen Timur,<br />Kecamatan Jaya Baru, Kota Banda Aceh, Aceh</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700 text-sm uppercase mb-1">Telepon & WhatsApp</h4>
                    <p className="text-gray-500 text-sm">+62 822-7207-7675</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700 text-sm uppercase mb-1">Email</h4>
                    <p className="text-gray-500 text-sm">cvingatmati@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-purple-100 p-3 rounded-full text-purple-600 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700 text-sm uppercase mb-1">Jam Operasional</h4>
                    <p className="text-gray-500 text-sm">Senin - Jumat: 08:30 - 17:00<br />Sabtu: 08:30 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
              {submitted ? (
                <div className="py-20 text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-bold italic uppercase text-gray-800">Terima Kasih!</h3>
                  <p className="text-gray-500 max-w-md mx-auto">Pesan Anda telah kami terima. Tim Customer Service kami akan membalas pesan Anda melalui email atau telepon dalam waktu 1x24 jam.</p>
                  <button onClick={() => setSubmitted(false)} className="text-orange-500 font-bold uppercase text-xs tracking-widest border-b border-orange-500">Kirim Pesan Lain</button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 uppercase italic mb-8">Kirim Pesan Langsung</h2>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nama Lengkap</label>
                      <input required type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="Masukkan nama..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Anda</label>
                      <input required type="email" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="email@contoh.com" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Perihal Proyek</label>
                      <select className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all">
                        <option>Konsultasi Desain (Interior/Eksterior)</option>
                        <option>Pekerjaan Konstruksi Gedung</option>
                        <option>Pekerjaan Sipil</option>
                        <option>Penawaran Kerja Sama</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pesan / Detail Rencana</label>
                      <textarea required className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all min-h-[150px]" placeholder="Jelaskan kebutuhan Anda..."></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <button type="submit" className="w-full bg-[#4834d4] hover:bg-[#341f97] text-white py-4 px-10 rounded-lg font-bold uppercase tracking-widest shadow-lg shadow-[#4834d4]/20 transition-all flex items-center justify-center gap-3">
                        <Send size={18} /> KIRIM PESAN SEKARANG
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <div className="w-full h-[450px] bg-gray-100 rounded-3xl overflow-hidden shadow-inner border">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15886.126584282365!2d95.3168!3d5.5483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3040375a00000001%3A0x0!2sBanda%20Aceh!5e0!3m2!1sid!2sid!4v1700000000000" 
               className="w-full h-full border-0"
               loading="lazy"
             ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;