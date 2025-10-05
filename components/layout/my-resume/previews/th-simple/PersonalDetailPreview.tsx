import { useFormContext } from '@/lib/context/FormProvider';
import React from 'react'

const PersonalDetailPreview = () => {
    const { formData } = useFormContext();
    return (
        <div className="pt-14">
            <div className="text-xl xs:text-4xl text-center">
                {formData?.firstName} {formData?.lastName}
            </div>
            <div className="flex justify-between text-sm xs:text-lg items-center my-1 border-t-[1px] border-b-[1px] border-black py-1">
                <p>{formData?.phone}</p>
                <p>{formData?.email}</p>
                <p>{formData?.address}</p>
            </div>
    </div>
    )
}

export default PersonalDetailPreview