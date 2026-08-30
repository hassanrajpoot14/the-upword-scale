"use client";

import { useState, useEffect } from "react";

// ─── Default service titles ───────────────────────────────────────────────────
const DEFAULT_TITLES = [
  "Web Architecture",
  "AI Optimization",
  "SEO Strategy",
  "Brand Identity",
  "App Engineering",
  "Growth Systems",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DynamicServiceTitle({
  titles = DEFAULT_TITLES,
  className = "",
}) {
  const [mounted, setMounted] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  const index = loopNum % titles.length;
  const fullTxt = titles[index];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;

    const handleType = () => {
      if (!isDeleting) {
        const nextText = fullTxt.substring(0, currentWord.length + 1);
        setCurrentWord(nextText);

        if (nextText === fullTxt) {
          setIsDeleting(true);
          setTypingSpeed(2200);
        } else {
          setTypingSpeed(90);
        }
      } else {
        const nextText = fullTxt.substring(0, currentWord.length - 1);
        setCurrentWord(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setLoopNum((n) => n + 1);
          setTypingSpeed(400);
        } else {
          setTypingSpeed(45);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [mounted, currentWord, isDeleting, loopNum, fullTxt, typingSpeed]);

  const longestTitle = titles.reduce(
    (a, b) => (a.length >= b.length ? a : b),
    titles[0] ?? ""
  );

  return (
    <span
      className={`relative inline-block max-w-full align-bottom ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Reserve width for longest title so layout doesn't shift */}
      <span aria-hidden className="invisible whitespace-nowrap select-none">
        {longestTitle}
      </span>

      <span
        className="absolute left-0 top-0 whitespace-nowrap"
        aria-hidden={false}
      >
        <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
          {currentWord}
        </span>
        <span
          aria-hidden
          className="ml-1 inline-block h-[1.1em] w-[3px] animate-pulse rounded-sm bg-emerald-500 align-middle"
        />
      </span>
    </span>
  );
}
