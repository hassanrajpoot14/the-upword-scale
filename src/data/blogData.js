/**
 * Blog catalog — loaded from MDX snapshots.
 * Edit files in content/blogs/*.mdx then run: npm run content:sync
 */
import posts from "./generated/blogs.json";

export const BLOG_CATEGORIES = [
  "All",
  "Architecture",
  "Next.js",
  "DevOps & CI/CD",
  "Performance",
];

export const BLOG_POSTS = posts;
