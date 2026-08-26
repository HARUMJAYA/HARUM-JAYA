import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Loader2, ImageIcon } from "lucide-react";

interface ProjectCategoryProps {
  category: string;
  title: string;
}

const ProjectCategory = ({ category, title }: ProjectCategoryProps) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });
      
      if (data) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, [category]);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <div className="bg-[#f8f9fa] py-12 border-b">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold italic uppercase tracking-tight">{title}</h1>
          <p className="text-gray-500 text-sm mt-1">Daftar inventaris pekerjaan kategori {category}</p>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-4 py-16">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 italic">Belum ada proyek terdaftar untuk kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon size={40} className="opacity-20" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-2 uppercase italic mb-4">{project.title}</h3>
                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold text-gray-400">
                    <span>SELESAI PADA</span>
                    <span className="text-gray-600">{new Date(project.created_at).getFullYear()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default ProjectCategory;