"use client";

import React, { useEffect, useState } from "react";
import PageWrapper from "@/components/common/PageWrapper";
import Header from "@/components/layout/Header";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ResumeEditor from "@/components/layout/my-resume/ResumeEditor";
import { getFromDB } from "@/lib/indexedDB";
import { checkResumeOwnership } from "@/lib/actions/resume.actions";

const EditResume = ({ params }: { params: { id: string } }) => {
  const { user } = useUser();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [isResumeOwner, setIsResumeOwner] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isOffline = typeof window !== "undefined" && !navigator.onLine;

  useEffect(() => {
    const fetchUserIdAndCheckOwnership = async () => {
      setIsLoading(true);

      let id = user?.id || (await getFromDB("userId"));

      if (!id) {
        router.replace("/dashboard");
        return;
      }

      setUserId(id);

      if (user?.id) {
        try {
          const isOwner = await checkResumeOwnership(id, params.id);

          if (!isOwner) {
            router.replace("/dashboard");
            return;
          }

          setIsResumeOwner(true);
        } catch (error) {
          console.error("Error checking ownership:", error);
        }
      }

      if (isOffline) {
        try {
          const resumesData = await getFromDB("resumes");
          const resumes = Array.isArray(resumesData)
            ? resumesData
            : JSON.parse(resumesData || "[]");

          const resume = resumes.find(
            (r: any) => r.resumeId === params.id && r.userId === id
          );

          if (resume) {
            setIsResumeOwner(true);
          } else {
            router.replace("/dashboard");
            return;
          }
        } catch (error) {
          console.error("Error checking offline ownership:", error);
          router.replace("/dashboard");
          return;
        }
      }

      setIsLoading(false);
    };

    fetchUserIdAndCheckOwnership();
  }, [user?.id, params.id, router]);

  return (
    <PageWrapper>
      <Header />
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <h2 className="text-center text-2xl font-bold">Edit Your Resume</h2>
        <p className="text-center text-gray-600">
          Please provide the necessary information for your resume.
        </p>
      </div>
      {isLoading ? (
        <div className="px-10 pt-10 pb-2 max-sm:px-6 max-sm:pt-6 max-sm:pb-0 lg:h-[calc(100vh-50px)] overflow-hidden !bg-slate-200/30">
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      ) : userId && isResumeOwner ? (
        <ResumeEditor params={params} userId={userId} />
      ) : (
        <div className="px-10 pt-10 pb-2 max-sm:px-6 max-sm:pt-6 max-sm:pb-0 lg:h-[calc(100vh-50px)] overflow-hidden !bg-slate-200/30">
          <p className="text-center text-gray-500">
            {isLoading
              ? "Loading..."
              : "Unable to load resume editor. Please try again."}
          </p>
        </div>
      )}
    </PageWrapper>
  );
};

export default EditResume;
