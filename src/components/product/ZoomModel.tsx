// src/pages/ProductDetail/components/ZoomModal.tsx

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useLang } from "../../store/hooks";


interface ZoomModalProps {
  images:      string[];
  activeIndex: number;
  onClose:     () => void;
  onSelect:    (i: number) => void;
}

const ZoomModal = ({ images, activeIndex, onClose, onSelect }: ZoomModalProps) => {
  const { isAr } = useLang();

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onSelect((activeIndex + 1) % images.length);
      if (e.key === "ArrowLeft")  onSelect((activeIndex - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, images.length, onClose, onSelect]);

  const prev = () => onSelect((activeIndex - 1 + images.length) % images.length);
  const next = () => onSelect((activeIndex + 1) % images.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 end-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
      >
        <X size={20} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={isAr ? next : prev}
          className="absolute start-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Main zoomed image */}
      <div className="relative z-10 flex flex-col items-center gap-4 p-8">
        <span className="text-[12rem] leading-none select-none drop-shadow-2xl animate-[zoomIn_0.25s_ease]">
          {images[activeIndex]}
        </span>

        {/* Counter */}
        {images.length > 1 && (
          <span className="text-white/50 text-sm font-mono">
            {activeIndex + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={isAr ? prev : next}
          className="absolute end-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
        >
          <ChevronRight size={24} />
        </button>
      )}

      <style>{`
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ZoomModal;