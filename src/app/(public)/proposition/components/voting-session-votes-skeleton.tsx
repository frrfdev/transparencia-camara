import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const VotingSessionVotesSkeleton = () => {
  return (
    <Skeleton className="bg-gray-200 relative w-1/2 p-4 h-full overflow-y-auto rounded-md" />
  );
};
