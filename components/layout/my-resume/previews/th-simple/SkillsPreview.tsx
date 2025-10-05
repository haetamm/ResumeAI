import { useFormContext } from '@/lib/context/FormProvider';
import React from 'react'

const SkillsPreview = () => {
  const { formData } = useFormContext();
  return (
    <>
      <hr className='border-black my-4'/>
      <div className='xs:py-2'>
          <p className='text-lg xs:text-2xl font-bold'>SKILL</p>
          {formData?.skills.map(
          ({ name }: any, index: number) => (
            <p key={index} className="flex items-center text-sm xs:text-[15px] space-y-1">
                <span className='mr-2'>✔</span>
                <p>
                {name}
                </p>
            </p>
          ))}
      </div>
    </>
  )
}

export default SkillsPreview