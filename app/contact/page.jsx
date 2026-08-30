import dynamic from "next/dynamic";
import { buildPageMetadata } from "../../src/lib/og/metadata";
import ContactFormSkeleton from "../../src/components/ui/ContactFormSkeleton";
import { CONTACT_INFO } from "../../src/data/contactInfo";

const ContactForm = dynamic(
  () => import("../../src/components/sections/ContactForm"),
  { loading: () => <ContactFormSkeleton /> }
);

export const metadata = buildPageMetadata({
  title: "Contact Us | The Upward Scale",
  description:
    "Connect with our growth architects to scale your digital brand to maximum velocity.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute left-1/3 top-10 -z-10 h-[500px] w-[500px] max-w-full rounded-full bg-emerald-100/30 blur-[130px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/4 -z-10 h-[400px] w-[400px] max-w-full rounded-full bg-teal-50/40 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-4 pt-24 pb-24 sm:px-6 sm:pt-32 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Project Planner
              </div>

              <h1 className="heading-gradient text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Scope your next launch
              </h1>

              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                Pick a service lane, set a budget band, and share a short brief.
                We&apos;ll turn it into a concrete roadmap — usually within 24
                hours.
              </p>
            </div>

            <div className="mt-12 space-y-6">
              {[
                {
                  label: "Direct Email",
                  href: `mailto:${CONTACT_INFO.email}`,
                  text: CONTACT_INFO.email,
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                },
                ...(CONTACT_INFO.phone && CONTACT_INFO.phoneHref
                  ? [
                      {
                        label: "Direct Support Line",
                        href: CONTACT_INFO.phoneHref,
                        text: CONTACT_INFO.phone,
                        icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                      },
                    ]
                  : []),
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl card-glass text-emerald-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{item.label}</h3>
                    <a
                      href={item.href}
                      className="mt-1 text-sm text-slate-600 transition hover:text-emerald-600"
                    >
                      {item.text}
                    </a>
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl card-glass text-emerald-600">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Studio Model</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {CONTACT_INFO.studioTagline}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl card-glass text-emerald-600">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Operating Window</h3>
                  <p className="mt-1 inline-flex items-center gap-2 text-sm text-slate-600">
                    <span
                      className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500"
                      aria-hidden
                    />
                    {CONTACT_INFO.timezoneLabel} — {CONTACT_INFO.availability}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
