import React from 'react';

import coming_soon from '@/assets/images/coming-soon.png';

/**
 * Coming Soon Component
 * @returns {JSX.Element}
 */
export const ComingSoon = (): JSX.Element => {
  return (
    <>
      <div className="flex items-center justify-center">
        <img width={200} height={200} src={coming_soon} />
      </div>
    </>
  );
};
export default ComingSoon;
