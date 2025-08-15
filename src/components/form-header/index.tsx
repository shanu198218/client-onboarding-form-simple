import { Suspense } from 'react';
import OnBardingForm from '../on-boding-form';

export default function Form() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow">
        <h1 className="text-brand-700 mb-2 text-center text-2xl font-semibold capitalize">
          Client Onboarding form
        </h1>

        <Suspense fallback={<div>Loading...</div>}>
          <OnBardingForm />
        </Suspense>
      </div>
    </main>
  );
}
