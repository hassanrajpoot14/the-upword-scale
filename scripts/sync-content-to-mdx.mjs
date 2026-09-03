/**
 * Reads MDX from /content and writes JSON snapshots for Edge/client imports.
 * MDX under content/ is the editable source of truth.
 *
 * Run: node scripts/sync-content-to-mdx.mjs
 * (also regenerates src/data/generated/*.json from content/)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function readMdxDir(subdir) {
  const dir = path.join(root, "content", subdir);
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
        content: (content || "").trim(),
      };
    })
    .sort((a, b) => {
      const da = Date.parse(a.date || "") || 0;
      const db = Date.parse(b.date || "") || 0;
      return db - da;
    });
}

function main() {
  const generatedDir = path.join(root, "src/data/generated");
  fs.mkdirSync(generatedDir, { recursive: true });

  const blogPosts = readMdxDir("blogs");
  const studies = readMdxDir("case-studies").map(({ content, ...rest }) => rest);

  if (!blogPosts.length || !studies.length) {
    console.error(
      "No MDX found under content/. Seed files first (see README).",
    );
    process.exit(1);
  }

  fs.writeFileSync(
    path.join(generatedDir, "blogs.json"),
    JSON.stringify(blogPosts, null, 2),
    "utf8",
  );
  fs.writeFileSync(
    path.join(generatedDir, "case-studies.json"),
    JSON.stringify(studies, null, 2),
    "utf8",
  );

  console.log(
    `Generated snapshots: ${blogPosts.length} blogs, ${studies.length} case studies`,
  );
}

main();
