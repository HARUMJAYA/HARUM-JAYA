import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from "@/utils/toast";

interface ReviewFormProps {
  onSuccess: () => void;
}

const ReviewForm = ({ onSuccess }: ReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      showError("Harap isi nama dan komentar Anda");
      return;
    }

    setIsSubmitting(true);
    try {
      let publicUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `review-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('reviews')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: url } } = supabase.storage
          .from('reviews')
          .getPublicUrl(fileName);
        publicUrl = url;
      }

      const { error } = await supabase.from("reviews").insert([
        { name, rating, comment, image_url: publicUrl }
      ]);

      if (error) throw error;

      showSuccess("Ulasan Anda berhasil dikirim!");
      setName("");
      setComment("");
      setImageFile(null);
      setPreview(null);
      setRating(5);
      onSuccess();
    } catch (err: any) {
      showError("Gagal mengirim ulasan: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold uppercase italic text-gray-800">Berikan Nilai Anda</h3>
        <p className="text-xs text-gray-500">Pengalaman Anda sangat berharga bagi kami</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none transition-transform hover:scale-110"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={32}
                className={`${
                  (hover || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                } transition-colors`}
              />
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Nama Lengkap Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50"
            required
          />
          <Textarea
            placeholder="Tulis ulasan Anda di sini..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-gray-50 min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          {preview ? (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => { setPreview(null); setImageFile(null); }}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
              >
                <X size={10} />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-2 text-xs text-[#4834d4] font-bold cursor-pointer hover:underline">
              <Upload size={14} />
              UNGGAH FOTO PROYEK/PENGALAMAN
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full bg-[#4834d4] hover:bg-[#341f97] text-white font-bold"
        >
          {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
          KIRIM ULASAN
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;