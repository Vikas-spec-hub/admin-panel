import React from 'react';
import { Link } from 'react-router-dom';

import Image from '@/components/ui/image';
import notFound from '@/assets/images/notFound.jpg';

/**
 * Not found page
 * @returns {JSX.Element}
 */
const NotFound = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Image
        src={notFound}
        alt="Not Found"
        width={500}
        className="max-w-full h-auto mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
