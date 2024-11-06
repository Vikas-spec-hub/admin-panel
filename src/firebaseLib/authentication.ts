import {
  getAuth,
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
  Unsubscribe,
  onAuthStateChanged,
  NextOrObserver,
  User,
  setPersistence,
  indexedDBLocalPersistence,
} from 'firebase/auth';

import { FirebaseService, IFirebaseConfig } from './firebase';

export class AuthenticationService {
  private _auth: Auth;

  constructor(config: IFirebaseConfig) {
    const service = new FirebaseService(config);

    this._auth = getAuth(service.getApp);
    setPersistence(this._auth, indexedDBLocalPersistence);
  }

  public async loginWithEmail(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    try {
      const add = await signInWithEmailAndPassword(this._auth, email, password);
      return add;
    } catch (error) {
      throw new Error(handleFirebaseError(error));
    }
  }

  public onAuthStateChange(callback: NextOrObserver<User>): Unsubscribe {
    return onAuthStateChanged(this._auth, callback);
  }
}

/**
 * Handled the error which coming from firebase auth
 * @param error
 * @returns {string}
 */
export const handleFirebaseError = (error: any): string => {
  switch (error.code) {
    case 'auth/claims-too-large':
      return 'Claims payload exceeds maximum size.';
    case 'auth/email-already-exists':
      return 'Email already in use.';
    case 'auth/id-token-expired':
      return 'ID token has expired.';
    case 'auth/id-token-revoked':
      return 'ID token has been revoked.';
    case 'auth/insufficient-permission':
      return 'Insufficient permission for this action.';
    case 'auth/internal-error':
      return 'Internal server error. Please try again.';
    case 'auth/invalid-argument':
      return 'Invalid argument provided.';
    case 'auth/invalid-claims':
      return 'Invalid custom claim attributes.';
    case 'auth/invalid-continue-uri':
      return 'Invalid continue URL.';
    case 'auth/invalid-credential':
      return 'Invalid credentials.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/invalid-password':
      return 'Password must be at least six characters.';
    case 'auth/operation-not-allowed':
      return 'Sign-in provider is disabled.';
    case 'auth/user-not-found':
      return 'User not found.';
    case 'auth/email-already-in-use':
      return 'User already exists.';
    case 'auth/too-many-requests':
      return 'Too many requests. Try again later.';
    default:
      return 'Something went wrong. Please try again.';
  }
};
