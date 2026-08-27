import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import { Calendar, User, Loader2 } from "lucide-react";

const News = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase.from("news").select("*").order("published_at", { ascending: false });
      if (data) setNews(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <div className="bg-[#f8f9fa] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold italic uppercase text-gray-800">News & Updates</h1>
          <div className="w-16 h-1 bg-orange-500 mt-4"></div>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-4 py-16">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {news.map((item) => (
              <article key={item.id} className="group grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 aspect-video lg:aspect-square overflow-hidden bg-gray-100">
                  {item.image_url ? (
                    <img src={item.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 italic text-xs">No image</div>
                  )}
                </div>
                <div className="lg:col-span-3 flex flex-col justify-center">
                  <div className="flex gap-4 text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(item.published_at).toLocaleDateString('id-ID')}</span>
                    <span className="flex items-center gap-1.5"><User size={12} /> {item.author}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 uppercase italic group-hover:text-orange-500 transition-colors mb-4 leading-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-6">{item.content}</p>
                  <button className="text-[10px] font-bold tracking-widest border-b-2 border-gray-100 group-hover:border-orange-500 pb-1 w-fit transition-all">BACA SELENGKAPNYA</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default News;