"use client";

import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((state) => state.theme.mode);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode, mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
