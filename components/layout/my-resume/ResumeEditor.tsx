"use client";

import { FormProvider } from "@/lib/context/FormProvider";
import React from "react";
import ResumeEditForm from "./ResumeEditForm";
import MhResumePreview from "./MhResumePreview";
import ThResumePreview from "./ThResumePreview";

const ResumeEditor = ({
  params,
  userId,
}: {
  params: { id: string };
  userId: string | undefined;
}) => {
  if (!userId) {
    return null;
  }

  return (
    <FormProvider params={params}>
      <div className="px-3 md:px-10 lg:px-3 xl:px-10 pt-10 pb-2 max-sm:pt-6 max-sm:pb-0 lg:h-[calc(100vh-50px)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 space-y-10 lg:gap-5 xl:gap-10 md:max-w-[680px] lg:max-w-[1024px] xl:max-w-[1500px] mx-auto justify-center items-start h-[calc(100%-5px)] max-sm:h-[calc(100%-2rem)] overflow-hidden">
          <div className="h-full overflow-y-auto no-scrollbar p-1">
            <ResumeEditForm params={params} userId={userId} />
          </div>
          <div className="h-full overflow-y-auto no-scrollbar overflow-x-auto  p-1 ">
            <ThResumePreview />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default ResumeEditor;
