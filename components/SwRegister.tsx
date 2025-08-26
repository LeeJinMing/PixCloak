"use client";
import { useEffect } from "react";

export function SwRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => { });
    }
  }, []);
  return null;
}


