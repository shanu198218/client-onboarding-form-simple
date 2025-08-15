import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import z from 'zod';
import { onboardingSchema } from '@/schemas/form.schema';
import { Service } from '@/utils/helper-utils';

export type OnboardingFormFieldsProps = {
  register: UseFormRegister<OnboardingValues>;
  errors: FieldErrors<OnboardingValues>;
  services: Service[];
  toggleService: (svc: Service) => void;
  isSubmitting: boolean;
  setValue: UseFormSetValue<OnboardingValues>;
  setServices: (services: string[]) => void;
  reset: () => void;
};

export type OnboardingValues = z.infer<typeof onboardingSchema>;
