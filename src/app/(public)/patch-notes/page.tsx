import React, { Suspense } from 'react';
import { PropositionsList } from './components/propositions.list';
import { ScrollText } from 'lucide-react';
import { DiagonalBackground } from '@/components/ui/diagonal-background';

const PatchNotes = () => {
  return (
    <div className="h-full w-full overflow-hidden bg-main-bg">
      <DiagonalBackground>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex w-full p-4 pb-1 gap-4 items-center">
            <ScrollText size={50} />
            <h1 className="text-4xl font-bold">Patch Notes</h1>
          </div>
          <PropositionsList></PropositionsList>
        </Suspense>
      </DiagonalBackground>
    </div>
  );
};

export default PatchNotes;
