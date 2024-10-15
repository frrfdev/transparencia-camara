import { DiagonalBackground } from '@/components/ui/diagonal-background';
import { useRouter } from 'next/router';
import React from 'react';
import { ScrollMenu, ScrollMenuButton } from '../components/scroll-menu';
import { BadgeDollarSign, Medal } from 'lucide-react';

const PROPOSITION_ID = 2462405;

const PropositionPage = () => {
  return (
    <div className="w-full h-full">
      <DiagonalBackground
        direction="left"
        outerClassName="fill-lime-500"
        innerClassName="fill-lime-400"
      >
        <div className="w-1/2 flex justify-start pr-4">
          <div className="w-min">
            <ScrollMenu>
              <ScrollMenuButton icon={<Medal size={36} />}></ScrollMenuButton>
              <ScrollMenuButton icon={<Medal size={36} />}></ScrollMenuButton>
              <ScrollMenuButton icon={<Medal size={36} />}></ScrollMenuButton>
              <ScrollMenuButton icon={<Medal size={36} />}></ScrollMenuButton>
              <ScrollMenuButton icon={<Medal size={36} />}></ScrollMenuButton>
              <ScrollMenuButton
                icon={<BadgeDollarSign size={40} />}
              ></ScrollMenuButton>
            </ScrollMenu>
          </div>
        </div>
      </DiagonalBackground>
    </div>
  );
};

export default PropositionPage;
