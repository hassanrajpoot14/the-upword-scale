import { CONTACT_INFO } from "../src/data/contactInfo";
import { SERVICES_DATA } from "../src/data/serviceData";
import { CASE_STUDIES } from "../src/data/caseStudiesData";
import { BLOG_POSTS } from "../src/data/blogData";

const baseUrl = CONTACT_INFO.siteUrl.replace(/\/$/, "");

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/case-studies",
    "/blogs",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = Object.values(SERVICES_DATA).map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyRoutes = CASE_STUDIES.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes];
}
