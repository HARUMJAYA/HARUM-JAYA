import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Loader2, Tag, MapPin, Share2 } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      
      if (data) setProject(data);
      setLoading(false);
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 italic">Proyek tidak ditemukan.</p>
        <Link to="/projects" className="text-blue-500 font-bold underline">Kembali ke Proyek</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      
      <main className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
        <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-orange-500 transition-colors uppercase tracking-widest mb-10">
          <ArrowLeft size={14} /> Kembali ke Daftar Proyek
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">No Image</div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="bg-orange-500 text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] inline-block mb-4 rounded-sm shadow-sm">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 italic uppercase leading-tight tracking-tighter mb-6">
                {project.title}
              </h1>
              <div className="w-24 h-1.5 bg-[#4834d4]"></div>
            </div>

            <div className="mb-12 border-y border-gray-100 py-8">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2.5 rounded-full text-orange-600">
                  <Tag size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Kategori</p>
                  <p className="font-bold text-gray-700 text-sm">{project.category}</p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 leading-loose text-lg italic mb-12">
              {project.description || "Detail proyek ini sedang dalam penyusunan oleh tim dokumentasi kami. Proyek ini merupakan salah satu bukti komitmen kami dalam menghadirkan kualitas infrastruktur yang presisi."}
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-10 border-t border-gray-50">
              <Link to="/contact" className="flex-1 bg-[#4834d4] hover:bg-[#341f97] text-white text-center py-4 px-6 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-[#4834d4]/20 transition-all">
                Konsultasikan Proyek Serupa
              </Link>
              <button className="p-4 bg-gray-100 rounded-xl hover:bg-orange-500 hover:text-white transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;