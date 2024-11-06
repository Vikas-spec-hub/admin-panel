import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextProps {
  modalId: string;
  isEdit: boolean;
  openModal: (id: string) => void;
  closeModal: () => void;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setData: (data: any) => void;
  data: any;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalId, setModelId] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const openModal = (id: string) => setModelId(id);

  const closeModal = () => {
    setIsEdit(false);
    setModelId('');
    setData(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isEdit,
        modalId,
        openModal,
        setIsEdit,
        closeModal,
        setData,
        data,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
};
