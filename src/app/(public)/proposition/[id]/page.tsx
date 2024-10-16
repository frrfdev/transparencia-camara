import { DiagonalBackground } from '@/components/ui/diagonal-background';
import React from 'react';
import { PropositionMenu } from '../components/proposition-menu';
import { PropositionTabs } from '../components/proposition-tabs';
import { PropositionText } from '../components/proposition-text';

const PropositionPage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <DiagonalBackground
        className="flex-grow"
        direction="left"
        outerClassName="fill-lime-500"
        innerClassName="fill-lime-400"
      >
        <div className="flex flex-col h-full pb-6">
          <div className="w-min  pr-4">
            <PropositionMenu />
          </div>
          <div className="flex gap-4 h-full overflow-hidden">
            <div className="w-full overflow-y-auto">
              <PropositionTabs />
            </div>
          </div>
        </div>
      </DiagonalBackground>
    </div>
  );
};

export default PropositionPage;
