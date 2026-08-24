"use client";

import { Home, Users, Briefcase, Cog, UserPlus, Monitor, Newspaper, Search, ChevronDown } from "lucide-react";

const Navbar = () => {
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
    <nav className="hidden lg:block bg-[#2c3e50] text-white sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        <ul className="flex flex-wrap items-center">
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