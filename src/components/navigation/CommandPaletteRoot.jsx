"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import CommandPalette from "./CommandPalette";

const CommandPaletteContext = createContext({
  open: false,
  setOpen: () => {},
});

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}

export default function CommandPaletteRoot({ children }) {
  const [open, setOpen] = useState(false);

  const setOpenStable = useCallback((value) => {
    setOpen(value);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      const isPaletteShortcut =
        (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (!isPaletteShortcut) return;

      e.preventDefault();
      setOpen((prev) => !prev);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen: setOpenStable }}>
      {children}
      <CommandPalette open={open} onOpenChange={setOpenStable} />
    </CommandPaletteContext.Provider>
  );
}
