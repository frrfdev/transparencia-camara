'use client';

import React from 'react';
import { TabPropositionGeneralData } from './tab-proposition-general-data';
import { useMenuStore } from '../stores/use-menu-store';
import { propositionMenuButtons } from './proposition-menu';
import { TabPropositionVotingSessions } from './tab-proposition-voting-sessions';
import { TabPropositionAuthors } from './tab-proposition-authors';
import { TriangleBorder } from '@/components/ui/triangle-border';
import { motion } from 'framer-motion';

const variants = {
  start: {
    transform: 'translateX(-100%)',
  },
  end: {
    transform: 'translateX(0%)',
  },
};

export const PropositionTabs = () => {
  const activeIndex = useMenuStore((state) => state.activeIndex);

  return (
    <div className="w-full h-full overflow-hidden">
      <motion.div
        key={activeIndex}
        variants={variants}
        initial="start"
        animate="end"
        className="flex"
      >
        <span className="bg-black text-white text-xl font-bold min-w-[300px] bg-opacity-30 flex items-center justify-center">
          {propositionMenuButtons[activeIndex].label}
        </span>
        <TriangleBorder
          color="black"
          opacity={0.3}
          className="h-[40px] min-h-[40px] w-[40px] min-w-[40px]"
        />
      </motion.div>
      {propositionMenuButtons[activeIndex].value === 'general' ? (
        <TabPropositionGeneralData></TabPropositionGeneralData>
      ) : null}
      {propositionMenuButtons[activeIndex].value === 'votes' ? (
        <TabPropositionVotingSessions />
      ) : null}
      {propositionMenuButtons[activeIndex].value === 'authors' ? (
        <TabPropositionAuthors />
      ) : null}
    </div>
  );
};
