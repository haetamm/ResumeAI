import { useFormContext } from '@/lib/context/FormProvider';
import React from 'react'

const SocmedPreview = () => {
    const { formData } = useFormContext();
    return (
      <>
        <hr className='border-black border-[1px] my-4'/>
        <div className='xs:py-2'>
            {formData?.socmed.map(
            ({ name, link }: any, index: number) => (
               <div key={index} className="mb-3">
                    <p className="font-bold text-sm xs:text-[15px] text-gray-400">{name}:</p>{" "}
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-sm xs:text-[15px]"
                    >
                    Lihat
                    </a>
                </div>
            ))}
        </div>
      </>
    )
}

export default SocmedPreview