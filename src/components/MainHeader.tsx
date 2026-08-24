import { Mail, Phone, Clock } from "lucide-react";

const MainHeader = () => {
  return (
    <div className="bg-white py-4 sm:py-6 px-4">
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* Logo Section */}
        <div className="flex flex-col text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#333] tracking-tighter italic">
            PT HARUM JAYA
          </h1>
          <p className="text-red-600 text-xs sm:text-sm italic font-medium -mt-1 border-t-2 border-gray-100 pt-1">
            We engineer your plan to a reality
          </p>
        </div>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 w-full lg:w-auto">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="bg-gray-100 p-2 sm:p-3 rounded-full text-orange-500 shrink-0">
              <Mail size={18} />
            </div>
            <div className="text-[10px] sm:text-xs">
              <p className="font-bold text-gray-700 uppercase tracking-wider">Email Us</p>
              <p className="text-gray-500 break-all">pt.harumjaya@yahoo.co.id</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="bg-gray-100 p-2 sm:p-3 rounded-full text-orange-500 shrink-0">
              <Phone size={18} />
            </div>
            <div className="text-[10px] sm:text-xs">
              <p className="font-bold text-gray-700 uppercase tracking-wider">Call Us</p>
              <p className="text-gray-500">(0651) 8016088</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="bg-gray-100 p-2 sm:p-3 rounded-full text-orange-500 shrink-0">
              <Clock size={18} />
            </div>
            <div className="text-[10px] sm:text-xs">
              <p className="font-bold text-gray-700 uppercase tracking-wider">Opening Time</p>
              <p className="text-gray-500">Mon - Sat 8:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;