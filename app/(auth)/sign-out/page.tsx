"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearIndexedDB } from "@/lib/indexedDB";
import Cookies from "js-cookie";
import { useUser } from "@clerk/nextjs";

const SignOutPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (isSignedIn) {
          await clearIndexedDB();
          router.push("/");
          Cookies.remove("token");
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error saat logout:", error);
        router.push("/sign-in");
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center flex-col p-10">
      <div className="text-center">
        {!isSignedIn && isLoaded && <h2>Logging out...</h2>}
      </div>
    </div>
  );
};

export default SignOutPage;
