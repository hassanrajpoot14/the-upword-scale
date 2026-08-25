export default function ServiceSlugLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 py-24">
      {/* Background tech grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 50%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16 md:gap-24 animate-pulse">
          
          {/* 1. Hero Area Skeleton */}
          <div className="flex flex-col items-center text-center">
            {/* Badge Skeleton */}
            <div className="h-6 w-32 rounded-full bg-slate-200" />
            
            {/* Title Skeleton */}
            <div className="mt-6 h-12 w-3/4 max-w-2xl rounded-2xl bg-slate-200" />
            <div className="mt-2 h-12 w-1/2 max-w-lg rounded-2xl bg-slate-200" />
            
            {/* Subtext Skeletons */}
            <div className="mt-8 h-4 w-5/6 max-w-xl rounded bg-slate-200" />
            <div className="mt-2.5 h-4 w-4/6 max-w-md rounded bg-slate-200" />
            
            {/* CTA Button Skeletons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <div className="h-12 w-48 rounded-full bg-slate-200" />
              <div className="h-12 w-36 rounded-full bg-slate-200" />
            </div>
          </div>

          {/* 2. Metrics Block Skeleton */}
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm sm:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="h-10 w-24 rounded-xl bg-slate-200" />
                  <div className="h-4 w-28 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </div>

          {/* 3. Benefits Grid Skeleton */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="h-8 w-44 rounded-xl bg-slate-200" />
              <div className="h-4 w-72 rounded bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                  <div className="h-10 w-10 rounded-full bg-slate-200" />
                  <div className="mt-6 h-6 w-32 rounded bg-slate-200" />
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-full rounded bg-slate-200" />
                    <div className="h-3 w-5/6 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
