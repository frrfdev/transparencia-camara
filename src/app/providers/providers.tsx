'use client';

import React from 'react';
import { MenuProvider } from './menu-provider';
import { MessageProvider } from './message-provider';
import { CustomQueryClientProvider } from './custom-query-client-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MessageProvider>
      <CustomQueryClientProvider>
        <div className="h-screen overflow-hidden w-full flex flex-col">
          <MenuProvider>{children}</MenuProvider>
        </div>
      </CustomQueryClientProvider>
    </MessageProvider>
  );
}
