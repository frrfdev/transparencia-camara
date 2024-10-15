import { DiagonalBackground } from '@/components/ui/diagonal-background';
import React from 'react';
import { PropositionMenu } from '../components/proposition-menu';
import { PropositionTabs } from '../components/proposition-tabs';

const PropositionPage = () => {
  return (
    <div className="w-full h-full">
      <DiagonalBackground direction="left" outerClassName="fill-lime-500" innerClassName="fill-lime-400">
        <div className="w-1/2 flex flex-col items-start pr-4">
          <div className="w-min">
            <PropositionMenu></PropositionMenu>
          </div>
          <PropositionTabs></PropositionTabs>
        </div>
      </DiagonalBackground>
    </div>
  );
};

export default PropositionPage;
