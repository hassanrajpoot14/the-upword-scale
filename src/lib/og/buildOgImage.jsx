/**
 * Branded 1200×630 social preview — powered by @vercel/og via `next/og`.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
 */
import { ImageResponse } from "next/og";
import { OG_SIZE } from "./constants";

const BRAND = "The Upward Scale";

export function buildOgImage({
  title,
  description,
  eyebrow = BRAND,
  badge = "99+ Lighthouse · Core Web Vitals",
}) {
  const safeTitle = title?.slice(0, 120) || BRAND;
  const safeDesc = description?.slice(0, 180) || "";
  const safeEyebrow = eyebrow?.slice(0, 48) || BRAND;
  const safeBadge = badge?.slice(0, 64) || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(145deg, #07110f 0%, #0B1120 42%, #0f172a 100%)",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.22)",
            filter: "blur(80px)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "linear-gradient(135deg, #10b981, #14b8a6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 32px rgba(16,185,129,0.35)",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.55)",
                textTransform: "uppercase",
              }}
            >
              {safeEyebrow}
            </span>
          </div>

          <h1
            style={{
              marginTop: 40,
              fontSize: safeTitle.length > 60 ? 52 : 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              maxWidth: 980,
            }}
          >
            {safeTitle}
          </h1>

          {safeDesc ? (
            <p
              style={{
                marginTop: 24,
                fontSize: 26,
                lineHeight: 1.45,
                color: "rgba(203, 213, 225, 0.92)",
                maxWidth: 900,
              }}
            >
              {safeDesc}
            </p>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          {safeBadge ? (
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#6ee7b7",
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(16,185,129,0.35)",
                background: "rgba(16,185,129,0.12)",
              }}
            >
              {safeBadge}
            </span>
          ) : (
            <span />
          )}
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg, #fff, #6ee7b7, #10b981)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            theupwardscale.com
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
