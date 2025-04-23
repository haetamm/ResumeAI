"use client";

import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/lib/context/FormProvider";
import { RWebShare } from "react-web-share";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import PageWrapper from "@/components/common/PageWrapper";
import { DownloadIcon, Share2Icon } from "lucide-react";
import ThResumePreview from "./my-resume/ThResumePreview";
import { useHandleError } from "@/lib/hooks/useHandleError";
import { downloadWordDocument } from "@/lib/actions/download.action";

interface FinalResumeViewProps {
  isOwnerView: boolean;
}

const FinalResumeView: React.FC<FinalResumeViewProps> = ({ isOwnerView }) => {
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  const { formData } = useFormContext();
  const { handleError } = useHandleError();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const qrCodeUrl = `${baseUrl}${path}`; 
  
  const handleDownloadWord = async () => {
    setLoading(true);
    try {
      await downloadWordDocument(formData, qrCodeUrl, handleError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageWrapper>
        <div id="no-print">
          <Header />
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            {isOwnerView ? (
              <>
                <h2 className="text-center text-2xl font-bold">
                  Congrats! Your ultimate AI-generated resume is ready!
                </h2>
                <p className="text-center text-gray-600">
                  You can now download your resume or share its unique URL with
                  your friends and family.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-center text-2xl font-bold">
                  Resume Preview
                </h2>
                <p className="text-center text-gray-600">
                  You are currently viewing a preview of someone else's resume.
                </p>
              </>
            )}
            <div className="flex max-sm:flex-col justify-center gap-8 my-10">
              <Button
                onClick={handleDownloadWord} 
                className="flex px-12 py-6 gap-2 rounded-full bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-700/30 text-white"
              >
                <DownloadIcon className="size-6" /> {loading ? 'Downloading' : 'Download'}
              </Button>
              <RWebShare
                data={{
                  text: "Check out my resume!",
                  url: `${path}`,
                  title: `${formData?.firstName ?? "User"} ${
                    formData?.lastName ?? "Resume"
                  }'s Resume`,
                }}
                onClick={() => console.log("Shared successfully!")}
              >
                <Button className="flex px-12 py-6 gap-2 rounded-full bg-slate-200 hover:bg-primary-700/20 focus:ring-4 focus:ring-primary-700/30 text-black">
                  <Share2Icon className="size-6" /> Share URL
                </Button>
              </RWebShare>
            </div>
          </div>
        </div>
        <div className="px-2 md:px-10 pt-4 pb-16 max-sm:pb-8 print:p-0 max-w-[210mm] mx-auto overflow-auto">
          <ThResumePreview />
        </div>
      </PageWrapper>
    </>
  );
};

export default FinalResumeView;
