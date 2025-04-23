import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";

const SkillsPreview = () => {
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
          SKILL
        </h2>
        <hr
          style={{
            borderColor: formData?.themeColor || themeColors[0],
          }}
          className="border-[1px] mb-2"
        />
        <div className="grid grid-cols-3 xl:grid-cols-[40%_30%_30%] px-2 gap-x-3 gap-y-1 justify-between">
          {formData?.skills.map(({ name }: any, index: number) => (
            <p key={index} className="flex items-center">
              ✔ {name}
            </p>
          ))}
        </div>
      </section>
    </>
  );
};

export default SkillsPreview;
