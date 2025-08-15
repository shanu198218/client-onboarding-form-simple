import { UseFormRegisterReturn } from 'react-hook-form';
import ErrorText from './error-text';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  id: string;
  error?: string;
  register: UseFormRegisterReturn;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  required?: boolean;
  type: string;
}

export default function InputField({
  label,
  id,
  error,
  register,
  props,
  required = false,
  placeholder,
  type,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
        {required}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        {...register}
        {...props}
        className="mt-1 w-full rounded-md border border-gray-300 p-2 placeholder:text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
