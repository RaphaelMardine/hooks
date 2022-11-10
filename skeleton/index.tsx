import React, { createContext, useState, useContext } from 'react';

interface SkeletonContextData {
  showLoading(): void;
  hideLoading(): void;
  isLoading: boolean;
}

const SkeletonContext = createContext<SkeletonContextData>({} as SkeletonContextData);

function SkeletonProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState(false);

  function showLoading() {
    setIsLoading(true);
  }

  function hideLoading() {
    setIsLoading(false);
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SkeletonContext.Provider value={{ isLoading, showLoading, hideLoading }}>{children}</SkeletonContext.Provider>
  );
}

function useSkeleton(): SkeletonContextData {
  const context = useContext(SkeletonContext);

  if (!context) {
    throw new Error('useSkeleton must be used within an NotificationProvider');
  }

  return context;
}

export { SkeletonProvider, useSkeleton };
