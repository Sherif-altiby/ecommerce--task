import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useLang } from "../../store/hooks";


interface ImageGalleryProps {
  images:      string[];
  activeIndex: number;
  badge:       string | null;
  onSelect:    (i: number) => void;
  onZoom:      () => void;
}

const ImageGallery = ({ images, activeIndex, badge, onSelect, onZoom }: ImageGalleryProps) => {
  const { isAr } = useLang();

  const prev = () => onSelect((activeIndex - 1 + images.length) % images.length);
  const next = () => onSelect((activeIndex + 1) % images.length);

  const badgeColors: Record<string, string> = {
    Hot:  "bg-red-500",
    Sale: "bg-orange-500",
    New:  "bg-emerald-500",
  };

  return (
    <div className="flex flex-col gap-3">

      {/* ── Main image ── */}
      <div className="relative bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden aspect-square flex items-center justify-center group">

        {/* Badge */}
        {badge && (
          <span className={`absolute top-3 start-3 px-3 py-1 rounded-full text-white text-xs font-extrabold uppercase tracking-wide z-10 ${badgeColors[badge] ?? "bg-blue-500"}`}>
            {badge}
          </span>
        )}

        {/* Zoom button */}
        <button
          onClick={onZoom}
          className="absolute top-3 end-3 z-10 w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-slate-600 hover:bg-white hover:text-blue-600 hover:scale-110 transition-all"
          title="Zoom"
        >
          <ZoomIn size={16} />
        </button>

        {/* Nav arrows — only when multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={isAr ? next : prev}
              className="absolute start-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-slate-600 hover:bg-white hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={isAr ? prev : next}
              className="absolute end-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-slate-600 hover:bg-white hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Image */}
        <span
          className="text-[8rem] select-none transition-transform duration-300 hover:scale-110 cursor-zoom-in"
          onClick={onZoom}
        >
          {images[activeIndex]}
        </span>

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeIndex ? "bg-blue-600 w-4" : "bg-slate-300"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnails ── */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`flex-1 aspect-square rounded-xl bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-3xl transition-all border-2
                ${i === activeIndex
                  ? "border-blue-500 shadow-md shadow-blue-100 scale-105"
                  : "border-transparent hover:border-blue-200"
                }`}
            >
              {img}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;