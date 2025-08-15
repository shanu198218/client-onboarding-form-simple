import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { OnboardingValues } from '@/types/field.type';
import { SubmitHandler } from 'react-hook-form';
import { submitOnboardingApi } from '@/components/api/onboarding';

export function useOnboardingSubmit(reset: () => void) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<OnboardingValues | null>(null);

  const submitOnboardingForm: SubmitHandler<OnboardingValues> = useCallback(
    async (data) => {
      setServerError(null);
      setSuccessData(null);

      try {
        const responseData = await submitOnboardingApi(data);
        toast.success(responseData?.message || 'Form submitted successfully!');
        setSuccessData(data);
        reset();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Network error';
        setServerError(message);
        toast.error(message || 'Please try again later');
      }
    },
    [reset],
  );

  return { submitOnboardingForm, serverError, successData } as const;
}
