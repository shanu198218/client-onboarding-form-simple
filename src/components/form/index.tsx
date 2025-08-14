import OnBardingForm from '../on-boding-form';

export default function Form() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-1 text-2xl font-semibold">Client Onboarding</h1>
        <p className="mb-6 text-sm text-gray-600">
          Fill the form and submit. Endpoint is configurable via{' '}
          <code>NEXT_PUBLIC_ONBOARD_URL</code>.
        </p>

        <OnBardingForm />

        <p className="mt-6 text-xs text-gray-500">
          Tip: Try prefill with <code>?service=UI%2FUX</code> in the URL.
        </p>
      </div>
    </main>
  );
}
