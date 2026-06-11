import React, { createContext, useContext, useState } from 'react';

const ContactModalContext = createContext();

export const useContactModal = () => useContext(ContactModalContext);

export const ContactModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('standard'); // 'standard' or 'book-call'

  const openModal = (mode = 'standard') => {
    setModalMode(mode);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider value={{ isOpen, modalMode, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
};
