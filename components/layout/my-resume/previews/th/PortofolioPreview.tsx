import { useFormContext } from "@/lib/context/FormProvider";
import { getMonthAndYear, themeColors } from "@/lib/utils";
import React from "react";

const PortofolioPreview = () => {
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
          PORTOFOLIO
        </h2>
        {formData?.portofolio.map(
          (
            { name, startDate, endDate, description, preview, sourceCode }: any,
            index: number
          ) => (
            <div key={index} className="m-0">
              <hr
                style={{
                  borderColor: formData?.themeColor || themeColors[0],
                }}
                className="border-[1px] my-2"
              />
              <div className="w-full space-y-6 px-2">
                <div className="w-full grid grid-cols-[40%_30%_30%] justify-between gap-3">
                  <div>
                    <h2 className="font-medium text-gray-400">NAMA</h2>
                    <p>{name}</p>
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-400">DIMULAI</h2>
                    <p>{getMonthAndYear(startDate)}</p>
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-400">BERAKHIR</h2>
                    <p>{endDate ? getMonthAndYear(endDate) : "-"}</p>
                  </div>
                </div>
                <div>
                  <h2 className="font-medium text-gray-400">DESKRIPSI</h2>
                  <p className="text-justify">{description}</p>
                  <div className="mt-2 flex flex-col">
                    {preview && (
                      <p>
                        Preview:{" "}
                        <a
                          href={preview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-900"
                        >
                          here
                        </a>
                      </p>
                    )}
                    {sourceCode && (
                      <p>
                        Source Code:{" "}
                        <a
                          href={sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-900"
                        >
                          here
                        </a>
                      </p>
                    )}
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

export default PortofolioPreview;
