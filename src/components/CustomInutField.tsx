import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IInputFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  className?: string;
}

/**
 * Custom input field for react form hook with form validations
 * @param {IInputFieldProps}
 * @returns {JSX.Element}
 */
const InputField: React.FC<IInputFieldProps> = ({
  label,
  type = 'text',
  placeholder = '',
  register,
  error,
  className,
}): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 font-semibold">{label}</label>
      <input
        type={type}
        className={`bg-gray-50 w-full rounded-[4px] p-2.5 border ${error ? 'border-red-600 focus-visible:border-red-600' : 'border-gray-300'} ${className}`}
        placeholder={placeholder}
        {...register}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
