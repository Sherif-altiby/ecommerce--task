import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ShoppingBag } from "lucide-react";
import { useLang } from "../../store/hooks";
import { ROUTES } from "../../types";
import FooterCol from "./FooterCol";
import { LINKS } from "../../constants";
 
const Footer = () => {
  const { isAr } = useLang();
 
  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">

      {/* ── Background grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

     
      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column — spans 2 */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Logo */}
            <Link to={ROUTES.HOME} className="flex items-center gap-2.5 w-fit group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40 group-hover:scale-110 transition-transform">
                <ShoppingBag size={18} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tight">
                Marketi
                <span className="text-blue-500">.</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {isAr
                ? "وجهتك الأولى للتسوق الذكي. منتجات أصيلة، أسعار تنافسية، وتوصيل سريع."
                : "Your premier destination for smart shopping. Authentic products, competitive prices, and fast delivery."}
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              {[
                { icon: <Mail size={13} />,    text: "support@marketi.com" },
                { icon: <Phone size={13} />,   text: "+20 100 000 0000" },
                { icon: <MapPin size={13} />,  text: isAr ? "القاهرة، مصر" : "Cairo, Egypt" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
                  <span className="text-blue-500 shrink-0">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterCol title="Shop"    titleAr="تسوق"     links={LINKS.shop}    isAr={isAr} />
          <FooterCol title="Account" titleAr="حسابي"    links={LINKS.account} isAr={isAr} />
          <FooterCol title="Support" titleAr="الدعم"    links={LINKS.support} isAr={isAr} />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex  items-center justify-center gap-4">

          {/* Copyright */}
          <p className="text-xs text-slate-600 order-2 sm:order-1">
            © {new Date().getFullYear()} Marketi.{" "}
            {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>

           
        </div>
      </div>
    </footer>
  );
};

export default Footer;