import React, { useState } from 'react';
import { EyeClosedIcon, EyeIcon, LockKeyhole } from 'lucide-react';

import TextInputField from '@/components/ui/textInputField';

interface IPasswordInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  error?: string;
}

/**
 * Password Input field
 * @returns {JSX.Element}
 */
const PasswordInput: React.FC<IPasswordInputProps> = (
  IProps: IPasswordInputProps,
) => {
  // default value if values not assign
  const {
    id = 'password',
    name = 'password',
    placeholder = 'Password',
  } = IProps;

  //React State
  const [isVisible, setIsVisible] = useState(false);

  /**
   * To toggle the eye icon in the password field
   */
  const togglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <TextInputField
      type={isVisible ? 'text' : 'password'}
      name={name}
      id={id}
      placeholder={placeholder}
      required
      startIcon={<LockKeyhole />}
      endIcon={
        <div className="cursor-pointer" onClick={togglePasswordVisibility}>
          {isVisible ? <EyeClosedIcon /> : <EyeIcon />}
        </div>
      }
    />
  );
};

export default PasswordInput;
