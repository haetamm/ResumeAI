import { useFormContext } from "@/lib/context/FormProvider";
import { getYear, themeColors } from "@/lib/utils";
import React from "react";

const EducationPreview = () => {
  const { formData } = useFormContext();
  return (
    <>
      <section className="mt-4">
        <h2
          style={{
            color: formData?.themeColor || themeColors[0],
          }}
          className="text-xl !font-bold px-2 mb-2"
        >
          PENDIDIKAN
        </h2>
        <hr
          style={{
            borderColor: formData?.themeColor || themeColors[0],
          }}
          className="border-[1px]"
        />
        {formData?.education.map(
          ({ degree, universityName, endDate }: any, index: number) => (
            <div key={index} className="mt-2 grid grid-cols-2 px-2">
              <div>
                <p className="font-medium text-gray-400">SEKOLAH</p>
                <div className="leading-[18px]">
                  <p>{degree}</p>
                  <p>{universityName}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-400">TAHUN LULUS</p>{" "}
                {endDate ? getYear(endDate) : "Aktif"}
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
};

export default EducationPreview;
