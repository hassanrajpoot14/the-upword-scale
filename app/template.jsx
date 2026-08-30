"use client";

/**
 * App Router template remounts on navigation.
 * Keep this a stable passthrough to avoid hydration / scroll-reveal issues.
 */
export default function Template({ children }) {
  return children;
}
