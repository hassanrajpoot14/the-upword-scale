import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { BLOG_POSTS } from "../../data/blogData";
import { CASE_STUDIES } from "../../data/caseStudiesData";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readMdxDir(subdir) {
  const dir = path.join(CONTENT_ROOT, subdir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const slug = data.slug || file.replace(/\.mdx?$/, "");
      return {
        ...data,
        slug,
        content: content?.trim() || data.content || "",
      };
    })
    .sort((a, b) => {
      const da = Date.parse(a.date || "") || 0;
      const db = Date.parse(b.date || "") || 0;
      return db - da;
    });
}

/** Prefer live MDX on the server; fall back to generated JSON snapshots. */
export function getAllBlogPosts() {
  const fromDisk = readMdxDir("blogs");
  return fromDisk.length ? fromDisk : BLOG_POSTS;
}

export function getBlogPostBySlug(slug) {
  return getAllBlogPosts().find((post) => post.slug === slug) || null;
}

export function getAllCaseStudies() {
  const fromDisk = readMdxDir("case-studies");
  if (!fromDisk.length) return CASE_STUDIES;
  return fromDisk.map(({ content, ...rest }) => rest);
}

export function getCaseStudyBySlug(slug) {
  return getAllCaseStudies().find((study) => study.slug === slug) || null;
}

export {
  BLOG_CATEGORIES,
  CASE_STUDY_CATEGORIES,
  CASE_STUDY_STACK_FILTERS,
} from "./constants";
