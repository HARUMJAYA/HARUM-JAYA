import { Mail, Phone, Clock } from "lucide-react";

const MainHeader = () => {
  return (
    <div className="bg-white py-6 px-4">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo Section */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-[#333] tracking-tighter italic">
            PT HARUM JAYA
          </h1>
          <p className="text-red-600 text-sm italic font-medium -mt-1 border-t-2 border-gray-100 pt-1">
            We engineer your plan to a reality
          </p>
        </div>

        {/* Contact Info Section */}
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-3 rounded-full text-orange-500">
              <Mail size={20} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-gray-700 uppercase tracking-wider">Email Us</p>
              <p className="text-gray-500">pt.harumjaya@yahoo.co.id</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-3 rounded-full text-orange-500">
              <Phone size={20} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-gray-700 uppercase tracking-wider">Call Us</p>
              <p className="text-gray-500">(0651) 8016088</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-3 rounded-full text-orange-500">
              <Clock size={20} />
            </div>
            <div className="text-xs">
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