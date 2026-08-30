/**
 * Shared contact details for The Upward Scale.
 * Override phone / studio tagline / site URL via NEXT_PUBLIC_* env vars (see .env.example).
 */
export const CONTACT_INFO = {
  email: "growth@theupwardscale.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  phoneHref: process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF || "",
  studioTagline:
    process.env.NEXT_PUBLIC_STUDIO_TAGLINE ||
    "Remote-First Engineering & Architecture Studio | Serving Clients Globally",
  timezoneLabel: "PKT / UTC+5",
  availability: "Available for New Projects",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://theupwardscale.com",
  /** Cal.com event slug — set NEXT_PUBLIC_CAL_LINK in .env (e.g. username/30min) */
  calLink:
    process.env.NEXT_PUBLIC_CAL_LINK ||
    process.env.NEXT_PUBLIC_CALCOM_LINK ||
    "",
};

/** True when a real Cal.com slug is configured in env */
export function isCalBookingEnabled() {
  const link = CONTACT_INFO.calLink.trim();
  if (!link) return false;
  const placeholders = [
    "your-real-cal-username",
    "the-upward-scale/discovery",
  ];
  return !placeholders.some((p) => link.includes(p));
}
