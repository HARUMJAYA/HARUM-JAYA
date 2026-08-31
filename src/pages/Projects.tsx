import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Filter, Search, ImageIcon } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Semua",
    "eksterior",
    "interior",
    "pekerjaan gedung",
    "pekerjaan rancang bangun",
    "pekerjaan sipil",
    "pekerjaan umum"
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === "Semua" || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      
      <div className="bg-[#2c3e50] text-white py-20 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
          <ImageIcon size={300} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold italic uppercase tracking-tighter mb-4">Proyek Yang Ditangani</h1>
          <p className="text-gray-400 max-w-2xl text-lg">Menampilkan rekam jejak profesional CV IM dalam membangun infrastruktur dan arsitektur yang presisi.</p>
        </div>
      </div>

      <main className="container mx-auto max-w-7xl px-4 py-16">
        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                  filter === cat 
                  ? "bg-[#4834d4] text-white border-[#4834d4] shadow-md" 
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#4834d4] hover:text-[#4834d4]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Cari nama proyek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#4834d4] transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20">
            <Loader2 className="animate-spin text-[#4834d4] mb-4" size={40} />
            <p className="text-gray-400 italic">Memuat data proyek...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <ImageIcon size={64} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 italic">Tidak ada proyek yang ditemukan dalam kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id} className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col rounded-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 italic text-xs">No image</div>
                  )}
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-widest rounded-sm shadow-lg">{project.category}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-800 line-clamp-2 uppercase italic mb-4 group-hover:text-[#4834d4] transition-colors leading-tight">{project.title}</h3>
                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold text-gray-400">
                    <span className="uppercase tracking-tighter">Status: Selesai</span>
                    <span className="text-gray-600 px-2 py-0.5 bg-gray-100 rounded">{new Date(project.created_at).getFullYear()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Projects;