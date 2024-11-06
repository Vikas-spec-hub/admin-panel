import * as React from 'react';

interface CustomLoaderProps {
  className?: string;
  isLoading: boolean;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({
  className = '',
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <svg
          className={`animate-spin h-5 w-5 text-black ${className}`}
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-100"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      ) : null}
    </>
  );
};

export default CustomLoader;
