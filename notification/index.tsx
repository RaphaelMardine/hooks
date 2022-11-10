import React, { createContext, useState, useContext } from 'react';

interface NotificationContextData {
  toggleNotification(): void;
  isOpen: boolean;
}

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData);

function NotificationProvider({ children }: any) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    // eslint-disable-next-line
    <NotificationContext.Provider value={{ isOpen, toggleNotification: toggle }}>
      {children}
    </NotificationContext.Provider>
  );
}

function useNotification(): NotificationContextData {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within an NotificationProvider');
  }

  return context;
}

export { NotificationProvider, useNotification };
