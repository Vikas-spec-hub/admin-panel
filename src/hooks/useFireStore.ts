import { useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
  WithFieldValue,
  getFirestore,
  getCountFromServer,
  Query,
} from 'firebase/firestore';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

import firebase_app from '@/firebaseLib/firebase';

// All firbase store method are in the this file
export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const db = getFirestore(firebase_app);

  /**
   * fetch Total Count of given collection
   * @param {string}collectionName
   * @returns
   */
  const fetchTotalCount = async (collectionName: string) => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  };

  // Fetch paginated documents from Firestore
  const getDocuments = async <T>(
    collectionName: string,
    pageNumber: number,
    limitPerPage: number,
    lastVisibleSnapshots: QueryDocumentSnapshot<DocumentData>[], // Type adjustment here
    orderField: string = 'createdAt',
  ): Promise<{
    documents: T[];
    lastVisible: QueryDocumentSnapshot<DocumentData> | null; // Ensure correct typing
    totalCount: number;
  }> => {
    const db = getFirestore();
    const ref = collection(db, collectionName);

    let q: Query<DocumentData>; // Explicitly type q to avoid undefined errors
    const totalCount = await fetchTotalCount(collectionName);

    if (pageNumber === 1) {
      // First page query
      q = query(ref, orderBy(orderField), limit(limitPerPage));
    } else if (lastVisibleSnapshots[pageNumber - 2]) {
      // Start after the last document of the previous page
      q = query(
        ref,
        orderBy(orderField),
        startAfter(lastVisibleSnapshots[pageNumber - 2]), // Ensure the correct type here
        limit(limitPerPage),
      );
    } else {
      throw new Error('No snapshot found for the previous page.');
    }

    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as T,
    );

    const lastVisible = querySnapshot.empty
      ? null
      : querySnapshot.docs[querySnapshot.docs.length - 1];

    return { documents, lastVisible, totalCount };
  };

  // Generic method to add a document
  const setDocument = async <T>(collectionName: string, data: T) => {
    try {
      setLoading(true);
      const colRef = collection(db, collectionName);
      await addDoc(colRef, data as WithFieldValue<DocumentData>);
    } catch (err) {
      setError('Error adding document');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Generic method to update a document
  const updateDocument = async <T>(
    collectionName: string,
    docId: string,
    data: Partial<T>,
  ) => {
    try {
      setLoading(true);
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data);
    } catch (err) {
      setError('Error updating document');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Generic method to delete a document
  const deleteDocument = async (collectionName: string, docId: string) => {
    try {
      setLoading(true);
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (err) {
      setError('Error deleting document');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchTotalCount,
    setDocument,
    updateDocument,
    deleteDocument,
    getDocuments,
    loading,
    error,
  };
};
