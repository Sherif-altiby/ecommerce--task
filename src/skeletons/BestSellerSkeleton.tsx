const BestSellerSkeleton = () => (
  <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden animate-pulse">
    <div className="h-44 bg-blue-50" />
    <div className="p-4 space-y-3">
      <div className="h-3 bg-blue-50 rounded w-1/3" />
      <div className="h-4 bg-blue-50 rounded w-3/4" />
      <div className="h-3 bg-blue-50 rounded w-1/2" />
      <div className="flex items-center justify-between mt-2">
        <div className="h-5 bg-blue-50 rounded w-1/4" />
        <div className="h-8 bg-blue-50 rounded w-1/4" />
      </div>
    </div>
  </div>
);

export default BestSellerSkeleton;