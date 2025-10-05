import { useFormContext } from '@/lib/context/FormProvider';
import { getMonthAndYear } from '@/lib/utils';
import React from 'react'

const ExperiencePreview = () => {
  const { formData } = useFormContext();
  return (
    <div className='pt-3'>
        <p className='text-lg xs:text-2xl font-bold'>PENGALAMAN</p>
            {formData?.experience.map(
                  (
                    { companyName, startDate, endDate, workSummary }: any,
                    index: number
                  ) => (
                    <div key={index} className="mb-6 text-sm xs:text-[15px]">
                      <hr
                        className=" my-2 border-black"
                      />
                      <div className="w-full space-y-3 px-2">
                        <div className="w-full grid grid-cols-[40%_30%_30%] justify-between gap-3">
                          <div>
                            <h2 className="font-medium text-gray-400">NAMA PERUSAHAAN</h2>
                            <p>{companyName}</p>
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
                           <div
                              className=""
                              dangerouslySetInnerHTML={{
                                __html: workSummary,
                              }}
                            />
                        </div>
                      </div>
                    </div>
                  )
                )}
    </div>
  );
}

export default ExperiencePreview