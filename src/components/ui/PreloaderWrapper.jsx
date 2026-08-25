"use client";

import Preloader from "./Preloader";

/**
 * Thin client wrapper that renders the Preloader.
 * Keeps the root layout a Server Component.
 */
export default function PreloaderWrapper() {
  return <Preloader />;
}
