"use client";

import { useEffect, useState } from "react";
import MicroUiScale from "../ui/MicroUiScale";

const FRAMES = [
  [
    { c: "kw", t: "export" },
    { c: "pl", t: " " },
    { c: "fn", t: "default" },
    { c: "pl", t: " " },
    { c: "fn", t: "Page" },
    { c: "pl", t: "() {" },
  ],
  [
    { c: "pl", t: "  " },
    { c: "kw", t: "return" },
    { c: "pl", t: " (" },
  ],
  [
    { c: "pl", t: "    <" },
    { c: "tag", t: "main" },
    { c: "pl", t: " " },
    { c: "attr", t: "className" },
    { c: "pl", t: "=" },
    { c: "str", t: '"grid gap-6"' },
    { c: "pl", t: ">" },
  ],
  [
    { c: "pl", t: "      <" },
    { c: "tag", t: "Hero" },
    { c: "pl", t: " " },
    { c: "attr", t: "score" },
    { c: "pl", t: "={" },
    { c: "num", t: "99" },
    { c: "pl", t: "} />" },
  ],
  [{ c: "pl", t: "    </" }, { c: "tag", t: "main" }, { c: "pl", t: ">" }],
  [{ c: "pl", t: "  );" }],
  [{ c: "pl", t: "}" }],
];

const COLOR = {
  kw: "text-emerald-600",
  fn: "text-sky-600",
  tag: "text-teal-600",
  attr: "text-amber-600",
  str: "text-lime-700",
  num: "text-fuchsia-600",
  pl: "text-slate-500",
};

/**
 * Mini animated React/Tailwind code preview for service cards.
 */
export default function MiniCodePreview({ className = "" }) {
  const [visibleRows, setVisibleRows] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setVisibleRows((n) => (n >= FRAMES.length ? 1 : n + 1));
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-inner ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-white px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="ml-2 truncate font-mono text-[10px] text-slate-400">
          page.tsx
        </span>
      </div>
      <MicroUiScale>
        <pre className="p-3 font-mono text-[10px] leading-5 sm:text-[11px]">
          <code>
            {FRAMES.slice(0, visibleRows).map((row, i) => (
              <div key={i} className="flex gap-2 whitespace-pre">
                <span className="w-3 shrink-0 select-none text-right text-slate-300">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  {row.map((tok, j) => (
                    <span key={j} className={COLOR[tok.c]}>
                      {tok.t}
                    </span>
                  ))}
                  {i === visibleRows - 1 ? (
                    <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-emerald-500 align-middle" />
                  ) : null}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </MicroUiScale>
    </div>
  );
}
