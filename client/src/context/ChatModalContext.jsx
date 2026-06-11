import React, { createContext, useContext, useState } from 'react';

const ChatModalContext = createContext();

export const useChatModal = () => useContext(ChatModalContext);

export const ChatModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChatModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ChatModalContext.Provider value={{ isOpen, openChatModal, closeModal }}>
      {children}
    </ChatModalContext.Provider>
  );
};

export default ChatModalContext;
