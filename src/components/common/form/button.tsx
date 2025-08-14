import React from "react";
import { variantClasses } from "../../../utils/color-utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  isLoading,
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center text-base rounded-md px-4 py-1.5 text-white disabled:opacity-60 focus:outline-none";

 

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${
        props.className || ""
      }`}
    >
      {isLoading ? "Submitting…" : children}
    </button>
  );
}
