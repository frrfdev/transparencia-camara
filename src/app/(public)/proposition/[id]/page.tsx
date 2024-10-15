import { DiagonalBackground } from '@/components/ui/diagonal-background';
import { useRouter } from 'next/router';
import React from 'react';
import { ScrollMenu, ScrollMenuButton } from '../components/scroll-menu';
import { Album, BadgeDollarSign, Clock, GitCompareArrows, Medal, Vote } from 'lucide-react';

const PROPOSITION_ID = 2462405;

const PropositionPage = () => {
  return (
    <div className="w-full h-full">
      <DiagonalBackground direction="left" outerClassName="fill-lime-500" innerClassName="fill-lime-400">
        <div className="w-1/2 flex justify-start pr-4">
          <div className="w-min">
            <ScrollMenu>
              <ScrollMenuButton icon={<Album size={32} />}></ScrollMenuButton>
              <ScrollMenuButton icon={<Vote size={36} />}></ScrollMenuButton>
              <ScrollMenuButton icon={<Clock size={32} />}></ScrollMenuButton>
              <ScrollMenuButton icon={<GitCompareArrows size={36} />}></ScrollMenuButton>
            </ScrollMenu>
          </div>
        </div>
      </DiagonalBackground>
    </div>
  );
};

export default PropositionPage;
