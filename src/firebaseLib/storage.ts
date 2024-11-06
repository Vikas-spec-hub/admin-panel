import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  FirebaseStorage,
} from 'firebase/storage';

import { FirebaseService, IFirebaseConfig } from './firebase';

export class StorageService {
  storage: FirebaseStorage;

  constructor(config: IFirebaseConfig) {
    const service = new FirebaseService(config);
    this.storage = getStorage(service.getApp);
  }

  async uploadFile(file: File, path: string): Promise<string | undefined> {
    const storageRef = ref(this.storage, path);
    try {
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    } catch (error) {
     console.error(
       'error: occured while uploading file in filebase ',
       JSON.stringify(error),
     );
    }
  }

  async deleteFile(path: string): Promise<void> {
    const storageRef = ref(this.storage, path);
    await deleteObject(storageRef);
  }

  async getFileUrl(path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    return getDownloadURL(storageRef);
  }
}
