
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { onboardingSchema } from "../schemas/form.schema";
import z from "zod";
import { Service } from "../utils/data-utils";

export type OnboardingFormFieldsProps = {
  register: UseFormRegister<OnboardingValues>;
 errors: FieldErrors<OnboardingValues>;
  services: Service[];   
toggleService: (svc: Service) => void; 
  isSubmitting: boolean;
};

export type OnboardingValues = z.infer<typeof onboardingSchema>;
