"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

export default function OnlineStatusProvider() {
  useEffect(() => {
    const updateStatus = () => {
      const isOffline = !navigator.onLine;
      Cookies.set("is-offline", isOffline ? "true" : "false", { path: "/" });
    };

    updateStatus();

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return null;
}
