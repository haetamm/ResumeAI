"use client";

import React from "react";
import { useFormContext } from "@/lib/context/FormProvider";
import PersonalDetailsPreview from "./previews/mh/PersonalDetailsPreview";
import SkillsPreview from "./previews/mh/SkillsPreview";
import SummaryPreview from "./previews/mh/SummaryPreview";
import ExperiencePreview from "./previews/mh/ExperiencePreview";
import EducationalPreview from "./previews/mh/EducationalPreview";
import { themeColors } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MhResumePreview = () => {
  const { formData, setActiveFormIndex, loading } = useFormContext();
  const pathname = usePathname();

  const isEditMode = pathname.endsWith("/edit");
  const interactiveClass = isEditMode
    ? "cursor-pointer hover:bg-gray-100 px-2 py-[1px] rounded"
    : "";

  const sections = [
    {
      index: 1,
      component: <PersonalDetailsPreview />,
      condition: true,
    },
    {
      index: 2,
      component: <SummaryPreview />,
      condition: true,
    },
    {
      index: 3,
      component: <ExperiencePreview />,
      condition: formData?.experience?.length > 0,
    },
    {
      index: 4,
      component: <EducationalPreview />,
      condition: formData?.education?.length > 0,
    },
    {
      index: 5,
      component: <SkillsPreview />,
      condition: formData?.skills?.length > 0,
    },
  ];

  if (Object.keys(formData || {}).length === 0 || loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-[210mm] min-h-[297mm] rounded-sm shadow-lg skeleton" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`p-12 shadow-lg border-t-[20px] bg-white w-[210mm] min-h-[297mm] print:shadow-none`}
        style={{
          borderColor: formData?.themeColor || themeColors[0],
        }}
      >
        {sections.map(
          ({ index, component, condition }) =>
            condition && (
              <div
                key={index}
                onClick={
                  isEditMode ? () => setActiveFormIndex(index) : undefined
                }
                className={interactiveClass}
              >
                {component}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default MhResumePreview;
