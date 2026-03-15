// src/components/product/ImageGallery.tsx
import { ChevronLeft, ChevronRight, ZoomIn, Expand } from "lucide-react";
import { useLang } from "../../store/hooks";

interface ImageGalleryProps {
  images:      string[];
  activeIndex: number;
  badge:       string | null;
  onSelect:    (i: number) => void;
  onZoom:      () => void;
}

const BADGE_STYLES: Record<string, { bg: string; dot: string }> = {
  Hot:  { bg: "bg-rose-500",    dot: "bg-rose-300"    },
  Sale: { bg: "bg-amber-500",   dot: "bg-amber-300"   },
  New:  { bg: "bg-emerald-500", dot: "bg-emerald-300" },
};

const ImageGallery = ({ images, activeIndex, badge, onSelect, onZoom }: ImageGalleryProps) => {
  const { isAr } = useLang();

  const prev = () => onSelect((activeIndex - 1 + images.length) % images.length);
  const next = () => onSelect((activeIndex + 1) % images.length);

  const badgeStyle = badge ? (BADGE_STYLES[badge] ?? { bg: "bg-blue-500", dot: "bg-blue-300" }) : null;

  return (
    <div className="flex flex-col gap-3">

      {/* ── Main image ─────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden aspect-square group bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize:  "24px 24px",
          }}
        />

        {/* Glow behind emoji */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        {/* Badge */}
        {badge && badgeStyle && (
          <span className={`absolute top-4 start-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-lg ${badgeStyle.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot} animate-pulse`} />
            {badge}
          </span>
        )}

        {/* Zoom button */}
        <button
          onClick={onZoom}
          className="absolute top-4 end-4 z-20 w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white hover:scale-110 transition-all shadow-lg"
          title="Zoom"
        >
          <Expand size={15} />
        </button>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={isAr ? next : prev}
              className="absolute inset-s-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all shadow-lg opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={isAr ? prev : next}
              className="absolute inset-e-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all shadow-lg opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Emoji image */}
        <button
          onClick={onZoom}
          className="absolute inset-0 flex items-center justify-center cursor-zoom-in"
        >
          <span className="text-[9rem] leading-none select-none drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
            {images[activeIndex]}
          </span>
        </button>

        {/* Bottom overlay with counter + dots */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-900/70 to-transparent pointer-events-none" />

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                className={`rounded-full transition-all duration-300 pointer-events-auto
                  ${i === activeIndex
                    ? "w-5 h-1.5 bg-white shadow-md"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>
        )}

        {/* Image counter top-right corner (only when multiple) */}
        {images.length > 1 && (
          <div className="absolute bottom-4 end-4 z-20 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white/70 text-[10px] font-bold">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* ── Thumbnails ─────────────────────────────────── */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`relative flex-1 aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all duration-200 overflow-hidden
                bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                ${i === activeIndex
                  ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white scale-105 shadow-lg shadow-blue-200"
                  : "opacity-60 hover:opacity-100 hover:scale-102"
                }`}
            >
              {/* Active glow */}
              {i === activeIndex && (
                <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
              )}
              {img}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;