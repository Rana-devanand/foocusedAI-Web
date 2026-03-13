"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme, setTheme } from "@/store/slices/themeSlice";
import { useEffect } from "react";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  const setMode = (newMode: "light" | "dark") => {
    dispatch(setTheme(newMode));
  };

  return { mode, toggle, setMode };
};
