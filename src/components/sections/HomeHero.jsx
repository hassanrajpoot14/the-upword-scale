import DynamicServiceTitle from "../ui/DynamicServiceTitle";
import BookCallButton from "../booking/BookCallButton";
import ActionLink from "../ui/ActionLink";
import HeroCanvasLazy from "../three/HeroCanvasLazy";

/**
 * Server Component hero — brand, headline, and CTAs are in the RSC HTML payload.
 * Only the WebGL canvas is deferred to the client.
 *
 * Mobile: one canvas as atmosphere behind the copy (first viewport = one composition).
 * Desktop: same canvas sits in the right grid column.
 */
export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#07110f]">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#07110f] to-[#0B1120]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 70% 45%, rgba(16,185,129,0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(20,184,166,0.12), transparent 55%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F8FAF9] to-transparent sm:h-28 lg:h-32" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center px-5 pb-12 pt-[5.25rem] sm:px-6 sm:pb-16 sm:pt-28 lg:grid-cols-2 lg:gap-12 lg:pb-28 lg:pt-28">
        <div className="relative z-10 min-w-0">
          <p className="font-display text-base font-semibold tracking-tight text-emerald-400 sm:text-sm sm:font-semibold sm:uppercase sm:tracking-[0.22em] sm:text-emerald-400/90">
            The Upward Scale
          </p>

          <h1 className="mt-2 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:mt-4 sm:text-5xl sm:leading-[1.08] md:text-6xl lg:text-[3.25rem] lg:leading-[1.05] xl:text-7xl">
            <span className="heading-gradient-dark">Elite</span>
            <span className="block py-0.5 sm:inline sm:px-1">
              <DynamicServiceTitle />
            </span>
            <span className="heading-gradient-dark">at Scale</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">
            High-performance architectures and premium interfaces engineered to
            turn ambitious brands into category leaders.
          </p>

          <div className="mt-5 flex flex-row flex-wrap items-center gap-2.5 sm:mt-9 sm:gap-3">
            <BookCallButton
              magnetic
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 sm:px-7 sm:py-3.5"
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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-emerald-400/40 hover:bg-white/10 sm:px-7 sm:py-3.5"
            >
              View All Work
            </ActionLink>
          </div>
        </div>

        {/*
          One canvas instance:
          - Mobile: absolute atmosphere behind copy (no extra vertical stack)
          - lg+: sits in the right column as the visual panel
        */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[8%] top-[22%] -z-0 min-h-0 opacity-85 lg:pointer-events-auto lg:relative lg:inset-auto lg:z-0 lg:mt-0 lg:h-[500px] lg:opacity-100"
          aria-hidden
        >
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#07110f] via-transparent to-[#07110f]/80 lg:hidden" />
          <div className="pointer-events-none absolute -inset-4 hidden rounded-3xl bg-emerald-500/5 blur-2xl lg:block" />
          <HeroCanvasLazy className="h-full w-full overflow-hidden lg:rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
