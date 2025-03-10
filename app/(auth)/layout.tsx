"use client";

import PageWrapper from "@/components/common/PageWrapper";
import React, { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registered", reg))
        .catch((err) => console.error("Service Worker failed", err));
    }
  }, []);
  return (
    <main>
      <PageWrapper>{children}</PageWrapper>
    </main>
  );
}
