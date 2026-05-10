import { MessageCircle, Instagram } from 'lucide-react';

const WHATSAPP_PHONE = '+27671733036';
const WHATSAPP_MESSAGE = 'Hi Section8Studios! I would like to inquire about your services.';
const INSTAGRAM_HANDLE = '@section8studioss';
const INSTAGRAM_URL = 'https://instagram.com/section8studioss';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramClick = () => {
    window.open(INSTAGRAM_URL, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-center">
      {/* Instagram Button */}
      <button
        onClick={handleInstagramClick}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Follow us on Instagram"
        title={`Follow us on Instagram: ${INSTAGRAM_HANDLE}`}
      >
        <Instagram className="w-6 h-6" />
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
