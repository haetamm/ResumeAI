"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clearIndexedDB } from "@/lib/indexedDB";
import Cookies from "js-cookie";
import { token as tokenEnv } from "@/lib/utils";

const SignOutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const isValidToken = token === tokenEnv;

  useEffect(() => {
    if (!isValidToken) {
      router.push("/");
      return;
    }

    const handleLogout = async () => {
      try {
        Cookies.remove("token");
        await clearIndexedDB();
        router.push("/");
      } catch (error) {
        console.error("Error saat logout:", error);
        router.push("/sign-in");
      }
    };

    handleLogout();
  }, [isValidToken]);

  return (
    <div className="flex h-screen items-center justify-center flex-col p-10">
      <div className="text-center"></div>
    </div>
  );
};

export default SignOutPage;
