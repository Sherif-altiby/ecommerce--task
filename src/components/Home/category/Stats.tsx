import { useLang } from "../../../store/hooks";

const stats = [
  { num: "1M+",  labelKey: "statProducts" },
  { num: "50K+", labelKey: "statSellers"  },
  { num: "4.8★", labelKey: "statRating"   },
  { num: "Free", labelKey: "statReturns"  },
];

const Stats = () => {
    const { t } = useLang()
  return (
   <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-2">
  <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
    {stats.map((s) => (
      <div key={s.labelKey} className="text-center">
        <span className="block text-2xl font-extrabold text-blue-600">
          {s.num}
        </span>
        <span className="block text-xs text-slate-500 font-medium mt-0.5">
          {t(s.labelKey)}
        </span>
      </div>
    ))}
  </div>
</div>
  )
}

export default Stats