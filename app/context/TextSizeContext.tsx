"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type TextSize = "text-sm" | "text-base" | "text-lg" | "text-xl";

interface TextSizeContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

export function TextSizeProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSize] = useState<TextSize>("text-base");

  // Optional: Load saved size from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("textSize") as TextSize | null;
    if (saved) setTextSize(saved);
  }, []);

  // Optional: Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("textSize", textSize);
  }, [textSize]);

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  const context = useContext(TextSizeContext);
  if (!context) {
    throw new Error("useTextSize must be used within a TextSizeProvider");
  }
  return context;
}
