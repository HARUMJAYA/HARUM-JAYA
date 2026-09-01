import { Mail, Phone, Menu, Search, Home, Users, Briefcase, Cog, UserPlus, Newspaper, ChevronRight, Lock, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError("Gagal logout");
    } else {
      showSuccess("Berhasil keluar");
      setIsOpen(false);
      navigate("/");
    }
  };

  const navItems = [
    { label: "HOME", icon: <Home size={18} />, path: "/" },
    { 
      label: "PERUSAHAAN", 
      icon: <Users size={18} />, 
      path: "/company",
      subItems: [
        { label: "Profil Utama", path: "/company" },
        { label: "Visi & Misi", path: "/vision-mission" },
        { label: "Nilai & Strategi", path: "/strategy" },
        { label: "Struktur Organisasi", path: "/organization" },
        { label: "Penghargaan", path: "/awards" },
      ]
    },
    { 
      label: "PROYEK", 
      icon: <Briefcase size={18} />, 
      path: "/projects"
    },
    { 
      label: "PELAYANAN", 
      icon: <Cog size={18} />, 
      path: "/services",
      subItems: [
        { label: "Semua Layanan", path: "/services" },
        { label: "Kontraktor Umum", path: "/services/umum" },
        { label: "Rancang & Bangun", path: "/services/rancang-bangun" },
        { label: "Kontraktor Sipil", path: "/services/sipil" },
        { label: "Teknologi & Inovasi", path: "/services/teknologi" },
        { label: "Kontraktor Gedung", path: "/services/gedung" },
        { label: "Program Magang", path: "/services/magang" },
      ]
    },
    { label: "KARIR", icon: <UserPlus size={18} />, path: "/career" },
    { label: "NEWS", icon: <Newspaper size={18} />, path: "/news" },
  ];

  return (
    <div className="bg-white border-b border-gray-100">
      {/* Mobile Header Layout */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="text-gray-800">
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#2c3e50] text-white p-0 border-none w-[300px] flex flex-col">
             <div className="p-6 border-b border-gray-700 bg-[#1a252f] flex items-center gap-3">
               <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain bg-white rounded-sm p-1" />
               <div>
                 <h2 className="text-xl font-bold italic">CV IM</h2>
                 <p className="text-[10px] text-red-500 italic">Engineering reality</p>
               </div>
             </div>
             <nav className="flex-1 flex flex-col overflow-y-auto">
               <Accordion type="single" collapsible className="w-full">
                 {navItems.map((item, index) => (
                   item.subItems ? (
                     <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-700/50 px-6">
                       <AccordionTrigger className="hover:no-underline py-4 text-gray-200">
                         <div className="flex items-center gap-4">
                           {item.icon}
                           <span className="text-sm font-bold tracking-wider">{item.label}</span>
                         </div>
                       </AccordionTrigger>
                       <AccordionContent className="flex flex-col gap-1 pb-4">
                         {item.subItems.map((sub, subIdx) => (
                           <Link 
                             key={subIdx} 
                             to={sub.path}
                             onClick={() => setIsOpen(false)}
                             className="text-xs text-gray-400 py-2 pl-10 hover:text-orange-400 transition-colors uppercase font-bold"
                           >
                             {sub.label}
                           </Link>
                         ))}
                       </AccordionContent>
                     </AccordionItem>
                   ) : (
                     <Link 
                       key={index}
                       to={item.path}
                       onClick={() => setIsOpen(false)}
                       className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50 text-gray-200 hover:bg-[#34495e] transition-colors"
                     >
                       <div className="flex items-center gap-4">
                         {item.icon}
                         <span className="text-sm font-bold tracking-wider">{item.label}</span>
                       </div>
                       <ChevronRight size={14} className="opacity-30" />
                     </Link>
                   )
                 ))}
               </Accordion>
               
               {/* Mobile Auth Links */}
               {session ? (
                 <>
                   <Link 
                     to="/admin"
                     onClick={() => setIsOpen(false)}
                     className="flex items-center gap-4 px-6 py-4 border-b border-gray-700/50 text-orange-400 bg-white/5 hover:bg-white/10 transition-colors"
                   >
                     <LayoutDashboard size={18} />
                     <span className="text-sm font-bold tracking-wider">KE PANEL ADMIN</span>
                   </Link>
                   <button
                     onClick={handleLogout}
                     className="flex items-center gap-4 px-6 py-4 border-b border-gray-700/50 text-red-400 bg-white/5 hover:bg-white/10 transition-colors w-full text-left"
                   >
                     <LogOut size={18} />
                     <span className="text-sm font-bold tracking-wider">LOGOUT</span>
                   </button>
                 </>
               )}
             </nav>
             
             <div className="p-6 mt-auto bg-[#1a252f]/50">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-4">Contact Us</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Mail size={14} /> cvingatmati@gmail.com
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Phone size={14} /> +62 822-7207-7675
                  </div>
                </div>
             </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex flex-col items-center">
          <img src="/logo.png" alt="CV IM" className="h-8 w-auto object-contain mb-0.5" />
          <p className="text-[8px] text-red-600 italic font-medium">
            We engineer your plan to a reality
          </p>
        </Link>

        <button className="text-gray-800">
          <Search size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Desktop Contact Header */}
      <div className="hidden lg:block py-6 px-4">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 group">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain group-hover:scale-105 transition-transform" />
            <div className="flex flex-col border-l-2 border-gray-100 pl-4">
              <h1 className="text-4xl font-bold text-[#333] tracking-tighter italic leading-none mb-1">
                CV IM
              </h1>
              <p className="text-red-600 text-sm italic font-medium uppercase tracking-tight">
                We engineer your plan to a reality
              </p>
            </div>
          </Link>

          <div className="flex gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-full text-orange-500">
                <Mail size={20} />
              </div>
              <div className="text-xs text-left">
                <p className="font-bold text-gray-700 uppercase tracking-wider">Email Us</p>
                <p className="text-gray-500">cvingatmati@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-full text-orange-500">
                <Phone size={20} />
              </div>
              <div className="text-xs text-left">
                <p className="font-bold text-gray-700 uppercase tracking-wider">Call Us</p>
                <p className="text-gray-500">+62 822-7207-7675</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;