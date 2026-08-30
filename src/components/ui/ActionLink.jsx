"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Magnetic from "./Magnetic";

function ActionLinkFeedback({ children, loadingLabel, localPending }) {
  const { pending } = useLinkStatus();
  const loading = pending || localPending;

  return (
    <motion.span
      className={`inline-flex items-center justify-center gap-2 ${loading ? "cursor-wait" : ""}`}
      whileTap={loading ? undefined : { scale: 0.97 }}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
          <span>{loadingLabel ?? children}</span>
        </>
      ) : (
        children
      )}
    </motion.span>
  );
}

/**
 * Primary CTA link with tap feedback, pending guard, and optional spinner.
 */
export default function ActionLink({
  href,
  className = "",
  children,
  magnetic = false,
  magneticStrength,
  loadingLabel,
  onClick,
  ...rest
}) {
  const pathname = usePathname();
  const [localPending, setLocalPending] = useState(false);

  useEffect(() => {
    setLocalPending(false);
  }, [pathname]);

  const isHashOnly = typeof href === "string" && href.startsWith("#");
  const hrefPath =
    typeof href === "string"
      ? href.startsWith("#")
        ? pathname
        : href.split("#")[0]
      : href;
  const isSameRoute = hrefPath === pathname;

  const link = (
    <Link
      href={href}
      className={`${className}${localPending && !isHashOnly && !isSameRoute ? " pointer-events-none" : ""}`}
      aria-busy={localPending && !isHashOnly && !isSameRoute ? true : undefined}
      onClick={(event) => {
        onClick?.(event);
        if (!isHashOnly && !isSameRoute) setLocalPending(true);
      }}
      {...rest}
    >
      <ActionLinkFeedback
        loadingLabel={loadingLabel}
        localPending={localPending && !isHashOnly && !isSameRoute}
      >
        {children}
      </ActionLinkFeedback>
    </Link>
  );

  if (magnetic) {
    return (
      <Magnetic {...(magneticStrength != null ? { strength: magneticStrength } : {})}>
        {link}
      </Magnetic>
    );
  }
  return link;
}
