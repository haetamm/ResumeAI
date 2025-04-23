import { useFormContext } from "@/lib/context/FormProvider";
import { getMonthAndYear, themeColors } from "@/lib/utils";
import React from "react";

const CertificatePreview = () => {
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
          PELATIHAN
        </h2>
        {formData?.certificate.map(
          (
            { name, startDate, endDate, issuedBy, link }: any,
            index: number
          ) => (
            <div key={index} className="m-0">
              <hr
                style={{
                  borderColor: formData?.themeColor || themeColors[0],
                }}
                className="border-[1px] my-2"
              />
              <div className="w-full px-2 space-y-6">
                <div className="w-full grid grid-cols-[40%_30%_30%] justify-between gap-3">
                  <div>
                    <p className="font-medium text-gray-400">NAMA</p>
                    <p>{name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">DIMULAI</p>
                    <p>{getMonthAndYear(startDate)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">BERAKHIR</p>
                    <p>{endDate ? getMonthAndYear(endDate) : "Aktif"}</p>
                  </div>
                </div>
                <div className="w-full grid grid-cols-[40%_60%] justify-between gap-3">
                  <div>
                    <p className="font-medium text-gray-400">PENYELENGGARA</p>
                    <p>{issuedBy}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">SERTIFIKAT</p>
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-900"
                      >
                        Lihat
                      </a>
                    ) : (
                      <p>-</p>
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

export default CertificatePreview;
