import { firebaseConfig } from '@/firebaseLib/firebase';
import { StorageService } from '@/firebaseLib/storage';

export const useFirebaseStorage = () => {
  const storage = new StorageService(firebaseConfig);

  const uploadMedia = async (file: File, path: string) => {
    try {
      return await storage.uploadFile(file, path);
    } catch (error) {
      console.error(error);
    }
  };

  return { uploadMedia };
};
