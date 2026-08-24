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
  Hotel,
  ChevronRight
} from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";
import ProjectManager from "@/components/admin/ProjectManager";
import NewsManager from "@/components/admin/NewsManager";
import CompanyManager from "@/components/admin/CompanyManager";
import ServiceManager from "@/components/admin/ServiceManager";
import CareerManager from "@/components/admin/CareerManager";
import TrainingManager from "@/components/admin/TrainingManager";

const Admin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("Dashboard");

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
    { label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Perusahaan", icon: <Building2 size={20} /> },
    { label: "Proyek", icon: <Briefcase size={20} /> },
    { label: "Berita", icon: <Newspaper size={20} /> },
    { label: "Pelayanan", icon: <Cog size={20} /> },
    { label: "Karir", icon: <UserPlus size={20} /> },
    { label: "Pelatihan", icon: <Monitor size={20} /> },
    { label: "Guest House", icon: <Hotel size={20} /> },
    { label: "Pengaturan", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#2c3e50] text-white flex flex-col border-r border-gray-700 shrink-0">
        <div className="p-6 border-b border-gray-700 hidden md:block">
          <h1 className="text-xl font-bold italic">CV IM Admin</h1>
        </div>
        
        {/* Mobile Header Admin */}
        <div className="md:hidden p-4 flex justify-between items-center bg-[#1a252f]">
          <h1 className="font-bold italic">CV IM Admin</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400">
            <LogOut size={18} />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto flex md:flex-col overflow-x-auto md:overflow-x-hidden gap-2 md:gap-1 no-scrollbar">
          {navItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => setCurrentTab(item.label)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium whitespace-nowrap w-full ${
                currentTab === item.label 
                ? 'bg-[#34495e] text-orange-400' 
                : 'text-gray-300 hover:bg-[#34495e] hover:text-white'
              }`}
            >
              {item.icon} <span className="md:inline">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-700 hidden md:block">
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20" onClick={handleLogout}>
            <LogOut size={20} className="mr-3" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              Admin <ChevronRight size={14} /> {currentTab}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{currentTab}</h2>
          </div>
          {currentTab === "Dashboard" && (
            <div className="flex gap-2">
              <Button className="bg-[#4834d4] hover:bg-[#341f97]" onClick={() => setCurrentTab("Pelatihan")}>
                <Monitor size={20} className="mr-2" /> Kelola Pelatihan
              </Button>
              <Button variant="outline" onClick={() => setCurrentTab("Proyek")}>
                <Briefcase size={20} className="mr-2" /> Kelola Proyek
              </Button>
            </div>
          )}
        </header>

        {currentTab === "Dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentTab("Pelatihan")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Manajemen Pelatihan</CardTitle>
                <Monitor className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#4834d4]">Update</div>
                <p className="text-xs text-muted-foreground">Bimtek, SKK & Akademik Tukang</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentTab("Karir")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Manajemen Karir</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Update</div>
                <p className="text-xs text-muted-foreground">Budaya, Lowongan & Praktek</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentTab("Pelayanan")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Manajemen Pelayanan</CardTitle>
                <Cog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">Kelola</div>
                <p className="text-xs text-muted-foreground">Kontraktor & Program Magang</p>
              </CardContent>
            </Card>
          </div>
        )}

        {currentTab === "Perusahaan" && <CompanyManager />}
        {currentTab === "Proyek" && <ProjectManager />}
        {currentTab === "Berita" && <NewsManager />}
        {currentTab === "Pelayanan" && <ServiceManager />}
        {currentTab === "Karir" && <CareerManager />}
        {currentTab === "Pelatihan" && <TrainingManager />}

        {currentTab !== "Dashboard" && currentTab !== "Perusahaan" && currentTab !== "Proyek" && currentTab !== "Berita" && currentTab !== "Pelayanan" && currentTab !== "Karir" && currentTab !== "Pelatihan" && (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="inline-flex p-4 rounded-full bg-gray-50 text-gray-400 mb-4">
              <Settings size={48} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Halaman {currentTab}</h3>
            <p className="text-gray-500 italic">Fitur ini sedang dalam pengembangan.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;