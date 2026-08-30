"use client";

import { createContext, useCallback, useContext, useState } from "react";
import BookingDrawer from "./BookingDrawer.jsx";

const BookingDrawerContext = createContext({
  open: false,
  setOpen: () => {},
  openBooking: () => {},
  closeBooking: () => {},
});

export function useBookingDrawer() {
  return useContext(BookingDrawerContext);
}

export default function BookingDrawerRoot({ children }) {
  const [open, setOpen] = useState(false);

  const openBooking = useCallback(() => setOpen(true), []);
  const closeBooking = useCallback(() => setOpen(false), []);
  const setOpenStable = useCallback((value) => {
    setOpen(typeof value === "function" ? value : Boolean(value));
  }, []);

  return (
    <BookingDrawerContext.Provider
      value={{ open, setOpen: setOpenStable, openBooking, closeBooking }}
    >
      {children}
      <BookingDrawer open={open} onOpenChange={setOpenStable} />
    </BookingDrawerContext.Provider>
  );
}
