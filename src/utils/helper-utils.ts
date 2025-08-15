import { demoFormData } from "./data";
import z from "zod";

export function todayInputValue() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}


export const fillDemoData = (setValue: any, setServices: any) => {
  setValue("fullName", demoFormData.fullName);
  setValue("email", demoFormData.email);
  setValue("companyName", demoFormData.companyName);
  setValue("budgetUsd", demoFormData.budgetUsd);
  setValue("projectStartDate", demoFormData.projectStartDate);
  setValue("acceptTerms", demoFormData.acceptTerms);
  setServices(demoFormData.services);
  setValue("services", demoFormData.services);
};



export const ServicesEnum = z.enum(["UI/UX", "Branding", "Web Dev", "Mobile App"]);

export const fullNameRegex = /^[A-Za-z][A-Za-z\s'\-]{1,79}$/;

export type AlertType = "error" | "success";

export const ServiceOptions = ["UI/UX", "Branding", "Web Dev", "Mobile App"] as const;

export type Service = z.infer<typeof ServicesEnum>;