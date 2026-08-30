"use client";

import { motion } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import { useBookingDrawer } from "./BookingDrawerRoot";

/**
 * Opens the in-app Cal.com booking drawer instead of navigating away.
 */
export default function BookCallButton({
  className = "",
  children,
  magnetic = false,
  magneticStrength,
  onClick,
  ...rest
}) {
  const { openBooking } = useBookingDrawer();

  const handleClick = (event) => {
    openBooking();
    onClick?.(event);
  };

  const button = (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );

  if (!magnetic) return button;

  return (
    <Magnetic
      {...(magneticStrength != null ? { strength: magneticStrength } : {})}
    >
      {button}
    </Magnetic>
  );
}
