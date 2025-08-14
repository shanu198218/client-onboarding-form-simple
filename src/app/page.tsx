
export default function Home() {
  return (
  <main className="min-h-dvh grid place-items-center">
      <div className="rounded-xl p-6 shadow border bg-brand-50">
        <h1 className="text-2xl font-semibold text-brand-700">
          Tailwind v4 + Next 15 ✅
        </h1>
        <p className="mt-2 text-brand-600">
          Custom brand color via @theme (bg-brand-50, text-brand-700).
        </p>
        <button className="mt-4 px-4 py-2 rounded-lg bg-brand-900 text-white hover:opacity-90">
          It works!
        </button>
      </div>
    </main>
  );
}
