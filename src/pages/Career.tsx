import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopHeader from "@/components/TopHeader";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, UserPlus, Briefcase, Users, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Career = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      // Ambil data dengan urutan ASC (lama ke baru)
      const { data } = await supabase
        .from("careers")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (data) {
        setItems(data);
      }
      setLoading(false);
    };
    fetchCareers();
  }, []);

  const categories = [
    { name: "Budaya kami", icon: <Users size={20} />, color: "text-blue-500", type: "article" },
    { name: "Karir Area", icon: <Briefcase size={20} />, color: "text-orange-500", type: "article" },
    { name: "Daftar kerja", icon: <FileText size={20} />, color: "text-green-500", type: "list" },
    { name: "Daftar praktek", icon: <UserPlus size={20} />, color: "text-purple-500", type: "list" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <TopHeader />
      <MainHeader />
      <Navbar />

      {/* Hero Section - Lebar Full Container */}
      <div className="bg-[#2c3e50] text-white py-24 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 leading-none">
                Karir & <br className="hidden md:block" /> <span className="text-orange-500">Budaya</span>
              </h1>
              <div className="w-24 h-2 bg-orange-500 mb-8 mx-auto md:mx-0"></div>
              <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                Bergabunglah dengan tim profesional kami dan bangun masa depan konstruksi Indonesia bersama CV IM. Kami mencari talenta terbaik untuk berinovasi bersama.
              </p>
            </div>
            <div className="hidden lg:block opacity-20">
              <Briefcase size={280} />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-7xl px-4 py-24 flex flex-col items-center">
              {loading ? (
                <div className="flex flex-col items-center justify-center p-20">
                  <Loader2 className="animate-spin text-[#4834d4] mb-4" size={40} />
                  <p className="text-gray-400 italic font-medium">Memuat data karir...</p>
                </div>
              ) : (
          <div className="space-y-32">
            {categories.map((cat) => {
              // Filter data berdasarkan kategori
              let filteredItems = items.filter(item => 
                item.category.toLowerCase() === cat.name.toLowerCase()
              );

              if (filteredItems.length === 0) return null;

              // Sorting khusus untuk Karir Area: Project Manager pertama
              if (cat.name === "Karir Area") {
                const pmIndex = filteredItems.findIndex(item => 
                  item.title.toLowerCase().includes("project manager")
                );
                if (pmIndex > -1) {
                  const pmItem = filteredItems.splice(pmIndex, 1)[0];
                  filteredItems.unshift(pmItem);
                }
              }

              return (
                              <section key={cat.name} id={cat.name.toLowerCase().replace(/\s+/g, "-")} className="animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-4xl mx-auto">
                  <div className="flex items-center gap-4 mb-16 border-b-2 border-gray-100 pb-6">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <span className={`${cat.color}`}>{cat.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 uppercase italic tracking-tight leading-none">{cat.name}</h2>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Information & Opportunities</p>
                    </div>
                  </div>

                  <div className="space-y-20">
                    {filteredItems.map((item, idx) => (
                      <div key={item.id} className="group relative">
                        {cat.type === "article" ? (
                          // Tampilan Artikel / Paragraf (untuk Budaya & Karir Area)
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                            <div className="lg:col-span-8 space-y-6">
                              <h3 className="text-3xl font-bold text-gray-900 uppercase italic tracking-tighter leading-tight group-hover:text-[#4834d4] transition-colors">
                                {item.title}
                              </h3>
                              
                              {item.image_url && (
                                <div className="block lg:hidden w-full aspect-video rounded-2xl overflow-hidden shadow-xl mb-6">
                                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                              )}
                              
                              <p className="text-gray-600 leading-loose text-xl italic whitespace-pre-line border-l-4 border-gray-100 pl-8">
                                {item.description || "Mari bergabung dan kembangkan potensi Anda bersama tim kami yang berdedikasi tinggi dalam industri konstruksi."}
                              </p>
                              
                              <Link 
                                to="/contact" 
                                className="inline-flex items-center gap-3 text-xs font-black text-[#4834d4] uppercase tracking-[0.3em] hover:gap-6 transition-all pt-4"
                              >
                                HUBUNGI ADMIN <ArrowRight size={16} />
                              </Link>
                            </div>
                            
                            {item.image_url && (
                              <div className="hidden lg:block lg:col-span-4 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500">
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                        ) : (
                          // Tampilan Daftar (untuk Daftar Kerja & Praktek)
                          <div className="flex flex-col md:flex-row gap-6 md:items-start p-8 bg-gray-50/50 rounded-3xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                            <div className="text-5xl font-black text-gray-200 group-hover:text-[#4834d4]/20 transition-colors">
                              {String(idx + 1).padStart(2, '0')}
                            </div>
                            <div className="flex-1 space-y-4">
                              <h3 className="text-2xl font-bold text-gray-800 uppercase italic tracking-tight">
                                {item.title}
                              </h3>
                              <p className="text-gray-500 leading-relaxed text-lg italic max-w-3xl">
                                {item.description}
                              </p>
                              <Link 
                                to="/contact" 
                                className="inline-flex items-center gap-2 text-[10px] font-bold text-[#4834d4] uppercase tracking-widest hover:text-orange-500 transition-colors pt-2"
                              >
                                DAFTAR SEKARANG <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Career;