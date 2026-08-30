"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Browser or mobile chrome wrapping a live preview, with parallax tilt on hover.
 */
export default function DeviceFrame({
  children,
  variant = "browser",
  url = "app.theupwardscale.com",
  className = "",
}) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springX = useSpring(mx, { stiffness: 180, damping: 18 });
  const springY = useSpring(my, { stiffness: 180, damping: 18 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  if (variant === "mobile") {
    return (
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 900,
          transformStyle: "preserve-3d",
        }}
        className={`relative mx-auto w-[58%] max-w-[160px] min-w-0 ${className}`}
      >
        <div className="overflow-hidden rounded-[1.35rem] border-[3px] border-slate-800 bg-slate-900 shadow-xl shadow-slate-900/20">
          <div className="flex justify-center bg-slate-900 py-1.5">
            <span className="h-1 w-10 rounded-full bg-slate-700" />
          </div>
          <div className="aspect-[9/16] w-full overflow-hidden bg-slate-950">
            <div className="h-full w-full min-w-0 [&>*]:h-full [&>*]:w-full [&_img]:h-auto [&_img]:w-full [&_img]:object-cover">
              {children}
            </div>
          </div>
          <div className="flex justify-center bg-slate-900 py-2">
            <span className="h-1 w-8 rounded-full bg-slate-700" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full ${className}`}
    >
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <div className="ml-2 flex min-w-0 flex-1 items-center rounded-md border border-slate-200 bg-white px-2 py-1">
            <span className="truncate font-mono text-[9px] text-slate-400 sm:text-[10px]">
              {url}
            </span>
          </div>
        </div>
        <div className="aspect-[16/10] w-full overflow-hidden bg-slate-950">
          <div className="h-full w-full min-w-0 [&>*]:h-full [&>*]:w-full [&_img]:h-auto [&_img]:w-full [&_img]:object-cover">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
