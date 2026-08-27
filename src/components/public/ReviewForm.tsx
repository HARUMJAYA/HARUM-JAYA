import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star, Camera, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { showSuccess, showError } from "@/utils/toast";

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ReviewForm = ({ isOpen, onClose, onSuccess }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
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

  const handleSubmit = async () => {
    if (rating === 0) {
      showError("Harap berikan rating bintang");
      return;
    }
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

      showSuccess("Ulasan Anda berhasil diposting!");
      setName("");
      setComment("");
      setImageFile(null);
      setPreview(null);
      setRating(0);
      onSuccess();
      onClose();
    } catch (err: any) {
      showError("Gagal mengirim ulasan: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-center mb-2">
            <p className="text-sm font-medium text-gray-700">PT. Harum Jaya, Banda Aceh</p>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">U</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="font-bold text-gray-900 border-none p-0 focus:ring-0 w-full text-lg"
              />
              <p className="text-xs text-gray-500">Memposting untuk publik di Google (Simulasi)</p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6 flex flex-col items-center">
          <div className="flex gap-1">
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
                  size={40}
                  strokeWidth={1}
                  className={`${
                    (hover || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
          
          <p className="text-sm font-medium text-gray-500">
            {rating === 5 ? "Sangat Bagus" : rating === 4 ? "Bagus" : rating === 3 ? "Cukup" : rating === 2 ? "Kurang" : rating === 1 ? "Buruk" : "Beri Nilai"}
          </p>

          <div className="w-full border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <Textarea
              placeholder="Bagikan detail pengalaman Anda sendiri di tempat ini"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-none min-h-[120px] text-base p-4 resize-none focus-visible:ring-0"
            />
          </div>

          <div className="w-full">
            {preview ? (
              <div className="relative inline-block group">
                <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-xl border" />
                <button 
                  onClick={() => { setPreview(null); setImageFile(null); }}
                  className="absolute -top-2 -right-2 bg-white border shadow-md rounded-full p-1 hover:bg-red-50 text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-3 w-full py-3 bg-blue-50 text-blue-600 rounded-full font-bold text-sm cursor-pointer hover:bg-blue-100 transition-colors border border-blue-100">
                <Camera size={18} />
                Tambahkan foto & video
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            )}
          </div>
        </div>

        <DialogFooter className="p-4 bg-gray-50 flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose} className="rounded-lg font-bold text-blue-600 hover:bg-blue-50">
            Batal
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-8"
          >
            {isSubmitting ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
            Posting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;