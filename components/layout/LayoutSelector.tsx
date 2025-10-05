"use client";

import { useFormContext } from "@/lib/context/FormProvider";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Check, Layout } from "lucide-react";
import { updateResume } from "@/lib/actions/resume.actions";
import { useToast } from "../ui/use-toast";
import { useCheckOffline } from "@/lib/hooks/useCheckOffline";
import { useHandleError } from "@/lib/hooks/useHandleError";

const layoutOptions = [
  { value: "th", label: "Classic" },
  { value: "th-simple", label: "Simple" },
];

const LayoutSelector = ({ params }: { params: { id: string } }) => {
  const { toast } = useToast();
  const { formData, handleInputChange } = useFormContext();
  const [selectedLayout, setSelectedLayout] = useState(layoutOptions[0].value);
  const { checkOffline } = useCheckOffline();
  const { handleError } = useHandleError();

  useEffect(() => {
    if (formData?.layout) {
      setSelectedLayout(formData.layout);
    }
  }, [formData?.layout]);

  const onLayoutSelect = async (layout: string) => {
    if (checkOffline()) {
      toast({
        title: "Offline",
        description: "You are offline. Please connect to the internet to change the layout.",
        variant: "destructive",
        className: "bg-white",
      });
      return;
    }

    try {
      setSelectedLayout(layout);
      handleInputChange({
        target: { name: "layout", value: layout },
      });

      const result = await updateResume({
        resumeId: params.id,
        updates: { layout },
      });

      if (result.success) {
        toast({
          title: "Layout updated",
          description: "Resume layout changed successfully.",
          className: "bg-white",
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className="btn-gradient flex items-center gap-2 text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2"
        >
          <Layout className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Layout</span>
        </Button>
      </PopoverTrigger>

      {/* popover ke bawah */}
      <PopoverContent
        side="bottom"
        align="start"
        className="w-[90vw] sm:w-64 max-w-sm p-4 bg-white shadow-md rounded-xl"
      >
        <h2 className="mb-3 text-sm font-bold text-gray-800">
          Select Resume Layout
        </h2>

        <div className="flex flex-col gap-2">
          {layoutOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => onLayoutSelect(option.value)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-300 border ${
                selectedLayout === option.value
                  ? "bg-gray-100 border-gray-300"
                  : "hover:bg-gray-50 border-transparent"
              }`}
            >
              <span className="text-sm">{option.label}</span>
              {selectedLayout === option.value && (
                <Check className="w-4 h-4 text-black" />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LayoutSelector;
