"use client";

import { ActionButtons } from "@/components/common/ActionButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addSocmedToResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { socmedFields } from "@/lib/fields";
import { useCheckOffline } from "@/lib/hooks/useCheckOffline";
import { useHandleError } from "@/lib/hooks/useHandleError";
import { SocmedValidationSchema } from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const SocmedForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange, loadResumeData } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { checkOffline } = useCheckOffline();
  const { handleError } = useHandleError();

  const form = useForm<z.infer<typeof SocmedValidationSchema>>({
    resolver: zodResolver(SocmedValidationSchema),
    mode: "onChange",
    defaultValues: {
      socmed:
        formData?.socmed?.length > 0
          ? formData.socmed.map((soc: any) => ({
              _id: soc._id || "",
              name: soc.name || "",
              link: soc.link || "",
            }))
          : [
              {
                name: "",
                link: "",
              },
            ],
    },
  });

  const { fields, prepend, remove } = useFieldArray({
    control: form.control,
    name: "socmed",
  });

  const handleChange = (
    index: number,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = event.target;
    const newEntries = form.getValues("socmed").slice();
    newEntries[index] = { ...newEntries[index], [name]: value };
    handleInputChange({
      target: {
        name: "socmed",
        value: newEntries,
      },
    });
  };

  const AddNewSocmed = () => {
    const newEntry = {
      name: "",
      link: "",
    };
    prepend(newEntry);
    const newEntries = [...form.getValues("socmed"), newEntry];
    handleInputChange({
      target: {
        name: "socmed",
        value: newEntries,
      },
    });
  };

  const RemoveSocmed = (index: number) => {
    remove(index);
    const newEntries = form.getValues("socmed");
    handleInputChange({
      target: {
        name: "socmed",
        value: newEntries,
      },
    });
  };

  const onSave = async (data: z.infer<typeof SocmedValidationSchema>) => {
    if (checkOffline()) return;

    setIsLoading(true);
    try {
      const result = await addSocmedToResume(params.id, data.socmed);
      if (result.success) {
        loadResumeData();
        toast({
          title: "Information saved.",
          description: "Socmed details updated successfully.",
          className: "bg-white",
        });
        handleInputChange({
          target: {
            name: "socmed",
            value: data.socmed,
          },
        });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          Social Media
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Add your Social Media details
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="mt-5">
            <div className="mb-5 flex gap-2 justify-between">
              <ActionButtons
                onAdd={AddNewSocmed}
                onRemove={RemoveSocmed}
                fieldCount={fields.length}
              />
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isValid}
                className="bg-primary-700 hover:bg-primary-800 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp; Saving
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
              >
                {socmedFields.map((config) => (
                  <FormField
                    key={config.name}
                    control={form.control}
                    name={`socmed.${index}.${config.name}`}
                    render={({ field }) => (
                      <FormItem
                        className={config.fullWidth ? "col-span-2" : ""}
                      >
                        <FormLabel className="text-slate-700 font-semibold text-md">
                          {config.label}:
                        </FormLabel>
                        <FormControl>
                          <Input
                            type={config.type}
                            {...field}
                            value={field.value as string}
                            className={`no-focus ${
                              form.formState.errors.socmed?.[index]?.[
                                config.name
                              ]
                                ? "error"
                                : ""
                            }`}
                            onChange={(e) => {
                              field.onChange(e);
                              handleChange(index, e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            ))}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SocmedForm;
