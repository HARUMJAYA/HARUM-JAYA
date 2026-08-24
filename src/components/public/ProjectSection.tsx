import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const ProjectSection = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(4);
      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 italic uppercase">PROYEK TERBARU</h2>
            <div className="w-20 h-1 bg-orange-500 mt-2"></div>
          </div>
          <button className="text-sm font-bold text-orange-600 border-b-2 border-orange-600 pb-1 hover:text-orange-700 transition-colors uppercase tracking-widest">
            Lihat Semua Proyek
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden bg-white shadow-md aspect-[3/4]">
              <img 
                src={project.image_url} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-white font-bold text-lg leading-tight uppercase italic">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;