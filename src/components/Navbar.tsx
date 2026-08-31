import { Home, Users, Briefcase, Cog, UserPlus, Newspaper, Search, ChevronDown, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { label: "HOME", icon: <Home size={14} />, path: "/" },
    { 
      label: "PERUSAHAAN", 
      icon: <Users size={14} />, 
      path: "/company",
      dropdown: [
        { label: "Profil Utama", path: "/company" },
        { label: "Visi & Misi", path: "/vision-mission" },
        { label: "Nilai & Strategi", path: "/strategy" },
        { label: "Struktur Organisasi", path: "/organization" },
        { label: "Penghargaan", path: "/awards" },
      ]
    },
    { 
      label: "PROYEK", 
      icon: <Briefcase size={14} />, 
      path: "/projects",
      dropdown: [
        { label: "Proyek yang Pernah Ditangani", path: "/projects" },
        { label: "Eksterior", path: "/projects/eksterior" },
        { label: "Interior", path: "/projects/interior" },
        { label: "Pekerjaan Gedung", path: "/projects/gedung" },
        { label: "Rancang & Bangun", path: "/projects/rancang-bangun" },
        { label: "Pekerjaan Sipil", path: "/projects/sipil" },
        { label: "Pekerjaan Umum", path: "/projects/umum" },
      ]
    },
    { 
      label: "PELAYANAN", 
      icon: <Cog size={14} />, 
      path: "/services",
      dropdown: [
        { label: "Semua Layanan", path: "/services" },
        { label: "Kontraktor Umum", path: "/services/umum" },
        { label: "Rancang & Bangun", path: "/services/rancang-bangun" },
        { label: "Kontraktor Sipil", path: "/services/sipil" },
        { label: "Teknologi & Inovasi", path: "/services/teknologi" },
        { label: "Kontraktor Gedung", path: "/services/gedung" },
        { label: "Program Magang", path: "/services/magang" },
      ]
    },
    { 
      label: "KARIR", 
      icon: <UserPlus size={14} />, 
      path: "/career",
      dropdown: [
        { label: "Semua Karir", path: "/career" },
        { label: "Budaya Kami", path: "/career/budaya" },
        { label: "Karir Area", path: "/career/area" },
        { label: "Daftar Kerja", path: "/career/daftar-kerja" },
        { label: "Daftar Praktek", path: "/career/daftar-praktek" },
      ]
    },
    { 
      label: "NEWS", 
      icon: <Newspaper size={14} />, 
      path: "/news",
      dropdown: [
        { label: "Semua Berita", path: "/news" },
        { label: "Berita Utama", path: "/news/berita" },
        { label: "CSR", path: "/news/csr" },
        { label: "Kegiatan", path: "/news/kegiatan" },
        { label: "Galeri Foto", path: "/news/galeri" },
      ]
    },
    { label: "KONTAK", icon: <Mail size={14} />, path: "/contact" },
  ];

  return (
    <nav className="hidden lg:block bg-[#2c3e50] text-white sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        <ul className="flex flex-wrap items-center">
          {navItems.map((item, index) => (
            <li key={index} className="border-r border-gray-700/30">
              {item.dropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={`flex items-center gap-2 px-4 py-4 text-[11px] font-bold tracking-wider cursor-pointer hover:bg-[#34495e] transition-colors outline-none ${location.pathname.startsWith(item.path) ? 'text-orange-400 bg-[#34495e]' : ''}`}>
                      {item.icon}
                      {item.label}
                      <ChevronDown size={12} className="opacity-50" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#2c3e50] border-gray-700 text-white min-w-[200px] p-0 rounded-none shadow-xl z-[60]">
                    {item.dropdown.map((sub, subIdx) => (
                      <DropdownMenuItem key={subIdx} asChild className="p-0 focus:bg-transparent focus:text-white">
                        <Link to={sub.path} className="w-full px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#34495e] hover:text-orange-400 transition-colors border-b border-gray-700/50 last:border-0 block">
                          {sub.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-4 text-[11px] font-bold tracking-wider cursor-pointer hover:bg-[#34495e] transition-colors ${location.pathname === item.path ? 'text-orange-400 bg-[#34495e]' : ''}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center bg-[#34495e] px-4 py-4 h-full">
          <input 
            type="text" 
            placeholder="Search ..." 
            className="bg-transparent text-sm focus:outline-none placeholder-gray-400 w-48"
          />
          <Search size={16} className="text-gray-400" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;