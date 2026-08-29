import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <h4 className="text-2xl font-bold italic text-gray-800 tracking-tighter">CV IM</h4>
              <p className="text-red-600 text-[10px] italic font-bold uppercase tracking-tight -mt-1">
                Engineering reality
              </p>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Perusahaan jasa konstruksi dan arsitektur yang berdedikasi memberikan kualitas terbaik dalam setiap perencanaan infrastruktur Anda.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white rounded-full border hover:text-blue-600 transition-colors shadow-sm">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border hover:text-pink-600 transition-colors shadow-sm">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border hover:text-red-600 transition-colors shadow-sm">
                <Youtube size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-gray-800 border-b border-orange-500 pb-2 w-fit">Quick Links</h4>
            <ul className="text-gray-500 text-sm space-y-4">
              <li><Link to="/company" className="hover:text-orange-500 transition-colors flex items-center gap-2">Profil Utama</Link></li>
              <li><Link to="/vision-mission" className="hover:text-orange-500 transition-colors flex items-center gap-2">Visi & Misi</Link></li>
              <li><Link to="/projects" className="hover:text-orange-500 transition-colors flex items-center gap-2">Proyek Terbaru</Link></li>
              <li><Link to="/services" className="hover:text-orange-500 transition-colors flex items-center gap-2">Layanan Kami</Link></li>
              <li><Link to="/news" className="hover:text-orange-500 transition-colors flex items-center gap-2">Berita & CSR</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-gray-800 border-b border-orange-500 pb-2 w-fit">Layanan Kami</h4>
            <ul className="text-gray-500 text-sm space-y-4">
              <li><Link to="/services/gedung" className="hover:text-orange-500 transition-colors">Kontraktor Gedung</Link></li>
              <li><Link to="/services/sipil" className="hover:text-orange-500 transition-colors">Pekerjaan Sipil</Link></li>
              <li><Link to="/services/rancang-bangun" className="hover:text-orange-500 transition-colors">Rancang & Bangun</Link></li>
              <li><Link to="/services/magang" className="hover:text-orange-500 transition-colors">Program Magang</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-gray-800 border-b border-orange-500 pb-2 w-fit">Kontak Kantor</h4>
            <ul className="text-gray-500 text-sm space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0" />
                <span>Banda Aceh, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <span>cvingatmati@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span>+62 822-7207-7675</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <p>© 2024 CV IM Construction & Architecture. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-600">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;