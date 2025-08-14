import { UseFormRegisterReturn } from "react-hook-form";
import ErrorText from "./error-text";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  id: string;
  error?: string;
register: UseFormRegisterReturn; 
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  required? : boolean
}

export default function InputField({ label, id, error, register, props, required = false, placeholder }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}{required}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        type="text"
        {...register} 
        {...props}
        className="mt-1 placeholder:text-gray-400 placeholder:text-sm w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-white"
      />
     {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
