
const Shimmer = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 bg-[length:400%_100%] rounded-xl ${className}`}
    style={{ animation: "shimmer 1.5s ease-in-out infinite", backgroundSize: "400% 100%" }}
  />
);

const ProductDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

    {/* Left — image */}
    <div className="flex flex-col gap-3">
      <Shimmer className="aspect-square rounded-2xl" />
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => <Shimmer key={i} className="flex-1 aspect-square rounded-xl" />)}
      </div>
    </div>

    {/* Right — info */}
    <div className="flex flex-col gap-5 pt-2">
      <Shimmer className="h-4 w-24 rounded-full" />
      <Shimmer className="h-8 w-3/4" />
      <Shimmer className="h-5 w-40" />
      <Shimmer className="h-10 w-36" />
      <div className="h-px bg-blue-100" />
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2].map((i) => <Shimmer key={i} className={`h-16 ${i === 2 ? "col-span-2" : ""}`} />)}
      </div>
      <div className="h-px bg-blue-100" />
      <Shimmer className="h-12 rounded-xl" />
      <div className="flex gap-3">
        <Shimmer className="flex-1 h-12 rounded-xl" />
        <Shimmer className="w-12 h-12 rounded-xl" />
        <Shimmer className="w-12 h-12 rounded-xl" />
      </div>
    </div>

    <style>{`
      @keyframes shimmer {
        0%   { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }
    `}</style>
  </div>
);

export default ProductDetailSkeleton;