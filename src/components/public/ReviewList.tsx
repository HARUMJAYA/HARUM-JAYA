import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star, CheckCircle2 } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {reviews.length === 0 ? (
        <div className="col-span-full text-center py-10 text-gray-400 italic bg-white rounded-xl border border-dashed">Belum ada ulasan publik.</div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10 ring-2 ring-gray-50">
                <AvatarFallback className="bg-orange-600 text-white text-xs font-bold">
                  {review.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <h4 className="font-bold text-[13px] text-gray-900 flex items-center gap-1.5 truncate">
                  {review.name}
                  <CheckCircle2 size={12} className="text-blue-500 fill-blue-500 text-white shrink-0" />
                </h4>
                <p className="text-[10px] text-gray-400">
                  {new Date(review.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={`${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                />
              ))}
            </div>

            <p className="text-[13px] text-gray-700 leading-relaxed mb-4 flex-1 line-clamp-4">
              {review.comment}
            </p>

            {review.image_url && (
              <div className="mb-3 rounded-lg overflow-hidden border border-gray-50 h-32">
                <img src={review.image_url} alt="Review" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;