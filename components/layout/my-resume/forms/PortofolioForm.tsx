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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addPortofolioToResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { portofolioFields } from "@/lib/fields";
import { useCheckOffline } from "@/lib/hooks/useCheckOffline";
import { useHandleError } from "@/lib/hooks/useHandleError";
import { formatDateToInput, formatDateToISO } from "@/lib/utils";
import { PortofolioValidationSchema } from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const PortofolioForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange, loadResumeData } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { checkOffline } = useCheckOffline();
  const { handleError } = useHandleError();

  const form = useForm<z.infer<typeof PortofolioValidationSchema>>({
    resolver: zodResolver(PortofolioValidationSchema),
    mode: "onChange",
    defaultValues: {
      portofolio:
        formData?.portofolio?.length > 0
          ? formData.portofolio.map((porto: any) => ({
              _id: porto._id || "",
              name: porto.name || "",
              description: porto.description || "",
              preview: porto.preview || "",
              sourceCode: porto.sourceCode || "",
              startDate: formatDateToInput(porto.startDate) || "",
              endDate: formatDateToInput(porto.endDate) || "",
            }))
          : [
              {
                name: "",
                description: "",
                preview: "",
                sourceCode: "",
                startDate: "",
                endDate: "",
              },
            ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "portofolio",
  });

  const handleChange = (
    index: number,
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = event.target;
    const newEntries = form.getValues("portofolio").slice();
    newEntries[index] = { ...newEntries[index], [name]: value };
    handleInputChange({
      target: {
        name: "portofolio",
        value: newEntries,
      },
    });
  };

  const AddNewPortofolio = () => {
    const newEntry = {
      name: "",
      description: "",
      preview: "",
      sourceCode: "",
      startDate: "",
      endDate: "",
    };
    append(newEntry);
    const newEntries = [...form.getValues("portofolio"), newEntry];
    handleInputChange({
      target: {
        name: "portofolio",
        value: newEntries,
      },
    });
  };

  const RemovePortofolio = (index: number) => {
    remove(index);
    const newEntries = form.getValues("portofolio");
    handleInputChange({
      target: {
        name: "portofolio",
        value: newEntries,
      },
    });
  };

  const onSave = async (data: z.infer<typeof PortofolioValidationSchema>) => {
    if (checkOffline()) return;

    setIsLoading(true);
    try {
      // Convert dates back to ISO format before saving
      const formattedData = {
        portofolio: data.portofolio.map((porto) => ({
          ...porto,
          startDate: formatDateToISO(porto.startDate),
          endDate: formatDateToISO(porto.endDate),
        })),
      };
      const result = await addPortofolioToResume(params.id, formattedData.portofolio);
      if (result.success) {
        loadResumeData();
        toast({
          title: "Information saved.",
          description: "Portfolio details updated successfully.",
          className: "bg-white",
        });
        handleInputChange({
          target: {
            name: "portofolio",
            value: formattedData.portofolio,
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
          Portfolio
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Add your portfolio details
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="mt-5">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
              >
                {portofolioFields.map((config) => (
                  <FormField
                    key={config.name}
                    control={form.control}
                    name={`portofolio.${index}.${config.name}`}
                    render={({ field }) => (
                      <FormItem
                        className={config.fullWidth ? "col-span-2" : ""}
                      >
                        <FormLabel className="text-slate-700 font-semibold text-md">
                          {config.label}:
                        </FormLabel>
                        <FormControl>
                          {config.type === "textarea" ? (
                            <Textarea
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleChange(index, e);
                              }}
                              className={`no-focus ${
                                form.formState.errors.portofolio?.[index]?.[
                                  config.name
                                ]
                                  ? "error"
                                  : ""
                              }`}
                              rows={6}
                            />
                          ) : (
                            <Input
                              type={config.type}
                              {...field}
                              value={field.value as string}
                              className={`no-focus ${
                                form.formState.errors.portofolio?.[index]?.[
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
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            ))}
            <div className="mt-3 flex gap-2 justify-between">
              <ActionButtons
                onAdd={AddNewPortofolio}
                onRemove={RemovePortofolio}
                fieldCount={fields.length}
              />
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isValid}
                className="bg-primary-700 hover:bg-primary-800 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Saving
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PortofolioForm;