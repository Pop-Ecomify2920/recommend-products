export const LoadingSkeleton = () => {
  return (
    <div className="animate-fade-in">
      {/* Creator Card Skeleton */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1 w-full">
            <div className="h-8 bg-gradient-to-r from-secondary via-muted to-secondary bg-[length:1000px_100%] animate-shimmer rounded mb-4 w-64"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-secondary rounded-lg p-3">
                  <div className="h-3 bg-gradient-to-r from-muted via-secondary to-muted bg-[length:1000px_100%] animate-shimmer rounded mb-2 w-16"></div>
                  <div className="h-6 bg-gradient-to-r from-muted via-secondary to-muted bg-[length:1000px_100%] animate-shimmer rounded w-12"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-12 w-40 bg-gradient-to-r from-secondary via-muted to-secondary bg-[length:1000px_100%] animate-shimmer rounded-lg"></div>
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="aspect-[4/3] bg-gradient-to-r from-secondary via-muted to-secondary bg-[length:1000px_100%] animate-shimmer"></div>
            <div className="p-4">
              <div className="h-5 bg-gradient-to-r from-secondary via-muted to-secondary bg-[length:1000px_100%] animate-shimmer rounded mb-2"></div>
              <div className="h-4 bg-gradient-to-r from-secondary via-muted to-secondary bg-[length:1000px_100%] animate-shimmer rounded mb-3 w-3/4"></div>
              <div className="h-6 bg-gradient-to-r from-secondary via-muted to-secondary bg-[length:1000px_100%] animate-shimmer rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
