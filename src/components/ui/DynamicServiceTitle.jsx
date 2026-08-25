"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  const measureRef = useRef(null);

  const index = loopNum % titles.length;
  const fullTxt = titles[index];

  useEffect(() => {
    let timer;

    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        const nextText = fullTxt.substring(0, currentWord.length + 1);
        setCurrentWord(nextText);

        if (nextText === fullTxt) {
          // Pause at the complete word
          setIsDeleting(true);
          setTypingSpeed(2200); // Keep word visible for 2.2s
        } else {
          // Dynamic speed to feel natural/candid
          setTypingSpeed(80 + Math.random() * 60);
        }
      } else {
        // Deleting characters
        const nextText = fullTxt.substring(0, currentWord.length - 1);
        setCurrentWord(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(400); // Brief pause before starting next word
        } else {
          setTypingSpeed(45); // Deleting is faster and snappier
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, loopNum, fullTxt, typingSpeed]);

  return (
    <span
      className={`relative inline-flex flex-col items-center justify-center overflow-hidden align-bottom ${className}`}
      style={{ verticalAlign: "bottom" }}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Hidden sizer — renders every title simultaneously (opacity-0) */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none flex flex-col opacity-0 select-none"
        style={{ position: "absolute", whiteSpace: "nowrap" }}
      >
        {titles.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </span>

      {/* Invisible spacer */}
      <span aria-hidden className="invisible whitespace-nowrap select-none">
        {titles[0]}
      </span>

      {/* The animated typewriter word */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ whiteSpace: "nowrap" }}
      >
        <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
          {currentWord}
        </span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
          className="inline-block w-[3px] h-[1.1em] bg-emerald-500 ml-1 rounded-sm align-middle"
          style={{ willChange: "opacity" }}
        />
      </span>
    </span>
  );
}
