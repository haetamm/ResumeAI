"use client";

import React from "react";
import { Button } from "../../ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ThemeColor from "@/components/layout/ThemeColor";
import { useFormContext } from "@/lib/context/FormProvider";
import CertificateForm from "./forms/CertificateForm";
import PortofolioForm from "./forms/PortofolioForm";
import SocmedForm from "./forms/SocmedForm";

const ResumeEditForm = ({
  params,
  userId,
}: {
  params: { id: string };
  userId: string | undefined;
}) => {
  if (!userId) {
    return null;
  }

  const router = useRouter();
  const { activeFormIndex, setActiveFormIndex } = useFormContext();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <ThemeColor params={params} />
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              className="flex gap-2 bg-primary-700 hover:bg-primary-800 text-white"
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft /> Prev
            </Button>
          )}
          <Button
            className="flex gap-2 bg-primary-700 hover:bg-primary-800 text-white"
            size="sm"
            disabled={isLoading}
            onClick={async () => {
              if (activeFormIndex !== 8) {
                setActiveFormIndex(activeFormIndex + 1);
              } else {
                setIsLoading(true);
                router.push("/my-resume/" + params.id + "/view");
              }
            }}
          >
            {activeFormIndex === 8 ? (
              <>
                {isLoading ? (
                  <>
                    Finishing <Loader2 className="size-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Finish <CheckCircle2 className="size-5" />
                  </>
                )}
              </>
            ) : (
              <>
                Next <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </div>
      {activeFormIndex === 1 ? (
        <PersonalDetailsForm params={params} />
      ) : activeFormIndex === 2 ? (
        <SummaryForm params={params} />
      ) : activeFormIndex === 3 ? (
        <ExperienceForm params={params} />
      ) : activeFormIndex === 4 ? (
        <EducationForm params={params} />
      ) : activeFormIndex === 5 ? (
        <CertificateForm params={params} />
      ) : activeFormIndex === 6 ? (
        <PortofolioForm params={params} />
      ) : activeFormIndex === 7 ? (
        <SkillsForm params={params} />
      ) : activeFormIndex === 8 ? (
        <SocmedForm params={params} />
      ) : activeFormIndex === 9 ? (
        redirect("/my-resume/" + params.id + "/view")
      ) : null}
    </div>
  );
};

export default ResumeEditForm;
