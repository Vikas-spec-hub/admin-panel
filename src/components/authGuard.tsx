import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuthentication';

interface IAuthWrapperProps {
  children: ReactNode;
}
/**
 * AuthWrapper restricts access to unauthorized users.
 * @param {IAuthWrapperProps}
 * @returns
 */
const AuthWrapper: React.FC<IAuthWrapperProps> = ({ children }) => {
  const { currentUser } = useAuth();

  // If current user is not then redirect to login page
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
