"use client";

import { Home, Users, Briefcase, Cog, UserPlus, Monitor, Newspaper, Search, ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "HOME", icon: <Home size={14} />, active: true },
    { label: "PERUSAHAAN", icon: <Users size={14} />, hasDropdown: true },
    { label: "PROYEK", icon: <Briefcase size={14} />, hasDropdown: true },
    { label: "PELAYANAN", icon: <Cog size={14} />, hasDropdown: true },
    { label: "KARIR", icon: <UserPlus size={14} />, hasDropdown: true },
    { label: "PELATIHAN", icon: <Monitor size={14} />, hasDropdown: true },
    { label: "GUEST HOUSE", icon: null },
    { label: "NEWS", icon: <Newspaper size={14} />, hasDropdown: true },
  ];

  return (
    <nav className="bg-[#2c3e50] text-white sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        {/* Desktop Menu */}
        <ul className="hidden lg:flex flex-wrap items-center">
          {navItems.map((item, index) => (
            <li 
              key={index} 
              className={`flex items-center gap-2 px-4 py-4 text-[11px] font-bold tracking-wider cursor-pointer hover:bg-[#34495e] transition-colors border-r border-gray-700/30 ${item.active ? 'text-orange-400' : ''}`}
            >
              {item.icon}
              {item.label}
              {item.hasDropdown && <ChevronDown size={12} className="ml-1 opacity-50" />}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center p-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 text-sm font-bold tracking-widest">
                <Menu size={20} /> MENU
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#2c3e50] border-none text-white p-0 w-[280px]">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold italic">PT HARUM JAYA</h2>
              </div>
              <ul className="flex flex-col">
                {navItems.map((item, index) => (
                  <li 
                    key={index} 
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-6 py-4 text-xs font-bold tracking-wider border-b border-gray-700/50 hover:bg-[#34495e] ${item.active ? 'text-orange-400' : ''}`}
                  >
                    {item.icon}
                    {item.label}
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center bg-[#34495e] px-4 py-4 lg:py-4 h-full">
          <input 
            type="text" 
            placeholder="Search ..." 
            className="bg-transparent text-sm focus:outline-none placeholder-gray-400 w-24 sm:w-32 md:w-48"
          />
          <Search size={16} className="text-gray-400" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;