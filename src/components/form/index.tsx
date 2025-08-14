import OnBardingForm from '../on-boding-form';

export default function Form() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-2 text-brand-700 text-center font-semibold text-2xl font-semibold">Client Onboarding</h1>
        

        <OnBardingForm />

       
      </div>
    </main>
  );
}
