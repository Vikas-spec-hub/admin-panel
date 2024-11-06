import { Navigate } from 'react-router-dom';

import BackgroundImage from '@/assets/images/login_background.png';
import Image from '@/components/ui/image';
import LoveIcon from '@/assets/LoveIcon';
import { useAuth } from '@/hooks/useAuthentication';

import SiginForm from './components/SigninForm';

/**
 * LogIn Page
 * @returns {JSX.Element}
 */
export default function SignIn(): JSX.Element {
  const { currentUser } = useAuth();

  // If the user is authenticated, redirect them to the home page
  if (currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <section className="bg-white h-screen">
      <div className="flex h-screen ">
        <div className="w-full h-full relative  hidden lg:flex">
          <Image
            className="mx-auto hidden lg:flex object-fill h-full w-full"
            src={BackgroundImage}
            alt="illustration"
            width={1000}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-5xl uppercase">
            Your Logo
          </div>
        </div>
        <div className="w-full lg:w-[70%] 2xl:w-[60%]">
          <div className="flex w-full h-full  items-center justify-center mx-auto ">
            <div className="w-[380px] lg:w-full bg-white rounded-lg border lg:border-none py-12 ">
              <div className="px-10 lg:px-20">
                <div className="flex justify-center">
                  <LoveIcon />
                </div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center mt-3 ">
                  Login to Your Account
                </h1>
                <SiginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
