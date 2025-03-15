"use client";

import { ReactNode, useState, createContext, useContext } from "react";
import useFetchResume from "../hooks/useFetchResumes";

interface FormContextType {
  formData: any;
  handleInputChange: (e: { target: { name: string; value: any } }) => void;
  activeFormIndex: number;
  setActiveFormIndex: (index: number) => void;
  loading: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) => {
  const { formData, setFormData, loading } = useFetchResume(params.id);
  const [activeFormIndex, setActiveFormIndex] = useState(1);

  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const contextValue: FormContextType = {
    formData,
    handleInputChange,
    activeFormIndex,
    setActiveFormIndex,
    loading,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
