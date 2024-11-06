import React from 'react';
import { Trash2 } from 'lucide-react';

import { useModal } from '@/hooks/useModal';

import Modal from './modal';

interface IDeleteConfirmationModelProps {
  handleDelete: () => void;
  model_id: string;
}

/**
 * Comman Delete Confirmation Model , based on the id
 * @param {IDeleteConfirmationModelProps}
 * @returns {JSX.Element}
 */
export const DeleteConfirmationModel = ({
  handleDelete,
  model_id,
}: IDeleteConfirmationModelProps): JSX.Element => {
  const { modalId, closeModal } = useModal();

  return (
    <>
      <Modal title={'Delete Confirmation Model'}>
        {modalId === model_id && (
          <>
            <div className="mt-8 flex items-center justify-center flex-col">
              <Trash2 className="h-10 w-10" />
              <p className="text-center text-lg mt-2">
                Are you sure you want to delete it ?
              </p>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={closeModal}
                className="mr-2 px-4 py-2 bg-white border border-black rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-8 py-2 bg-black text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
export default DeleteConfirmationModel;
