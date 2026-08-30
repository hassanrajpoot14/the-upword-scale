"use client";

import { useEffect, useState } from "react";

function formatPktTime(date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/**
 * Live PKT / UTC+5 operating status for the footer.
 */
export default function LivePktBadge({ className = "" }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => setTime(formatPktTime(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>
        Operating in PKT / UTC+5
        {time ? (
          <>
            {" "}
            <span className="font-mono text-emerald-200/90">{time}</span>
          </>
        ) : null}{" "}
        — Available for New Projects
      </span>
    </div>
  );
}
