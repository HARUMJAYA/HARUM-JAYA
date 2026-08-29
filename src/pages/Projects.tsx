import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <div className="bg-[#f8f9fa] py-12 border-b">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold italic uppercase tracking-tight">Daftar Proyek</h1>
          <p className="text-gray-500 text-sm mt-1">Inventaris pekerjaan konstruksi dan arsitektur CV IM</p>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-4 py-16">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id} className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">{project.category}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-2 uppercase italic mb-4 group-hover:text-orange-500 transition-colors">{project.title}</h3>
                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold text-gray-400">
                    <span>SELESAI PADA</span>
                    <span className="text-gray-600">{new Date(project.created_at).getFullYear()}</span>
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