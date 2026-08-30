import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiDocker,
  SiNodedotjs,
  SiTypescript,
  SiPostgresql,
  SiThreedotjs,
} from "react-icons/si";
import { CORE_ECOSYSTEM } from "../../data/techIcons";

export const TECH_REGISTRY = {
  nextjs: { Icon: SiNextdotjs, label: "Next.js" },
  react: { Icon: SiReact, label: "React" },
  tailwind: { Icon: SiTailwindcss, label: "Tailwind CSS" },
  docker: { Icon: SiDocker, label: "Docker" },
  nodejs: { Icon: SiNodedotjs, label: "Node.js" },
  typescript: { Icon: SiTypescript, label: "TypeScript" },
  postgresql: { Icon: SiPostgresql, label: "PostgreSQL" },
  r3f: { Icon: SiThreedotjs, label: "R3F" },
};

const ICON_CLASS =
  "text-slate-400 transition-colors duration-200 hover:text-emerald-500 group-hover:text-emerald-500";

function resolveKeys(keys) {
  return (keys || [])
    .map((key) => {
      const entry = TECH_REGISTRY[key];
      if (!entry) return null;
      return { key, ...entry };
    })
    .filter(Boolean);
}

/**
 * Shared tech logo row — monochrome slate → emerald on hover.
 *
 * @param {"icons"|"builtWith"|"chips"|"strip"} variant
 */
export default function TechIconRow({
  keys = CORE_ECOSYSTEM,
  variant = "icons",
  size = "md",
  className = "",
  label = "Built With:",
  tone = "light",
}) {
  const items = resolveKeys(keys);
  if (!items.length) return null;

  const iconSize =
    size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-5 w-5" : "h-4 w-4";

  if (variant === "builtWith") {
    return (
      <div
        className={`pointer-events-none relative z-20 inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-2.5 py-1.5 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90 ${className}`}
        aria-label={label}
      >
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        <ul className="pointer-events-auto flex items-center gap-1.5">
          {items.map(({ key, Icon, label: techLabel }) => (
            <li key={key} title={techLabel}>
              <Icon
                className={`${iconSize} ${ICON_CLASS}`}
                aria-label={techLabel}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (variant === "chips") {
    return (
      <ul
        className={`flex flex-wrap gap-1.5 ${className}`}
        aria-label="Tech stack"
      >
        {items.map(({ key, Icon, label: techLabel }) => (
          <li
            key={key}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50/90 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
          >
            <Icon className={`${iconSize} ${ICON_CLASS}`} aria-hidden />
            <span>{techLabel}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (variant === "strip") {
    const isDark = tone === "dark";
    return (
      <div
        className={`inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 ${className}`}
        role="list"
        aria-label="Core tech ecosystem"
      >
        {items.map(({ key, Icon, label: techLabel }) => (
          <span
            key={key}
            role="listitem"
            title={techLabel}
            className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider ${
              isDark ? "text-slate-500" : "text-slate-500"
            }`}
          >
            <Icon
              className={`${iconSize} ${
                isDark
                  ? "text-slate-500 transition-colors duration-200 hover:text-emerald-400"
                  : ICON_CLASS
              }`}
              aria-hidden
            />
            <span className="hidden sm:inline">{techLabel}</span>
          </span>
        ))}
      </div>
    );
  }

  // variant === "icons" — compact meta row for blog headers
  return (
    <ul
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Tech ecosystem"
    >
      {items.map(({ key, Icon, label: techLabel }) => (
        <li key={key} title={techLabel}>
          <Icon
            className={`${iconSize} ${ICON_CLASS}`}
            aria-label={techLabel}
          />
        </li>
      ))}
    </ul>
  );
}
