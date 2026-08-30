"use client";

import { useEffect, useState } from "react";
import Preloader from "./Preloader";

/**
 * Mount Preloader only after hydration so Framer Motion never
 * schedules animation state updates during SSR / pre-mount render.
 */
export default function PreloaderWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Preloader />;
}
