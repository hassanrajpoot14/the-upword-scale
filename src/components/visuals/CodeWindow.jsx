"use client";

import MicroUiScale from "../ui/MicroUiScale";

const DEFAULT_LINES = [
  { t: "keyword", v: "export" },
  { t: "plain", v: " " },
  { t: "keyword", v: "async" },
  { t: "plain", v: " " },
  { t: "fn", v: "scaleSystem" },
  { t: "plain", v: "(" },
  { t: "param", v: "config" },
  { t: "plain", v: ") {" },
  { br: true },
  { t: "plain", v: "  " },
  { t: "keyword", v: "const" },
  { t: "plain", v: " " },
  { t: "var", v: "vitals" },
  { t: "plain", v: " = " },
  { t: "fn", v: "await" },
  { t: "plain", v: " " },
  { t: "fn", v: "audit" },
  { t: "plain", v: "(" },
  { t: "param", v: "config" },
  { t: "plain", v: ".edge);" },
  { br: true },
  { t: "plain", v: "  " },
  { t: "keyword", v: "if" },
  { t: "plain", v: " (vitals.lighthouse < " },
  { t: "num", v: "99" },
  { t: "plain", v: ") {" },
  { br: true },
  { t: "plain", v: "    " },
  { t: "fn", v: "optimize" },
  { t: "plain", v: "(" },
  { t: "str", v: "'core-web-vitals'" },
  { t: "plain", v: ");" },
  { br: true },
  { t: "plain", v: "  }" },
  { br: true },
  { t: "plain", v: "  " },
  { t: "keyword", v: "return" },
  { t: "plain", v: " { status: " },
  { t: "str", v: "'live'" },
  { t: "plain", v: ", score: vitals };" },
  { br: true },
  { t: "plain", v: "}" },
];

const TOKEN = {
  keyword: "text-emerald-300",
  fn: "text-sky-300",
  param: "text-amber-200/90",
  var: "text-teal-200",
  num: "text-fuchsia-300",
  str: "text-lime-300/90",
  plain: "text-slate-300",
};

/**
 * Dark IDE-style code window with lightweight token coloring.
 */
export default function CodeWindow({
  title = "growth-engine.ts",
  lines = DEFAULT_LINES,
  className = "",
  compact = false,
}) {
  const rows = [];
  let row = [];
  lines.forEach((part, i) => {
    if (part.br) {
      rows.push(row);
      row = [];
    } else {
      row.push(
        <span key={i} className={TOKEN[part.t] || TOKEN.plain}>
          {part.v}
        </span>
      );
    }
  });
  if (row.length) rows.push(row);

  return (
    <div
      className={`relative w-full max-w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl shadow-emerald-950/20 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2.5 sm:px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate font-mono text-[10px] text-slate-500 sm:text-xs">
          {title}
        </span>
        <span className="ml-auto hidden rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-400 sm:inline">
          production
        </span>
      </div>
      <MicroUiScale>
        <pre
          className={`min-w-0 p-3 font-mono leading-relaxed sm:p-5 ${
            compact ? "text-[10px] sm:text-xs" : "text-[11px] sm:text-[13px]"
          }`}
        >
          <code className="block min-w-0">
            {rows.map((cells, i) => (
              <div key={i} className="flex gap-3 whitespace-pre">
                <span className="w-4 shrink-0 select-none text-right text-slate-600">
                  {i + 1}
                </span>
                <span className="min-w-0">{cells}</span>
              </div>
            ))}
          </code>
        </pre>
      </MicroUiScale>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent"
      />
    </div>
  );
}
