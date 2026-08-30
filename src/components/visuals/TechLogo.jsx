"use client";

import { useId } from "react";

/** Monochrome brand marks — currentColor for light/dark harmony */
function NextJsLogo() {
  const maskId = useId();
  return (
    <svg viewBox="0 0 180 180" fill="none" aria-hidden className="h-full w-full">
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="#fff" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <circle cx="90" cy="90" r="90" fill="currentColor" />
        <path
          d="M149.508 157.52 69.142 54.54v.001l-3.715 4.775-20.129 25.873h38.886L149.508 157.52Z"
          fill="var(--logo-bg, #fff)"
        />
        <path
          d="m115.012 157.52 34.496-44.301-17.248-22.15-17.248 22.15-34.496 44.301h34.496Z"
          fill="var(--logo-bg, #fff)"
        />
      </g>
    </svg>
  );
}

const LOGOS = {
  nextjs: <NextJsLogo />,
  react: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-full w-full">
      <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="#61DAFB"
        strokeWidth="1.2"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="#61DAFB"
        strokeWidth="1.2"
        transform="rotate(120 12 12)"
      />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path
        fill="#fff"
        d="M13.5 15.5v2.1c.8.4 1.7.6 2.7.6 1.2 0 2.1-.3 2.7-.9.6-.6.9-1.4.9-2.4 0-.8-.2-1.5-.6-2.1-.4-.6-1.2-1.2-2.3-1.8l-.8-.5c-.7-.4-1.1-.8-1.3-1.1-.2-.3-.3-.7-.3-1.1 0-.5.2-.9.6-1.2.4-.3.9-.5 1.5-.5.6 0 1.2.1 1.7.4v-1.9c-.5-.2-1.2-.3-2-.3-1.1 0-2 .3-2.6.9-.6.6-1 1.4-1 2.3h2.1c0-.5.2-.9.5-1.2.3-.3.7-.5 1.2-.5s.9.1 1.2.4c.3.3.4.6.4 1 0 .4-.2.8-.5 1.1-.4.3-1 .7-1.9 1.1l-.7.4c-.9.5-1.5 1-1.9 1.5-.4.5-.6 1.1-.6 1.8 0 1 .4 1.8 1.1 2.4.7.6 1.7.9 2.9.9.7 0 1.4-.1 2.1-.4Z"
      />
      <path fill="#fff" d="M8.2 10.1H6V18h2.2v-7.9Z" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path
        fill="#38BDF8"
        d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6Zm-5 8c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 15.15 9.47 14 7 14Z"
      />
    </svg>
  ),
  framer: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path fill="currentColor" d="M4 4h16v7H4V4Zm0 7h7v9H4v-9Zm9 0h7v9h-7v-9Z" />
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path
        fill="#339933"
        d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.2 6.8 3.8L12 11.8 5.2 8 12 4.2ZM5 9.5l6.5 3.6v7.2L5 16.7V9.5Zm14 0v7.2l-6.5 3.6v-7.2L19 9.5Z"
      />
    </svg>
  ),
  postgres: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path
        fill="#336791"
        d="M12 2c-4 0-7 1.5-7 5.5 0 2 .8 3.5 2 4.5-1.2 1-2 2.5-2 4.5 0 4 3 5.5 7 5.5s7-1.5 7-5.5c0-2-.8-3.5-2-4.5 1.2-1 2-2.5 2-4.5C19 3.5 16 2 12 2Zm0 2c2.8 0 5 .8 5 3.5S14.8 11 12 11 7 10.2 7 7.5 9.2 4 12 4Zm0 9c2.8 0 5 .8 5 3.5v.5c0 2.7-2.2 3.5-5 3.5s-5-.8-5-3.5v-.5c0-2.7 2.2-3.5 5-3.5Z"
      />
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path fill="currentColor" d="M12 2 22 20H2L12 2Z" />
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path
        fill="#FF9900"
        d="M6.5 10.5c0-.3.1-.5.3-.6l8.5-5c.2-.1.4-.1.6 0l8.5 5c.2.1.3.3.3.6v8c0 .3-.1.5-.3.6l-8.5 5c-.2.1-.4.1-.6 0l-8.5-5c-.2-.1-.3-.3-.3-.6v-8Zm2 .8v6.4l6.5 3.8V15L8.5 11.3Zm9 0L12 15v3.7l6.5-3.8v-6.4Z"
      />
    </svg>
  ),
  openai: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path
        fill="currentColor"
        d="M12 2a6.5 6.5 0 0 0-5.2 10.4 7 7 0 0 0-.3 6.5 7 7 0 0 0 10.5-2.5A6.5 6.5 0 0 0 12 2Zm0 2a4.5 4.5 0 0 1 4.2 6 7 7 0 0 0-5.8 3.2A4.5 4.5 0 0 1 12 4Zm-2.5 8.2a4.5 4.5 0 0 1 5.8 1.8 5 5 0 0 1-5.8-1.8Z"
      />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path
        fill="#2496ED"
        d="M4 10h2v2H4v-2Zm3 0h2v2H7v-2Zm3 0h2v2h-2v-2Zm3 0h2v2h-2v-2Zm-9 3h2v2H4v-2Zm3 0h2v2H7v-2Zm3 0h2v2h-2v-2Zm3 0h2v2h-2v-2Zm3-3h2v2h-2v-2Zm0 3h2v2h-2v-2ZM4 16h2v2H4v-2Zm3 0h2v2H7v-2Zm3 0h2v2h-2v-2Zm9-9h-2c-.5 0-1 .2-1.4.6L10 12.6c-.8.8-.8 2 0 2.8.8.8 2 .8 2.8 0l5.6-5.6c.4-.4.6-.9.6-1.4V7Z"
      />
    </svg>
  ),
  "github-actions": (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path
        fill="currentColor"
        d="M12 2C6.5 2 2 6.5 2 12a9.9 9.9 0 0 0 6.8 9.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1 .6-1.3-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 22 12c0-5.5-4.5-10-10-10Z"
      />
    </svg>
  ),
  sentry: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path fill="#362D59" d="M12 2 2 7l10 14L22 7 12 2Zm0 3.5 6.5 3.5L12 18 5.5 9 12 5.5Z" />
    </svg>
  ),
  lighthouse: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <circle cx="12" cy="12" r="9" stroke="#F97316" strokeWidth="2" fill="none" />
      <path
        fill="none"
        stroke="#F97316"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M12 7v5l3 2"
      />
    </svg>
  ),
  cwv: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path fill="#10B981" d="M4 18h16v2H4v-2Zm2-4h3v4H6v-4Zm4-3h3v7h-3v-7Zm4-5h3v12h-3V6Z" />
    </svg>
  ),
  isr: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path
        fill="currentColor"
        d="M5 4h14v4H5V4Zm0 6h14v10H5V10Zm2 2v6h10v-6H7Zm2 2h2v2H9v-2Zm4 0h2v2h-2v-2Z"
      />
    </svg>
  ),
  cdn: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <circle cx="12" cy="12" r="3" fill="#14B8A6" />
      <circle cx="5" cy="7" r="2" fill="#14B8A6" opacity="0.7" />
      <circle cx="19" cy="7" r="2" fill="#14B8A6" opacity="0.7" />
      <circle cx="5" cy="17" r="2" fill="#14B8A6" opacity="0.7" />
      <circle cx="19" cy="17" r="2" fill="#14B8A6" opacity="0.7" />
      <path stroke="#14B8A6" strokeWidth="1" d="M12 9 5 7M12 9l7-2M12 15l-7 2M12 15l7-2" />
    </svg>
  ),
};

export default function TechLogo({ id, className = "" }) {
  const logo = LOGOS[id];

  if (!logo) {
    return (
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100 font-mono text-xs font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 ${className}`}
      >
        {id.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-white p-1.5 dark:border-slate-700 dark:bg-slate-900 ${className}`}
      style={{ "--logo-bg": "var(--color-surface, #fff)" }}
    >
      {logo}
    </span>
  );
}
