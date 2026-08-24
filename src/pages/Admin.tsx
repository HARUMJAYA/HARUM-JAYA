import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Newspaper, 
  Briefcase, 
  Settings, 
  LogOut, 
  Plus, 
  Building2, 
  Cog, 
  UserPlus, 
  Monitor, 
  Hotel 
} from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";

const Admin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/login");
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate("/login");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) showError("Gagal logout");
    else {
      showSuccess("Berhasil keluar");
      navigate("/login");
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, active: true },
    { label: "Proyek", icon: <Briefcase size={20} /> },
    { label: "Berita", icon: <Newspaper size={20} /> },
    { label: "Perusahaan", icon: <Building2 size={20} /> },
    { label: "Pelayanan", icon: <Cog size={20} /> },
    { label: "Karir", icon: <UserPlus size={20} /> },
    { label: "Pelatihan", icon: <Monitor size={20} /> },
    { label: "Guest House", icon: <Hotel size={20} /> },
    { label: "Pengaturan", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2c3e50] text-white hidden md:flex flex-col border-r border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold italic">CV IM Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item, index) => (
            <button 
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                item.active 
                ? 'bg-[#34495e] text-orange-400' 
                : 'text-gray-300 hover:bg-[#34495e] hover:text-white'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20" onClick={handleLogout}>
            <LogOut size={20} className="mr-3" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Selamat Datang, Admin</h2>
            <p className="text-gray-500">Kelola konten CV IM Anda di sini.</p>
          </div>
          <Button className="bg-[#4834d4] hover:bg-[#341f97]">
            <Plus size={20} className="mr-2" /> Tambah Konten Baru
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proyek</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 bulan ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Berita Aktif</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+5 minggu ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pengunjung Situs</CardTitle>
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% dari kemarin</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Aktivitas Terakhir</h3>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-400 italic">
            Belum ada aktivitas terbaru untuk ditampilkan.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;