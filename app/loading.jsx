export default function GlobalLoading() {
  return (
    <div className="relative flex min-h-[60vh] w-full items-center justify-center bg-slate-50/50 py-24">
      {/* Background grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
      
      <div className="relative flex flex-col items-center gap-4">
        {/* Subtle CSS Pulse/Ring Spinner aligned with Emerald branding */}
        <div className="relative flex h-12 w-12 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-8 w-8 rounded-full bg-emerald-600 shadow-lg shadow-emerald-500/20" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 animate-pulse">
          Loading Systems
        </p>
      </div>
    </div>
  );
}
