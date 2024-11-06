import React from 'react';

/**
 *
 * @param {string} className
 * @returns
 */
const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-20 h-20 inline-block text-red animate-spin rounded-full border-4 border-solid border-current border-r-transparent ${className}`}
    ></div>
  );
};
export default React.memo(Loading);
