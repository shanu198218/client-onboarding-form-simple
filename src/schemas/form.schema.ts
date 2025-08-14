import { z } from 'zod';
import { fullNameRegex, ServicesEnum } from "../utils/data-utils";

export const onboardingSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be at most 80 characters")
    .regex(fullNameRegex, "Only letters, spaces, apostrophes, and hyphens are allowed"),
  
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  
  companyName: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be at most 100 characters"),
  
  services: z
    .array(ServicesEnum)
    .min(1, "Select at least one service"),
  
budgetUsd: z
  .number()
  .int({ message: "Budget must be an integer" })
  .min(100, { message: "Budget must be at least 100" })
  .max(1_000_000, { message: "Budget must be less than 1,000,000" })
  .optional(),






  
  projectStartDate: z
    .string()
    .min(1, "Start date is required")
    .refine((val) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const d = new Date(val);
      return !isNaN(d.valueOf()) && d >= today;
    }, "Start date must be today or later"),
  
  acceptTerms: z
    .boolean()
    .refine((v) => v === true, { message: "You must accept the terms" }),
});
