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
    <nav className="bg-[#2c3e50] text-white">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-stretch">
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
        
        <div className="flex items-center bg-[#34495e] px-4 py-2 md:py-0">
          <input 
            type="text" 
            placeholder="Search ..." 
            className="bg-transparent text-sm focus:outline-none placeholder-gray-400 w-32 md:w-48"
          />
          <Search size={16} className="text-gray-400" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;