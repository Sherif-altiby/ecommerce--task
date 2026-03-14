import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FooterCol = ({
  title, titleAr, links, isAr,
}: {
  title: string; titleAr: string;
  links: { label: string; labelAr: string; to: string }[];
  isAr: boolean;
}) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
      {isAr ? titleAr : title}
    </h4>
    <ul className="flex flex-col gap-2.5">
      {links.map((l) => (
        <li key={l.label}>
          <Link
            to={l.to}
            className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
          >
            <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100">
              <ArrowRight size={10} className="text-blue-400 shrink-0" />
            </span>
            {isAr ? l.labelAr : l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);


export default FooterCol