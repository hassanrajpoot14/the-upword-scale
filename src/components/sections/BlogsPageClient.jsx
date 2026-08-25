"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_POSTS } from "../../data/blogData";

const CATEGORIES = ["All", "Tech", "Growth", "Strategy"];

export default function BlogsPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter posts based on query and selected category
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Decorative tech grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Ambient background glow orbs */}
      <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-100/30 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-teal-50/40 blur-[100px]" />

      <main className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Expert Insights
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            The Upward{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Scale Journal
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Engineering strategies, performance guidelines, and growth blueprints engineered to compound your brand authority.
          </p>
        </div>

        {/* Search & Filter Hub */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-b border-slate-200/60 pb-8 md:flex-row">
          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-900 shadow-sm transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category filter buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 select-none ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md shadow-slate-950/10"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="mt-12">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredPosts.map((post) => (
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    key={post.slug}
                    className="group relative flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5"
                  >
                    {/* Header elements */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                        {post.category}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {post.readTime}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1">
                      <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-emerald-600">
                        <Link href={`/blogs/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer / Author section */}
                    <div className="mt-8 border-t border-slate-100 pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">{post.author.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{post.author.role}</p>
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {post.date}
                      </span>
                    </div>

                    {/* Learn More link hover overlay */}
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="absolute inset-0 z-10 rounded-3xl"
                    />
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-20 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.3-4.3" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">No articles found</h3>
                <p className="mt-2 text-sm text-slate-500">
                  We couldn&apos;t find any articles matching your search query or filters.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
