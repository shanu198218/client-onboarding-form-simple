import { OnboardingValues } from '@/types/field.type';

export async function submitOnboardingApi(data: OnboardingValues) {
  const url = process.env.NEXT_PUBLIC_ONBOARD_URL;
  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_ONBOARD_URL environment variable');
  }

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

  return res.json().catch(() => null);
}
