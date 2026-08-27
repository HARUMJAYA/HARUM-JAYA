import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star, ImageIcon, User } from "lucide-react";
import { Loader2 } from "lucide-react";

const ReviewList = ({ refreshKey }: { refreshKey: number }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [refreshKey]);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#4834d4]" /></div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.length === 0 ? (
        <div className="col-span-full text-center py-10 text-gray-400 italic">Belum ada ulasan. Jadilah yang pertama memberikan nilai!</div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4834d4] flex items-center justify-center text-white font-bold">
                {review.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-800 flex items-center gap-2">
                  {review.name}
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1.5 border-r border-b border-white rotate-45 mb-0.5"></div>
                  </div>
                </h4>
                <p className="text-[10px] text-gray-400">
                  {new Date(review.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                />
              ))}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed italic line-clamp-4">
              "{review.comment}"
            </p>

            {review.image_url && (
              <div className="pt-2">
                <div className="h-32 w-full rounded-lg overflow-hidden border">
                  <img src={review.image_url} alt="Review" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-gray-50 flex items-center gap-2 opacity-50">
               <img src="/logo.png" className="w-4 h-4 grayscale" alt="" />
               <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Verified Review</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;