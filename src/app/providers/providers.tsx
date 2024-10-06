'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MenuProvider } from './menu-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen overflow-hidden w-full flex flex-col">
        <MenuProvider>{children}</MenuProvider>
      </div>
    </QueryClientProvider>
  );
}
