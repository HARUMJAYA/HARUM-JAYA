import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  LayoutDashboard, 
  Newspaper, 
  Briefcase, 
  Settings, 
  LogOut, 
  Building2, 
  Cog, 
  UserPlus, 
  ChevronRight,
  ExternalLink,
  Eye,
  Menu
} from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";
import ProjectManager from "@/components/admin/ProjectManager";
import NewsManager from "@/components/admin/NewsManager";
import CompanyManager from "@/components/admin/CompanyManager";
import ServiceManager from "@/components/admin/ServiceManager";
import CareerManager from "@/components/admin/CareerManager";
import SettingsManager from "@/components/admin/SettingsManager";

const Admin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { label: "Pengaturan", icon: <Settings size={20} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#2c3e50] text-white">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold italic">CV IM Admin</h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Control Panel</p>
      </div>
      
      <div className="p-4">
        <Link to="/" target="_blank">
          <Button variant="outline" className="w-full justify-start gap-2 bg-orange-500 hover:bg-orange-600 text-white border-none text-xs font-bold shadow-lg">
            <Eye size={16} /> LIHAT WEBSITE
          </Button>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => (
          <button 
            key={index}
            onClick={() => {
              setCurrentTab(item.label);
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium w-full ${
              currentTab === item.label 
              ? 'bg-[#34495e] text-orange-400 shadow-inner' 
              : 'text-gray-300 hover:bg-[#34495e] hover:text-white'
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors" 
          onClick={handleLogout}
        >
          <LogOut size={20} className="mr-3" /> Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-gray-700 shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#2c3e50] text-white p-4 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-[#2c3e50] border-none">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <h1 className="font-bold italic">CV IM Admin</h1>
        </div>
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-orange-400">
            <Eye size={18} />
          </Button>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                Admin <ChevronRight size={14} /> {currentTab}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{currentTab}</h2>
            </div>
            
            <div className="flex gap-2">
              <Link to="/" target="_blank">
                <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-100 hidden sm:flex items-center gap-2">
                  <ExternalLink size={16} /> Pratinjau Situs
                </Button>
              </Link>
            </div>
          </header>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentTab === "Dashboard" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-all group" onClick={() => setCurrentTab("Karir")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Manajemen Karir</CardTitle>
                    <UserPlus className="h-4 w-4 text-muted-foreground group-hover:text-green-600 transition-colors" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Update</div>
                    <p className="text-xs text-muted-foreground">Budaya, Lowongan & Praktek</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-all group" onClick={() => setCurrentTab("Pelayanan")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Manajemen Pelayanan</CardTitle>
                    <Cog className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-500">Kelola</div>
                    <p className="text-xs text-muted-foreground">Kontraktor & Program Magang</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-all group" onClick={() => setCurrentTab("Proyek")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Manajemen Proyek</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-500">Update</div>
                    <p className="text-xs text-muted-foreground">Inventaris Pekerjaan</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentTab === "Perusahaan" && <CompanyManager />}
            {currentTab === "Proyek" && <ProjectManager />}
            {currentTab === "Berita" && <NewsManager />}
            {currentTab === "Pelayanan" && <ServiceManager />}
            {currentTab === "Karir" && <CareerManager />}
            {currentTab === "Pengaturan" && <SettingsManager />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;