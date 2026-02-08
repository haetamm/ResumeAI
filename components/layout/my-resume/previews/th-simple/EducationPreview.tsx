import { useFormContext } from '@/lib/context/FormProvider'
import { getYear } from '@/lib/utils';
import React from 'react'

const EducationPreview = () => {
    const { formData } = useFormContext();
    return (
        <div className='pt-3'>
            <p className='text-lg xs:text-2xl font-bold'>PENDIDIKAN</p>
            {formData?.education.map(
            ({ degree, universityName, endDate }: any, index: number) => (
                <div key={index} className="mb-2 text-sm xs:text-[15px]">
                    <p>{degree}</p>
                    <p>{universityName}</p>
                    <p>{endDate ? getYear(endDate) : "Aktif"}</p>
                </div>
            ))}
        </div>
    )
}

export default EducationPreview