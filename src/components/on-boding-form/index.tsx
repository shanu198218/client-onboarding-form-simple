'use client'
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Alert from '../common/form/alert';
import FormFields from '../form-filed';
import { onboardingSchema } from '../../schemas/form.schema';
import { todayInputValue } from '../../utils/helper-utils';
import { Service, ServiceOptions } from '../../utils/data-utils';

import React from 'react';
import { useOnboardingSubmit } from '@/hooks/useOnBoardingSubmit';
import { OnboardingValues } from '@/types/field.type';
import { useServices } from '@/hooks/useService';

export default function OnboardingForm() {
  const searchParams = useSearchParams();
  const prefillService = searchParams.get('service');
  const decodedService = useMemo<Service | undefined>(() => {
    if (!prefillService) return undefined;
    const decoded = decodeURIComponent(prefillService) as Service;
    return ServiceOptions.includes(decoded) ? decoded : undefined;
  }, [prefillService]);

  const { submitOnboardingForm, serverError, successData } = useOnboardingSubmit();

   const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: '',
      email: '',
      companyName: '',
      services: decodedService ? [decodedService] : [],
      projectStartDate: todayInputValue(),
      acceptTerms: false,
      budgetUsd: 0,
    },
  });

 const { register, handleSubmit, watch, setValue , reset} = form;
 const { errors, isSubmitting } = form.formState;
  const { services, toggleService } = useServices(watch, setValue);
  const [, setServices] = React.useState<string[]>([]);
  

  return (
    <>
      {serverError && <Alert type="error" message={serverError} />}
      {successData && (
        <Alert type="success">
          <p className="mb-1 font-medium">Submitted successfully!</p>
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(successData, null, 2)}
          </pre>
        </Alert>
      )}

      <form onSubmit={handleSubmit(submitOnboardingForm)} noValidate>
        <FormFields
          register={register}
          errors={errors}
          services={services}
          toggleService={toggleService}
          isSubmitting={isSubmitting}
          setValue={setValue} 
        setServices={setServices} 
        reset={reset}
        />
      </form>
    </>
  );
}
