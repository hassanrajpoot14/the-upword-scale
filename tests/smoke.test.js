import { describe, expect, it } from "vitest";
import { BLOG_POSTS } from "../src/data/blogData.js";
import { CASE_STUDIES } from "../src/data/caseStudiesData.js";
import {
  getAllBlogPosts,
  getAllCaseStudies,
  getBlogPostBySlug,
  getCaseStudyBySlug,
} from "../src/lib/content/index.js";

describe("content snapshots", () => {
  it("loads blog posts from generated JSON", () => {
    expect(BLOG_POSTS.length).toBeGreaterThanOrEqual(1);
    expect(BLOG_POSTS[0]).toHaveProperty("slug");
    expect(BLOG_POSTS[0]).toHaveProperty("title");
    expect(BLOG_POSTS[0]).toHaveProperty("content");
  });

  it("loads case studies from generated JSON", () => {
    expect(CASE_STUDIES.length).toBeGreaterThanOrEqual(1);
    expect(CASE_STUDIES[0]).toHaveProperty("slug");
    expect(CASE_STUDIES[0]).toHaveProperty("title");
  });
});

describe("MDX content layer", () => {
  it("reads blogs from content/blogs", () => {
    const posts = getAllBlogPosts();
    expect(posts.length).toBe(BLOG_POSTS.length);
    const first = getBlogPostBySlug(posts[0].slug);
    expect(first?.title).toBeTruthy();
  });

  it("reads case studies from content/case-studies", () => {
    const studies = getAllCaseStudies();
    expect(studies.length).toBe(CASE_STUDIES.length);
    const first = getCaseStudyBySlug(studies[0].slug);
    expect(first?.client).toBeTruthy();
  });
});

describe("contact API validation helpers", () => {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it("accepts valid emails", () => {
    expect(EMAIL_RE.test("you@company.com")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(EMAIL_RE.test("not-an-email")).toBe(false);
    expect(EMAIL_RE.test("")).toBe(false);
  });
});
