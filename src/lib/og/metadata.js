import { CONTACT_INFO } from "../../data/contactInfo";

/**
 * Consistent Open Graph + Twitter metadata for App Router pages.
 * Pair with colocated `opengraph-image.jsx` / `twitter-image.jsx` routes.
 */
export function buildPageMetadata({
  title,
  description,
  path = "",
  type = "website",
  publishedTime,
  authors,
}) {
  const url = new URL(path.replace(/^\//, ""), CONTACT_INFO.siteUrl).href;

  const openGraph = {
    title,
    description,
    type,
    url,
  };

  if (publishedTime) openGraph.publishedTime = publishedTime;
  if (authors?.length) openGraph.authors = authors;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
