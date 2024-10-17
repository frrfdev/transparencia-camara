'use client';

import React from 'react';
import { PropositionTab } from './proposition-tab';
import { Skeleton } from '@/components/ui/skeleton';

export const TabPropositionVotingSessionsSkeleton = () => {
  return (
    <PropositionTab className="p-4 flex gap-4 overflow-hidden h-full">
      <div className="w-1/2 h-full flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="w-full rounded-full h-[100px]" />
        ))}
      </div>
    </PropositionTab>
  );
};
