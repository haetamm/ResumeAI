import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const themeColors = [
  "#1e3a8a",
  "#90A4AE", // Light Grey Blue
  "#E57373", // Light Red
  "#64B5F6", // Light Blue
  "#81C784", // Light Green
  "#FFF176", // Light Yellow
  "#FFB74D", // Light Orange
  "#BA68C8", // Light Purple
  "#4DB6AC", // Light Teal
  "#AED581", // Light Lime
  "#FF8A65", // Light Coral
  "#A1887F", // Light Brown
  "#F06292", // Light Pink
  "#7986CB", // Light Indigo
  "#FFD54F", // Light Amber
  "#FFEB3B", // Bright Yellow
];
export const layouts = ["MH", "TH"];

export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, "").trim();
};

const now = new Date();
export const token = `process.env.NEXT_PUBLIC_SIGNOUT_TOKEN${now.getFullYear()}-${
  now.getMonth() + 1
}-${now.getDate()}`;

export const getYear = (date: string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "-";
  }
  return new Date(date).getFullYear();
};

export const getEndYear = (date: string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "Aktif";
  }
  return new Date(date).getFullYear();
};

export const getMonthAndYear = (date: string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "-";
  }
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("id", { month: "short" });
  const year = dateObj.getFullYear();
  return `${month}, ${year}`;
};

export const formatDate = (date: string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "-";
  }
  const dateObj = new Date(date);
  return `${dateObj.toLocaleString("id", { month: "long" })}, ${dateObj
    .getDate()
    .toString()
    .padStart(2, "0")}-${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dateObj.getFullYear()}`;
};

export const formatDateToInput = (isoDate: string | undefined): string => {
  if (!isoDate) return "";
  return isoDate.split("T")[0];
};

export const formatDateToISO = (date: string | undefined): string => {
  if (!date) return "";
  return new Date(date).toISOString();
};