import { Facebook, Instagram, Youtube, Lock, LogOut, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

const TopHeader = () => {
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
      navigate("/");
    }
  };

  return (
    <div className="hidden sm:block bg-[#f8f8f8] border-b border-gray-200 py-2 px-4 text-xs text-gray-600">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <p>CV IM Construction <span className="text-orange-500 font-medium">&</span> Architecture</p>
        <div className="flex items-center gap-4">
          <div className="flex gap-3 pr-4 border-r border-gray-300">
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
          
          {session ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/admin" 
                className="flex items-center gap-1.5 hover:text-orange-600 transition-colors font-bold text-[#4834d4]"
              >
                <LayoutDashboard size={12} />
                KE PANEL ADMIN
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 hover:text-red-600 transition-colors font-semibold text-red-500 border-l border-gray-300 pl-4"
              >
                <LogOut size={12} />
                LOGOUT
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-1.5 hover:text-orange-600 transition-colors font-semibold text-[#4834d4]"
            >
              <Lock size={12} />
              LOGIN ADMIN
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;