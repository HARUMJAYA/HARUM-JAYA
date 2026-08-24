import { Mail, Phone, Menu, Search, Home, Users, Briefcase, Cog, UserPlus, Monitor, Newspaper, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "HOME", icon: <Home size={18} />, active: true },
    { label: "PERUSAHAAN", icon: <Users size={18} /> },
    { label: "PROYEK", icon: <Briefcase size={18} /> },
    { label: "PELAYANAN", icon: <Cog size={18} /> },
    { label: "KARIR", icon: <UserPlus size={18} /> },
    { label: "PELATIHAN", icon: <Monitor size={18} /> },
    { label: "GUEST HOUSE", icon: null },
    { label: "NEWS", icon: <Newspaper size={18} /> },
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
          <SheetContent side="left" className="bg-[#2c3e50] text-white p-0 border-none w-[300px]">
             <div className="p-6 border-b border-gray-700 bg-[#1a252f]">
               <h2 className="text-xl font-bold italic">CV IM</h2>
               <p className="text-[10px] text-red-500 italic">Engineering reality</p>
             </div>
             <nav className="flex flex-col">
               {navItems.map((item, index) => (
                 <a 
                   key={index}
                   href="#" 
                   onClick={() => setIsOpen(false)}
                   className={`flex items-center justify-between px-6 py-4 border-b border-gray-700/50 hover:bg-[#34495e] transition-colors ${item.active ? 'text-orange-400 bg-[#34495e]/30' : 'text-gray-200'}`}
                 >
                   <div className="flex items-center gap-4">
                     {item.icon}
                     <span className="text-sm font-bold tracking-wider">{item.label}</span>
                   </div>
                   <ChevronRight size={14} className="opacity-30" />
                 </a>
               ))}
             </nav>
             <div className="p-6 mt-auto">
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