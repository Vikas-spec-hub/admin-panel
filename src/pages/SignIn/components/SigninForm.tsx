import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

import { LOGIN_SUCCESSFULLY } from '@/constants/snackbarMessage';
import TextInputField from '@/components/ui/textInputField';
import CustomLoader from '@/components/ui/customLoader';
import { Button } from '@/components/ui/button';
import { firebaseConfig, FirebaseService } from '@/firebaseLib/firebase';
import { handleFirebaseError } from '@/firebaseLib/authentication';
import PasswordInput from '@/components/passwordInput';

/**
 *SignInForm component
 * @return {JSX.Element}
 */
const SiginForm: React.FC = (): JSX.Element => {
  // React states
  const [isLoading, setIsLoading] = useState(false);

  // Hookds
  const router = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  /**
   * handle Form Submit
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    const fireBase = new FirebaseService(firebaseConfig);
    const auth = getAuth(fireBase.getApp);
    setIsLoading(true);
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const idToken = await userCredential.user.getIdToken();
      if (idToken?.length && userCredential?.user) {
        enqueueSnackbar(LOGIN_SUCCESSFULLY, { variant: 'success' });
        router('/');
      }
    } catch (error: any) {
      const errorMsg = handleFirebaseError(error);
      enqueueSnackbar(errorMsg, { variant: 'error' });
      console.error(
        'Error occured in login form while submitting',
        JSON.stringify(error),
      );
    }
    setIsLoading(false);
  }

  return (
    <>
      <form className="" onSubmit={handleFormSubmit}>
        <div className="mt-10">
          <p className="mb-1">
            Email Id<span className="text-red-500">*</span>
          </p>
          <TextInputField
            type="email"
            name="email"
            id="email"
            placeholder="name@company.com"
          />
        </div>
        <div className="mt-5">
          <p className="mb-1">
            Password<span className="text-red-500">*</span>
          </p>
          <PasswordInput />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-full mt-7 rounded-[4px] text-white focus:bg-primary-800 bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-md px-5 py-3 text-center relative"
        >
          Sign In
          <CustomLoader
            isLoading={isLoading}
            className="absolute  text-white m-auto"
          />
        </Button>
      </form>
    </>
  );
};

export default React.memo(SiginForm);
