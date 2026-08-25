/**
 * Shared contact details for The Upward Scale.
 * Override phone / address / site URL via NEXT_PUBLIC_* env vars (see .env.example).
 */
export const CONTACT_INFO = {
  email: "growth@theupwardscale.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+1 (415) 555-0199",
  phoneHref: process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF || "tel:+14155550199",
  addressLine1: process.env.NEXT_PUBLIC_CONTACT_ADDRESS_LINE1 || "100 Pine St, Suite 2400",
  addressLine2: process.env.NEXT_PUBLIC_CONTACT_ADDRESS_LINE2 || "San Francisco, CA 94111",
  hours: "Mon - Fri, 9:00 AM - 6:00 PM PST",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://theupwardscale.com",
};
