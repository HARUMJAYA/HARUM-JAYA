import { Mail, Phone, Menu, Search, Home, Users, Briefcase, Cog, UserPlus, Monitor, Newspaper, ChevronRight, Lock, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
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
        { label: "Visi & Misi", path: "/company#vision" },
        { label: "Nilai & Strategi", path: "/company#values" },
        { label: "Struktur Organisasi", path: "/company#structure" },
        { label: "Penghargaan", path: "/company#awards" },
      ]
    },
    { label: "PROYEK", icon: <Briefcase size={18} />, path: "/projects" },
    { label: "PELAYANAN", icon: <Cog size={18} />, path: "/services" },
    { label: "KARIR", icon: <UserPlus size={18} />, path: "/career" },
    { label: "PELATIHAN", icon: <Monitor size={18} />, path: "/training" },
    { label: "GUEST HOUSE", icon: null, path: "/guest-house" },
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
             <div className="p-6 border-b border-gray-700 bg-[#1a252f]">
               <h2 className="text-xl font-bold italic">CV IM</h2>
               <p className="text-[10px] text-red-500 italic">Engineering reality</p>
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
               ) : (
                 <Link 
                   to="/login"
                   onClick={() => setIsOpen(false)}
                   className="flex items-center gap-4 px-6 py-4 border-b border-gray-700/50 text-[#4834d4] bg-white/5 hover:bg-white/10 transition-colors"
                 >
                   <Lock size={18} />
                   <span className="text-sm font-bold tracking-wider underline">LOGIN ADMIN</span>
                 </Link>
               )}
             </nav>
             
             <div className="p-6 mt-auto bg-[#1a252f]/50">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-4">Contact Us</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Mail size={14} /> pt.harumjaya@yahoo.co.id
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Phone size={14} /> (0651) 8016088
                  </div>
                </div>
             </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-col items-center">
          <h1 className="text-xl font-serif font-bold text-[#333] tracking-tight">
            CV IM
          </h1>
          <p className="text-[8px] text-red-600 italic font-medium -mt-1">
            We engineer your plan to a reality
          </p>
        </div>

        <button className="text-gray-800">
          <Search size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Desktop Contact Header */}
      <div className="hidden lg:block py-6 px-4">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-[#333] tracking-tighter italic">
              CV IM
            </h1>
            <p className="text-red-600 text-sm italic font-medium -mt-1 border-t-2 border-gray-100 pt-1">
              We engineer your plan to a reality
            </p>
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-full text-orange-500">
                <Mail size={20} />
              </div>
              <div className="text-xs text-left">
                <p className="font-bold text-gray-700 uppercase tracking-wider">Email Us</p>
                <p className="text-gray-500">pt.harumjaya@yahoo.co.id</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-full text-orange-500">
                <Phone size={20} />
              </div>
              <div className="text-xs text-left">
                <p className="font-bold text-gray-700 uppercase tracking-wider">Call Us</p>
                <p className="text-gray-500">(0651) 8016088</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;