import { MessageSquare } from "lucide-react";

const WhatsAppFloat = () => {
  const phoneNumber = "628518016088"; // Sesuaikan nomor
  const message = "Halo CV IM, saya ingin berkonsultasi mengenai proyek konstruksi.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-bounce group"
      aria-label="Chat WhatsApp"
    >
      <MessageSquare size={28} />
      <span className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-gray-100 pointer-events-none">
        Konsultasi Sekarang!
      </span>
    </a>
  );
};

export default WhatsAppFloat;