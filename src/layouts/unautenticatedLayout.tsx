import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Unauthenticated pages Layout
 * @returns {JSX.Element}
 */
const UnauthenticatedLayout: React.FC = (): JSX.Element => {
  return (
    <div>
      {/* Outlet will render the unauthenticated pages */}
      <Outlet />
    </div>
  );
};

export default UnauthenticatedLayout;
