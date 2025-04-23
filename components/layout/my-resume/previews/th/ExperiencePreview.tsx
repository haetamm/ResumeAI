import { useFormContext } from "@/lib/context/FormProvider";
import { getMonthAndYear, themeColors } from "@/lib/utils";
import React from "react";

const ExperiencePreview = () => {
  const { formData } = useFormContext();
  return (
    <>
      <section className="mt-4">
        <h2
          style={{
            color: formData?.themeColor || themeColors[0],
          }}
          className="text-xl !font-bold text-blue-900 px-2 mb-2"
        >
          PENGALAMAN
        </h2>
        {formData?.experience.map(
          (
            { companyName, startDate, endDate, workSummary }: any,
            index: number
          ) => (
            <div key={index} className="m-0 ">
              <hr
                style={{
                  borderColor: formData?.themeColor || themeColors[0],
                }}
                className="border-[1px] my-2"
              />
              <div className="w-full px-2">
                <div className="w-full grid grid-cols-[40%_60%] justify-between gap-3">
                  <div className="flex flex-col space-y-8">
                    <div>
                      <h2 className="font-medium text-gray-400">
                        NAMA PERUSAHAAN
                      </h2>
                      <p>{companyName}</p>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <h2 className="font-medium text-gray-400">MULAI</h2>
                        <p>{getMonthAndYear(startDate)}</p>
                      </div>
                      <div>
                        <h2 className="font-medium text-gray-400">SELESAI</h2>
                        <p>{endDate ? getMonthAndYear(endDate) : "Aktif"}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-400">DESKRIPSI</h2>
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: workSummary,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
};

export default ExperiencePreview;
