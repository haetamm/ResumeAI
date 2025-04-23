import { z } from "zod";
import {
  CertificateValidationSchema,
  EducationValidationSchema,
  ExperienceValidationSchema,
  PortofolioValidationSchema,
  SocmedValidationSchema,
} from "./validations/resume";

export const personalDetailFields = [
  { name: "firstName", label: "First Name", type: "text", fullWidth: false },
  { name: "lastName", label: "Last Name", type: "text", fullWidth: false },
  {
    name: "birthplace",
    label: "Place of birth",
    type: "text",
    fullWidth: false,
  },
  { name: "birthdate", label: "Date of birth", type: "date", fullWidth: false },
  { name: "jobTitle", label: "Job Title", type: "text", fullWidth: true },
  { name: "address", label: "Address", type: "text", fullWidth: true },
  { name: "phone", label: "Phone", type: "number", fullWidth: false },
  { name: "email", label: "Email", type: "email", fullWidth: false },
  { name: "imageUrl", label: "Photo (url)", type: "text", fullWidth: true },
] as const;

type Experience = z.infer<
  typeof ExperienceValidationSchema
>["experience"][number];

interface ExperienceFields {
  name: keyof Experience;
  label: string;
  type: "text" | "date" | "richText";
  fullWidth: boolean;
}

export const experienceFields: ExperienceFields[] = [
  { name: "title", label: "Position Title", type: "text", fullWidth: false },
  {
    name: "companyName",
    label: "Company Name",
    type: "text",
    fullWidth: false,
  },
  { name: "city", label: "City", type: "text", fullWidth: false },
  { name: "state", label: "State", type: "text", fullWidth: false },
  { name: "startDate", label: "Start Date", type: "date", fullWidth: false },
  { name: "endDate", label: "End Date", type: "date", fullWidth: false },
  {
    name: "workSummary",
    label: "Summary",
    type: "richText",
    fullWidth: true,
  },
];

type Education = z.infer<typeof EducationValidationSchema>["education"][number];

interface EducationField {
  name: keyof Education;
  label: string;
  type: "text" | "date" | "textarea";
  fullWidth: boolean;
}

export const educationFields: EducationField[] = [
  {
    name: "universityName",
    label: "Name of Institute",
    type: "text",
    fullWidth: true,
  },
  { name: "degree", label: "Degree", type: "text", fullWidth: false },
  { name: "major", label: "City", type: "text", fullWidth: false },
  { name: "startDate", label: "Start Date", type: "date", fullWidth: false },
  { name: "endDate", label: "End Date", type: "date", fullWidth: false },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    fullWidth: true,
  },
];

type Certification = z.infer<
  typeof CertificateValidationSchema
>["certificate"][number];

interface CertificationField {
  name: keyof Certification;
  label: string;
  type: "text" | "date";
  fullWidth: boolean;
}

export const certificationFields: CertificationField[] = [
  {
    name: "name",
    label: "Course Title",
    type: "text",
    fullWidth: true,
  },
  { name: "issuedBy", label: "Issuer", type: "text", fullWidth: true },
  { name: "startDate", label: "Start Date", type: "date", fullWidth: false },
  { name: "endDate", label: "End Date", type: "date", fullWidth: false },
  {
    name: "link",
    label: "Url",
    type: "text",
    fullWidth: true,
  },
];

type Portofolio = z.infer<
  typeof PortofolioValidationSchema
>["portofolio"][number];

interface PortofolioField {
  name: keyof Portofolio;
  label: string;
  type: "text" | "date" | "textarea";
  fullWidth: boolean;
}

export const portofolioFields: PortofolioField[] = [
  {
    name: "name",
    label: "Project Name",
    type: "text",
    fullWidth: true,
  },
  { name: "startDate", label: "Start Date", type: "date", fullWidth: false },
  { name: "endDate", label: "End Date", type: "date", fullWidth: false },
  {
    name: "preview",
    label: "Preview",
    type: "text",
    fullWidth: true,
  },
  {
    name: "sourceCode",
    label: "Source Code",
    type: "text",
    fullWidth: true,
  },
  {
    name: "description",
    label: "DESCRIPTION",
    type: "textarea",
    fullWidth: true,
  },
];

type Socmed = z.infer<typeof SocmedValidationSchema>["socmed"][number];

interface SocmedField {
  name: keyof Socmed;
  label: string;
  type: "text";
  fullWidth: boolean;
}

export const socmedFields: SocmedField[] = [
  {
    name: "name",
    label: "Socmed Name",
    type: "text",
    fullWidth: true,
  },
  { name: "link", label: "Url", type: "text", fullWidth: true },
];
