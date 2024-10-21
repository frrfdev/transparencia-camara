'use client';

import React, { useMemo } from 'react';
import { useMessageContext } from './message-provider';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: React.ReactNode;
};

export const CustomQueryClientProvider = ({ children }: Props) => {
  const { addMessage } = useMessageContext();

  const queryClient = useMemo(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          addMessage({
            content: error.message,
          });
          return true;
        },
      }),
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
