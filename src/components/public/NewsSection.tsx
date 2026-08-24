import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, User } from "lucide-react";

const NewsSection = () => {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("*")
        .order('published_at', { ascending: false })
        .limit(3);
      if (data) setNews(data);
    };
    fetchNews();
  }, []);

  if (news.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 italic uppercase">BERITA & INFORMASI</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {news.map((item) => (
            <article key={item.id} className="group">
              <div className="relative h-56 overflow-hidden mb-6 bg-gray-100">
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    No Image
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  News
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(item.published_at).toLocaleDateString('id-ID')}</span>
                <span className="flex items-center gap-1.5"><User size={12} /> {item.author}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 uppercase italic">
                {item.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                {item.content}
              </p>
              
              <button className="text-xs font-bold text-gray-800 hover:text-orange-600 transition-colors uppercase tracking-widest border-b border-gray-200 group-hover:border-orange-500 pb-1">
                BACA SELENGKAPNYA
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;