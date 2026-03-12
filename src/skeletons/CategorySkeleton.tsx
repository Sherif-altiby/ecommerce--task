
const CategorySkeleton = () => {
  return (
    <div className="rounded-2xl p-5 bg-white border border-blue-100 animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-blue-50 mx-auto mb-3" />
      <div className="h-3 bg-blue-50 rounded w-2/3 mx-auto mb-2" />
      <div className="h-2 bg-blue-50 rounded w-1/2 mx-auto" />
    </div>
  );
};

export default CategorySkeleton;
