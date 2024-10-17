'use client';

import React from 'react';
import { TabPropositionGeneralData } from './tab-proposition-general-data';
import { useMenuStore } from '../stores/use-menu-store';
import { propositionMenuButtons } from './proposition-menu';
import { TabPropositionVotingSessions } from './tab-proposition-voting-sessions';
import { TabPropositionAuthors } from './tab-proposition-authors';

export const PropositionTabs = () => {
  const activeIndex = useMenuStore((state) => state.activeIndex);
  return (
    <div className="w-full h-full">
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
