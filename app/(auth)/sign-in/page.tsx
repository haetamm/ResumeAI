"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  const isOffline = typeof window !== "undefined" && !navigator.onLine;

  return (
    <div className="flex h-screen items-center justify-center flex-col p-10">
      {isOffline ? (
        <div className="text-center">
          <h2>You are offline</h2>
          <p>Please connect to the internet to sign in.</p>
        </div>
      ) : (
        <SignIn forceRedirectUrl={"/dashboard"} routing="hash" />
      )}
    </div>
  );
};

export default Page;
