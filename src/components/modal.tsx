import ReactDOM from 'react-dom';
import React, { FC, ReactNode } from 'react';
import { X } from 'lucide-react';

import Line from '@/assets/Line';
import { useModal } from '@/hooks/useModal';

interface IModalProps {
  title: string;
  children: ReactNode;
}

/**
 * Comman modal component
 * @param {IModalProps}
 *  @returns {JSX.Element | null}
 */
export const Modal: FC<IModalProps> = ({
  title,
  children,
}: IModalProps): JSX.Element | null => {
  const { modalId, closeModal } = useModal();
  if (!modalId) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white px-8 py-6 rounded shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <X className="cursor-pointer" onClick={closeModal} />
        </div>
        <div className="overflow-hidden mb-4">
          <Line />
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')!,
  );
};

export default Modal;
