import { useContext } from 'react';

import { AuthContext, IAuthContextProps } from '@/context/AuthContext';

/**
 * hooks to check authentication
 * @returns {IAuthContextProps}
 */
export const useAuth = (): IAuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
