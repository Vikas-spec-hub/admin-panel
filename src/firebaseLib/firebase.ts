import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@/lib/environment';

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase auth
const auth = getAuth(app);

export { auth };

const firebase_app = getApps().length === 0 ? app : getApps()[0];

export default firebase_app;

export interface IFirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

export class FirebaseService {
  private _firebaseApp: FirebaseApp;

  public get getApp(): FirebaseApp {
    return this._firebaseApp;
  }

  constructor(config: IFirebaseConfig) {
    const app = initializeApp(config);
    this._firebaseApp = getApps().length === 0 ? app : getApps()[0];
  }
}
