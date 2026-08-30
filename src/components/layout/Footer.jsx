import Link from "next/link";
import BrandLogo from "../ui/BrandLogo";
import BookCallButton from "../booking/BookCallButton";
import LivePktBadge from "./LivePktBadge";
import StatusBadge from "../ui/StatusBadge.jsx";
import { CONTACT_INFO } from "../../data/contactInfo";
import { SITE_CTAS } from "../../data/siteRoutes";

const COPYRIGHT_YEAR = 2026;

const ARCHITECTURE_LINKS = [
  { label: "Web Architecture", href: "/services/web-development" },
  { label: "App Engineering", href: "/services/app-development" },
  { label: "DevOps & Cloud", href: "/services/devops-cloud" },
  { label: "About the Studio", href: "/about" },
];

const SOLUTIONS_LINKS = [
  { label: "AI Optimization", href: "/services/ai-optimization" },
  { label: "SEO Systems", href: "/services/seo" },
  { label: "Brand Strategy", href: "/services/brand-strategy" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/blogs" },
];

const SYSTEM_STATUS = [
  { label: "Edge delivery", status: "Operational" },
  { label: "CI / CD pipelines", status: "Healthy" },
  { label: "Observability", status: "Live" },
  { label: "Client intake", status: "Open" },
];

function FooterColumn({ title, children }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 light:text-slate-600 text-slate-500 dark:text-slate-500">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 light:border-slate-200 border-slate-800 dark:border-slate-800 bg-slate-100 light:bg-slate-100 bg-slate-950 dark:bg-slate-950 text-slate-600 light:text-slate-600 text-slate-300 dark:text-slate-300 transition-colors duration-300">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 40% at 15% 0%, rgba(16,185,129,0.12), transparent), radial-gradient(ellipse 40% 30% at 90% 100%, rgba(20,184,166,0.08), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-8 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="light:block dark:hidden">
              <BrandLogo tone="light" />
            </div>
            <div className="hidden dark:block">
              <BrandLogo tone="dark" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 light:text-slate-600 text-slate-400 dark:text-slate-400">
              {CONTACT_INFO.studioTagline}
            </p>
            <StatusBadge
              regionDetail="Primary Region: fra1 • Uptime 99.99%"
              className="mt-5"
            />
            <LivePktBadge className="mt-4" />
          </div>

          <BookCallButton
            magnetic
            className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-300 transition hover:border-emerald-400/50 hover:bg-emerald-500/15 hover:text-emerald-200 lg:self-auto"
          >
            {SITE_CTAS.bookCall.label}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </BookCallButton>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <FooterColumn title="Architecture">
            <ul className="mt-4 space-y-2.5">
              {ARCHITECTURE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Solutions">
            <ul className="mt-4 space-y-2.5">
              {SOLUTIONS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="System Status">
            <ul className="mt-4 space-y-3">
              {SYSTEM_STATUS.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                >
                  <span className="inline-flex items-center gap-2 text-slate-300">
                    <span
                      className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                      aria-hidden
                    />
                    {item.label}
                  </span>
                  <span className="text-xs font-medium text-emerald-400/90">
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Direct Contact">
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-slate-300 transition hover:text-emerald-400"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              {CONTACT_INFO.phone && CONTACT_INFO.phoneHref ? (
                <li>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="text-slate-300 transition hover:text-emerald-400"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </li>
              ) : null}
              <li className="leading-relaxed text-slate-400">
                Remote-first · Global delivery
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-medium text-emerald-400 transition hover:text-emerald-300"
                >
                  Open project planner →
                </Link>
              </li>
            </ul>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {COPYRIGHT_YEAR} The Upward Scale. All rights reserved.</p>
          <p className="tracking-wide">
            Elite Digital Growth Systems · {CONTACT_INFO.timezoneLabel}
          </p>
        </div>
      </div>
    </footer>
  );
}
