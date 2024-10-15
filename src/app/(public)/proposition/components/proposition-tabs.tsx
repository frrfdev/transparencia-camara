'use client';

import React from 'react';
import { PropositionGeneralData } from './proposition-general-data';
import { useMenuStore } from '../stores/use-menu-store';
import { propositionMenuButtons } from './proposition-menu';

export const PropositionTabs = () => {
  const activeIndex = useMenuStore((state) => state.activeIndex);
  return (
    <div className="w-full">
      {propositionMenuButtons[activeIndex].value === 'general' ? (
        <PropositionGeneralData></PropositionGeneralData>
      ) : null}
    </div>
  );
};
