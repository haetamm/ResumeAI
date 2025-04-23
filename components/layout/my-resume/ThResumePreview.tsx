import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";
import EducationPreview from "./previews/th/EducationPreview";
import { usePathname } from "next/navigation";
import PersonalDetailPreview from "./previews/th/PersonalDetailPreview";
import SkillsPreview from "./previews/th/SkillsPreview";
import ExperiencePreview from "./previews/th/ExperiencePreview";
import CertificatePreview from "./previews/th/CertificatePreview";
import PortofolioPreview from "./previews/th/PortofolioPreview";
import SocmedPreview from "./previews/th/SocmedPreview";
import { QRCodeSVG } from "qrcode.react";

const ThResumePreview = ({ view = false }) => {
  const { formData, setActiveFormIndex, loading } = useFormContext();
  const pathname = usePathname();

  const isEditMode = pathname.endsWith("/edit");
  const interactiveClass = isEditMode
    ? "cursor-pointer hover:bg-gray-100 rounded hover:text-black"
    : "";

  const sections = [
    {
      index: 1,
      component: <PersonalDetailPreview />,
      condition: true,
    },
    {
      index: 8,
      component: <SocmedPreview />,
      condition: formData?.socmed?.length > 0,
    },
    {
      index: 4,
      component: <EducationPreview />,
      condition: formData?.education?.length > 0,
    },
    {
      index: 7,
      component: <SkillsPreview />,
      condition: formData?.skills?.length > 0,
    },
    {
      index: 3,
      component: <ExperiencePreview />,
      condition: formData?.experience?.length > 0,
    },
    {
      index: 5,
      component: <CertificatePreview />,
      condition: formData?.certificate?.length > 0,
    },
    {
      index: 6,
      component: <PortofolioPreview />,
      condition: formData?.portofolio?.length > 0,
    },
  ];

  if (Object.keys(formData || {}).length === 0 || loading) {
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
      } flex items-center min-w-[490px] md:min-w-0 justify-center mb-10 `}
    >
      <div className="flex flex-row bg-white shadow-lg mx-auto md:w-full min-h-[297mm] font-cambria">
        {/* Left Section */}
        <div className={` ${view ? "px-4" : "px-2"} w-[70%] py-10`}>
          <h1
            style={{
              color: formData?.themeColor || themeColors[0],
            }}
            className="text-3xl !font-bold text-center mb-4"
          >
            RESUME
          </h1>

          {sections.slice(2, 7).map(
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
            view ? "px-4" : "p-2"
          } w-[30%] text-white p-2.5 text-left`}
          style={{
            backgroundColor: formData?.themeColor || themeColors[0],
          }}
        >
          <h2 className="text-xl font-bold text-center pt-20">PROFILE</h2>
          {formData?._id && formData.imageUrl ? (
            <>
              <div className="flex justify-center mt-2 mx-auto">
                <QRCodeSVG
                  value={formData.imageUrl}
                  size={formData.id ? 200 : 130}
                  bgColor="transparent"
                  fgColor="#ffffff"
                  className=""
                />
              </div>
              <p className="text-center mt-2">Scan to see profile photo</p>
            </>
          ) : (
            <div className="w-[130px] h-[130px] bg-gray-200 mx-auto mt-2" />
          )}
          <div className="text-md mt-6">
            {sections.slice(0, 2).map(
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
  );
};

export default ThResumePreview;
