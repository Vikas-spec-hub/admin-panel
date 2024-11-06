import React from 'react';

import somethingWentWrongImage from '@/assets/images/wrong.png';

/**
 * Error Component for the error boundry
 * @returns {JSX.Element }
 */
const ErrorComponent = (): JSX.Element => {
  return (
    <>
      <div className="flex justify-center items-center flex-col p-8">
        <img width={100} height={100} src={somethingWentWrongImage} />
        <h2 className="mt-4 text-2xl text-center">
          Oops! Something went wrong.
        </h2>
        <p className="mt-4 text-center">
          We're sorry, but something went wrong on our end. Please try
          refreshing the page, or come back later.
        </p>
        <p className="text-center">
          If the problem persists, feel free to contact our support team for
          assistance.
        </p>
        <button
          className="text-white mt-4"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    </>
  );
};
export default ErrorComponent;
