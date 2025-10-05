import { useFormContext } from '@/lib/context/FormProvider';
import { getMonthAndYear } from '@/lib/utils';
import React from 'react'

const CertificatePreview = () => {
     const { formData } = useFormContext();
      return (
          <div className='pt-3'>
              <p className='text-lg xs:text-2xl font-bold'>PELATIHAN</p>
              {formData?.certificate.map(
                  (
                      { name, startDate, endDate, issuedBy, link }: any,
                      index: number
                  ) => (
                      <div key={index} className="mb-6 text-sm xs:text-[15px]">
                          <hr
                              className=" my-2 border-black"
                          />
                          <div className="w-full px-2 space-y-4">
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
          </div>
      );
}

export default CertificatePreview