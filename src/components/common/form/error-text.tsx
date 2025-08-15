export default function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1 text-sm text-red-600">
      {children}
    </p>
  );
}
