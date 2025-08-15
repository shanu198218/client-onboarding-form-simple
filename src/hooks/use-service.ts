import { useCallback } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { OnboardingValues } from '../types/field.type';
import { Service } from '@/utils/helper-utils';

export function useServices(
  watch: UseFormWatch<OnboardingValues>,
  setValue: UseFormSetValue<OnboardingValues>,
) {
  const services = watch('services') || [];

  const toggleService = useCallback(
    (svc: Service) => {
      setValue(
        'services',
        services.includes(svc) ? services.filter((s: Service) => s !== svc) : [...services, svc],
        { shouldValidate: true },
      );
    },
    [services, setValue],
  );

  return { services, toggleService };
}
