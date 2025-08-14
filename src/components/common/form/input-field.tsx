import { UseFormRegisterReturn } from "react-hook-form";
import ErrorText from "./error-text";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
register: UseFormRegisterReturn; 
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function InputField({ label, id, error, register, props }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type="text"
        {...register} 
        {...props}
        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
     {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
