import { useFormContext } from "@/lib/context/FormProvider";
import React from "react";

const SocmedPreview = () => {
  const { formData } = useFormContext();
  return (
    <>
      {formData?.socmed?.length > 0 &&
        formData?.socmed.map(({ name, link }: any, index: number) => (
          <div key={index} className="mt-2">
            <p className="font-medium">{name}:</p>{" "}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300"
            >
              Lihat
            </a>
          </div>
        ))}
    </>
  );
};

export default SocmedPreview;
