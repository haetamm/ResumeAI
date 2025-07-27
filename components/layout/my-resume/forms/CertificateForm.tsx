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
import { addCertificateToResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { certificationFields } from "@/lib/fields";
import { useCheckOffline } from "@/lib/hooks/useCheckOffline";
import { useHandleError } from "@/lib/hooks/useHandleError";
import { formatDateToInput, formatDateToISO } from "@/lib/utils";
import { CertificateValidationSchema } from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const CertificateForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange, loadResumeData } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { checkOffline } = useCheckOffline();
  const { handleError } = useHandleError();

  const form = useForm<z.infer<typeof CertificateValidationSchema>>({
    resolver: zodResolver(CertificateValidationSchema),
    mode: "onChange",
    defaultValues: {
      certificate:
        formData?.certificate?.length > 0
          ? formData.certificate.map((cert: any) => ({
              _id: cert._id || "",
              name: cert.name || "",
              issuedBy: cert.issuedBy || "",
              link: cert.link || "",
              startDate: formatDateToInput(cert.startDate) || "",
              endDate: formatDateToInput(cert.endDate) || "",
            }))
          : [
              {
                name: "",
                issuedBy: "",
                link: "",
                startDate: "",
                endDate: "",
              },
            ],
    },
  });

  const { fields, prepend, remove } = useFieldArray({
    control: form.control,
    name: "certificate",
  });

  const handleChange = (
    index: number,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = event.target;
    const newEntries = form.getValues("certificate").slice();
    newEntries[index] = { ...newEntries[index], [name]: value };
    handleInputChange({
      target: {
        name: "certificate",
        value: newEntries,
      },
    });
  };

  const AddNewCertificate = () => {
    const newEntry = {
      name: "",
      issuedBy: "",
      link: "",
      startDate: "",
      endDate: "",
    };
    prepend(newEntry);
    const newEntries = [...form.getValues("certificate"), newEntry];
    handleInputChange({
      target: {
        name: "certificate",
        value: newEntries,
      },
    });
  };

  const RemoveCertificate = (index: number) => {
    remove(index);
    const newEntries = form.getValues("certificate");
    handleInputChange({
      target: {
        name: "certificate",
        value: newEntries,
      },
    });
  };

  const onSave = async (data: z.infer<typeof CertificateValidationSchema>) => {
    if (checkOffline()) return;

    setIsLoading(true);
    try {
      // Convert dates back to ISO format before saving
      const formattedData = {
        certificate: data.certificate.map((cert) => ({
          ...cert,
          startDate: formatDateToISO(cert.startDate),
          endDate: formatDateToISO(cert.endDate),
        })),
      };
      const result = await addCertificateToResume(params.id, formattedData.certificate);
      if (result.success) {
        loadResumeData();
        toast({
          title: "Information saved.",
          description: "Certificate details updated successfully.",
          className: "bg-white",
        });
        handleInputChange({
          target: {
            name: "certificate",
            value: data.certificate,
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
          Certificate
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Add your certificate details
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="mt-5">
            <div className="mt-3 flex gap-2 justify-between">
              <ActionButtons
                onAdd={AddNewCertificate}
                onRemove={RemoveCertificate}
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
                {certificationFields.map((config) => (
                  <FormField
                    key={config.name}
                    control={form.control}
                    name={`certificate.${index}.${config.name}`}
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
                              form.formState.errors.certificate?.[index]?.[
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

export default CertificateForm;
