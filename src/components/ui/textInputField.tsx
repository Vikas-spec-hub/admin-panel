import React, { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  name: string;
  id: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  label?: string;
}

/**
 * @function Custom textfield
 * @param {InputProps} param0
 * @returns {JSX.Element}
 */
const TextInputField: React.FC<InputProps> = ({
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
  required,
  startIcon,
  endIcon,
  className,
  label,
}): JSX.Element => {
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {label}
        </label>
      )}
      {startIcon && (
        <div
          className={`absolute mx-2 left-2 w-6 flex align-middle items-center ${label ? 'top-[42px]' : 'top-[14px]'}`}
        >
          {startIcon}
        </div>
      )}
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-base ${startIcon ? 'pl-12' : ''} ${endIcon ? 'pr-12' : ''} rounded-[4px] focus:ring-primary-600 leading-8 focus:border-primary-600 block w-full p-2.5 ${className}`}
      />
      {endIcon && (
        <div
          className={`absolute mx-2 right-1 ${label ? 'top-[40px]' : 'top-[11px]'}`}
        >
          {endIcon}
        </div>
      )}
    </div>
  );
};

export default TextInputField;
