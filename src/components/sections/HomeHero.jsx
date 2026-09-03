import DynamicServiceTitle from "../ui/DynamicServiceTitle";
import BookCallButton from "../booking/BookCallButton";
import ActionLink from "../ui/ActionLink";
import HeroCanvasLazy from "../three/HeroCanvasLazy";

/**
 * Server Component hero — brand, headline, and CTAs are in the RSC HTML payload.
 * Only the WebGL canvas is deferred to the client.
 */
export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#07110f] lg:min-h-[100svh]">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#07110f] to-[#0B1120]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 70% 45%, rgba(16,185,129,0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(20,184,166,0.12), transparent 55%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8FAF9] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-4 pb-16 pt-24 sm:gap-10 sm:px-6 sm:pb-24 sm:pt-28 lg:min-h-[100svh] lg:grid-cols-2 lg:items-center lg:gap-12 lg:pb-28">
        <div className="relative z-10 min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-400/90">
            The Upward Scale
          </p>

          <h1 className="mt-3 text-3xl font-extrabold leading-snug tracking-tight sm:mt-5 sm:text-5xl sm:leading-[1.08] md:text-6xl lg:text-[3.25rem] lg:leading-[1.05] xl:text-7xl">
            <span className="heading-gradient-dark">Elite</span>
            <span className="block py-0.5 sm:inline sm:px-1">
              <DynamicServiceTitle />
            </span>
            <span className="heading-gradient-dark">at Scale</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
            High-performance architectures and premium interfaces engineered to
            turn ambitious brands into category leaders.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <BookCallButton
              magnetic
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Book Call
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </BookCallButton>
            <ActionLink
              href="/case-studies"
              magnetic
              magneticStrength={0.2}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-emerald-400/40 hover:bg-white/10"
            >
              View All Work
            </ActionLink>
          </div>
        </div>

        <div className="relative z-0 mt-6 h-[240px] w-full min-w-0 sm:mt-8 sm:h-[320px] md:mt-0 md:h-[420px] lg:h-[500px]">
          <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-emerald-500/5 blur-2xl" />
          <HeroCanvasLazy className="h-full w-full overflow-hidden rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
