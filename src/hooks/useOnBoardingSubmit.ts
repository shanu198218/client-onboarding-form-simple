"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { OnboardingValues } from "../types/field.type";
import { SubmitHandler } from "react-hook-form";


export function useOnboardingSubmit() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<OnboardingValues | null>(null);


  const submitOnboardingForm: SubmitHandler<OnboardingValues> = useCallback(
    async (data) => {
      setServerError(null);
      setSuccessData(null);

      const url = process.env.NEXT_PUBLIC_ONBOARD_URL;
      if (!url) {
        setServerError("Missing NEXT_PUBLIC_ONBOARD_URL environment variable");
        return;
      }

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const msg = (await res.text()).slice(0, 200);
          throw new Error(`Request failed ${res.status}: ${msg}`);
        }

        toast.success("Form submitted successfully!");
        setSuccessData(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Network error";
        setServerError(message);
      }
    },
    []
  );

  return { submitOnboardingForm, serverError, successData } as const;
}

