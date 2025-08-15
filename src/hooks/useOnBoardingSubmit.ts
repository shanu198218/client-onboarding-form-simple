import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { OnboardingValues } from '../types/field.type';
import { SubmitHandler } from 'react-hook-form';

export function useOnboardingSubmit(reset : () => void) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<OnboardingValues | null>(null);

  const submitOnboardingForm: SubmitHandler<OnboardingValues> = useCallback(async (data) => {
    setServerError(null);
    setSuccessData(null);

    const url = process.env.NEXT_PUBLIC_ONBOARD_URL;
    if (!url) {
      setServerError('Missing NEXT_PUBLIC_ONBOARD_URL environment variable');
      return;
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let errorMessage = `Request failed ${res.status}`;
        try {
          const json = await res.json();
          if (json?.message) errorMessage += `: ${json.message}`;
        } catch {
          const text = await res.text();
          errorMessage += `: ${text.slice(0, 200)}`;
        }
        throw new Error(errorMessage);
      }

      const responseData = await res.json().catch(() => null);
      toast.success(responseData?.message || 'Form submitted successfully!');
      setSuccessData(data);
      reset()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error';
      setServerError(message);
      toast.error(message || "Please try again letter")
    }
  }, [reset]);

  return { submitOnboardingForm, serverError, successData } as const;
}
