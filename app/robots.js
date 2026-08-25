import { CONTACT_INFO } from "../src/data/contactInfo";

const baseUrl = CONTACT_INFO.siteUrl.replace(/\/$/, "");

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
