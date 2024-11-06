import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

import { auth } from '@/firebaseLib/firebase';

export interface IAuthContextProps {
  currentUser: User | null;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(
  undefined,
);

/**
 * Auth Provider
 * @returns
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // React state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // Clear user state after logging out
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // To check the session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
