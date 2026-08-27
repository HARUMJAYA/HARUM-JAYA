import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { Calendar, User, ArrowLeft, Loader2, Share2 } from "lucide-react";

const NewsDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();
      
      if (data) setItem(data);
      setLoading(false);
    };
    fetchDetail();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 italic">Konten tidak ditemukan.</p>
        <Link to="/news" className="text-blue-500 font-bold underline">Kembali ke Berita</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      
      <main className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <Link to="/news" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-orange-500 transition-colors uppercase tracking-widest mb-10">
          <ArrowLeft size={14} /> Kembali ke Daftar
        </Link>

        <article className="space-y-8">
          <header className="space-y-4">
            <span className="bg-orange-500 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] inline-block">
              {item.category || 'NEWS'}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 italic uppercase leading-tight tracking-tighter">
              {item.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-6">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-orange-500" /> 
                {new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <User size={14} className="text-orange-500" /> 
                Oleh: {item.author || 'Admin'}
              </span>
            </div>
          </header>

          {item.image_url && (
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow-2xl border-4 border-white">
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-600 leading-loose whitespace-pre-line text-lg italic bg-gray-50/50 p-6 md:p-10 rounded-2xl border border-gray-100">
            {item.content}
          </div>

          <footer className="pt-10 border-t border-gray-100 flex justify-between items-center">
            <div className="flex gap-2">
              <button className="p-3 bg-gray-100 rounded-full hover:bg-orange-500 hover:text-white transition-all">
                <Share2 size={18} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              © CV IM Construction & Architecture
            </p>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default NewsDetail;