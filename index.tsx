import React from 'react';
import { SidebarProvider } from './sideBar';
import { NotificationProvider } from './notification';
import { SkeletonProvider } from './skeleton';
import { ControlProvider } from './serviceControl';

export function AppProvider({ children }: any) {
  return (
    <SkeletonProvider>
      <ControlProvider>
        <NotificationProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </NotificationProvider>
      </ControlProvider>
    </SkeletonProvider>
  );
}
