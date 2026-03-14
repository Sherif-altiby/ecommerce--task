const Shimmer = ({ className }: { className: string }) => (
  <div
    className={`rounded-xl bg-linear-to- from-blue-100 via-blue-50 to-blue-100 ${className}`}
    style={{ animation: "shimmer 1.5s ease-in-out infinite", backgroundSize: "400% 100%" }}
  />
);

const OrderCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
    <div className="h-1 bg-blue-100 w-full" />
    <div className="p-5 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <Shimmer className="h-4 w-32" />
          <Shimmer className="h-3 w-20" />
        </div>
        <Shimmer className="h-6 w-24 rounded-full" />
      </div>
      <div className="flex gap-2">
        {[0,1,2].map(i => <Shimmer key={i} className="w-10 h-10 rounded-xl" />)}
      </div>
      <div className="flex justify-between pt-3 border-t border-slate-50">
        <Shimmer className="h-4 w-28" />
        <Shimmer className="h-5 w-16" />
      </div>
    </div>
  </div>
);

const OrdersSkeleton = () => (
  <>
    <style>{`
      @keyframes shimmer {
        0%   { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }
    `}</style>
    {Array.from({ length: 3 }).map((_, i) => <OrderCardSkeleton key={i} />)}
  </>
);

export default OrdersSkeleton;