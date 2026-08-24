import { Mail, Phone, Clock, Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-100">
      {/* Mobile Header Layout (Like screenshot) */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="text-gray-800">
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#2c3e50] text-white">
             <div className="py-8">
               <h2 className="text-2xl font-bold italic mb-8">PT HARUM JAYA</h2>
               <nav className="flex flex-col gap-4">
                 <a href="#" className="text-lg font-medium border-b border-gray-700 pb-2">HOME</a>
                 <a href="#" className="text-lg font-medium border-b border-gray-700 pb-2">PERUSAHAAN</a>
                 <a href="#" className="text-lg font-medium border-b border-gray-700 pb-2">PROYEK</a>
                 <a href="#" className="text-lg font-medium border-b border-gray-700 pb-2">PELAYANAN</a>
               </nav>
             </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-col items-center">
          <h1 className="text-xl font-serif font-bold text-[#333] tracking-tight">
            PT HARUM JAYA
          </h1>
          <p className="text-[8px] text-red-600 italic font-medium -mt-1">
            We engineer your plan to a reality
          </p>
        </div>

        <button className="text-gray-800">
          <Search size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Desktop Contact Header (Kept for desktop view) */}
      <div className="hidden lg:block py-6 px-4">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-[#333] tracking-tighter italic">
              PT HARUM JAYA
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