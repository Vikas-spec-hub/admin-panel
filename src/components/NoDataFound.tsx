import React from 'react';

import NoDataFoundImage from '@/assets/images/empty-box.png';

/**
 * No Data Found Component
 * @returns {JSX.Element}
 */
export const NoDataFound = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-16">
        <img width={200} height={200} src={NoDataFoundImage} />
        <div className="flex flex-col items-center mt-4">
          <p className="text-2xl font-bold">No Data Found</p>
        </div>
      </div>
    </>
  );
};
export default React.memo(NoDataFound);
