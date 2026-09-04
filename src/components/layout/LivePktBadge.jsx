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
      className={`inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-emerald-600/30 light:border-emerald-600/30 border-emerald-500/25 dark:border-emerald-500/25 bg-emerald-50 light:bg-emerald-50 bg-emerald-500/10 dark:bg-emerald-500/10 px-3.5 py-2 text-xs font-medium leading-snug text-emerald-800 light:text-emerald-800 text-emerald-300 dark:text-emerald-300 sm:rounded-full ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="min-w-0">
        Operating in PKT / UTC+5
        {time ? (
          <>
            {" "}
            <span className="font-mono font-semibold text-emerald-900 light:text-emerald-900 text-emerald-200 dark:text-emerald-200">
              {time}
            </span>
          </>
        ) : null}{" "}
        — Available for New Projects
      </span>
    </div>
  );
}
