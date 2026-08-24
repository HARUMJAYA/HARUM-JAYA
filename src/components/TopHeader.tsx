import { Facebook, Instagram, Youtube } from "lucide-react";

const TopHeader = () => {
  return (
    <div className="hidden sm:block bg-[#f8f8f8] border-b border-gray-200 py-2 px-4 text-xs text-gray-600">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <p>PT Harum Jaya Construction <span className="text-orange-500 font-medium">&</span> Architecture</p>
        <div className="flex gap-4 border-l border-gray-300 pl-4 h-full">
          <a href="#" className="hover:text-blue-600 transition-colors">
            <Facebook size={14} />
          </a>
          <a href="#" className="hover:text-pink-600 transition-colors">
            <Instagram size={14} />
          </a>
          <a href="#" className="hover:text-red-600 transition-colors">
            <Youtube size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;