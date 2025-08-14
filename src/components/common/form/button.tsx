import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className || ""}`}
    >
      {isLoading ? "Submitting…" : children}
    </button>
  );
}
