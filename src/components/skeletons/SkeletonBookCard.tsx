const SkeletonBookCard = () => (
  <div className="bg-secondary-50 border border-secondary-200 text-secondary-800 rounded-xl animate-pulse">
    <div className="relative overflow-hidden" style={{ minHeight: "200px" }}>
      <div className="w-full h-48 bg-secondary-200 rounded-xl" />
    </div>
    <div className="p-4 flex-grow flex flex-col justify-between">
      <div>
        <div className="h-5 bg-secondary-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-secondary-200 rounded w-1/2 mb-2" />
        <div className="h-3 bg-secondary-200 rounded w-1/3" />
      </div>
      <div className="mt-auto pt-3 border-t border-secondary-200">
        <div className="flex items-center">
          <div className="h-4 w-4 bg-secondary-300 rounded-full mr-2" />
          <div className="h-3 bg-secondary-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonBookCard;
