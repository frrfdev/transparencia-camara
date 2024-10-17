import React from 'react';
import { PropositionTab } from './proposition-tab';
import { Skeleton } from '@/components/ui/skeleton';

export const TabPropositionGeneralDataSkeleton = () => {
  return (
    <PropositionTab className="w-full flex gap-4 overflow-hidden h-full">
      <div className="w-1/2 flex flex-col gap-4 pt-4">
        <div className="flex flex-col">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <Skeleton className="h-12 w-1/2 bg-gray-300" />
              <Skeleton className="h-12 w-1/2 bg-gray-200" />
            </div>
          ))}
        </div>
        <div>
          <Skeleton className="h-12 w-full bg-gray-300" />
          <Skeleton className="h-24 w-full bg-gray-200" />
        </div>
      </div>
      <div className="w-1/2 overflow-hidden h-full p-4">
        <Skeleton className="h-full w-full bg-gray-200" />
      </div>
    </PropositionTab>
  );
};
