import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import EducationPreview from "../previews/th-simple/EducationPreview";
import PersonalDetailPreview from "../previews/th-simple/PersonalDetailPreview";
import SkillsPreview from "../previews/th-simple/SkillsPreview";
import CertificatePreview from "../previews/th-simple/CertificatePreview";
import PortofolioPreview from "../previews/th-simple/PortofolioPreview";
import SocmedPreview from "../previews/th-simple/SocmedPreview";
import ExperiencePreview from "../previews/th-simple/ExperiencePreview";

const ThSimpleResumePreview = ({ view = false }) => {
  const { formData, setActiveFormIndex } = useFormContext();
  const pathname = usePathname();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      setLoading(false); 
    }
  }, [formData]);

  const isEditMode = pathname.endsWith("/edit");
  const interactiveClass = isEditMode
    ? "cursor-pointer hover:bg-gray-100 rounded hover:text-black"
    : "";

  const sections = [
    { index: 1, component: <PersonalDetailPreview />, condition: true },
    { index: 4, component: <EducationPreview />, condition: formData?.education?.length > 0 },
    { index: 7, component: <SkillsPreview />, condition: formData?.skills?.length > 0 },
    { index: 8, component: <SocmedPreview />, condition: formData?.socmed?.length > 0 },
    { index: 3, component: <ExperiencePreview />, condition: formData?.experience?.length > 0 },
    { index: 5, component: <CertificatePreview />, condition: formData?.certificate?.length > 0 },
    { index: 6, component: <PortofolioPreview />, condition: formData?.portofolio?.length > 0 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-full min-h-[297mm] rounded-sm shadow-lg skeleton" />
      </div>
    );
  }

  return (
    <div
      className={`${
        view ? "text-xl" : "max-[1439px]:text-sm"
      } items-center min-w-[450px] bg-white md:min-w-0 justify-center mb-10`}
      >
          <div className={`${view ? "xs:px-5" : "px-4"} bg-white shadow-lg mx-auto md:w-full min-h-[297mm] font-bahnschrift `}>
            <div className={` ${view ? "px-2 xs:px-4" : "px-2"}`} >
                <PersonalDetailPreview />
              </div>
              
            <div className="flex flex-row mt-2">
                {/* Left Section */}
                <div className={` ${view ? "px-2 xs:px-4" : "px-2"} w-[27%] xs:w-[30%]`}>
                    {sections.slice(1, 4).map(
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

                {/* Right Section */}
                <div
                    className={`${
                    view ? "px-2 xs:px-4" : "p-2"
                    } w-[73%] xs:w-[70%] text- border-l-[1px] border-black`}
                >
                    <div className="text-md">
                        {sections.slice(4, 7).map(
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
            </div>
        </div>
    </div>
  );
};

export default ThSimpleResumePreview;
