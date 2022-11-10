import React, { createContext, useState, useContext } from 'react';

interface ServiceControlContextData {
  setData(param: object): void;
  cleanData(): void;
  state: object;
}

const ServiceControlContext = createContext<ServiceControlContextData>({} as ServiceControlContextData);

function ControlProvider({ children }: any) {
  const [state, setState] = useState({});

  function setData(data: object) {
    setState(data);
  }

  function cleanData() {
    setState({});
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ServiceControlContext.Provider value={{ state, setData, cleanData }}>{children}</ServiceControlContext.Provider>
  );
}

function useServiceControl(): ServiceControlContextData {
  const context = useContext(ServiceControlContext);

  if (!context) {
    throw new Error('useServiceControl must be used within an serviceControl');
  }

  return context;
}

export { ControlProvider, useServiceControl };
