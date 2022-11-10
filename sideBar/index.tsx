import React, { createContext, useState, useContext } from 'react';

interface SideContextData {
  toggleSidebar(): void;
  isOpen: boolean;
}

const SideContext = createContext<SideContextData>({} as SideContextData);

function SidebarProvider({ children }: any) {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen(!isOpen);
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <SideContext.Provider value={{ isOpen, toggleSidebar: toggle }}>{children}</SideContext.Provider>;
}

function useSidebar(): SideContextData {
  const context = useContext(SideContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { SidebarProvider, useSidebar };
