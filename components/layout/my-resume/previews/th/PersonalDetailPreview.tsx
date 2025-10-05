import { useFormContext } from "@/lib/context/FormProvider";
import { formatDate } from "@/lib/utils";
import React from "react";

const PersonalDetailPreview = () => {
  const { formData } = useFormContext();
  return (
    <>
      <div className="mt-2">
        <p className="font-medium">NAMA:</p>
        <p className="text-gray-300">
          {formData?.firstName} {formData?.lastName}
        </p>
      </div>
      <div className="mt-2">
        <p className="font-medium">CONTACT:</p>
        <a
          href={`mailto:${formData?.email}`}
          className="flex items-center text-gray-300 hyphens-auto break-all"
        >
          <span>{formData?.email}</span>
        </a>
      </div>
    </>
  );
};

export default PersonalDetailPreview;