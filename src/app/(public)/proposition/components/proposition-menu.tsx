'use client';

import { ScrollMenu, ScrollMenuButton } from '@/components/ui/scroll-menu';
import { Album, Clock, GitCompareArrows, UsersRound, Vote } from 'lucide-react';
import React from 'react';
import { useMenuStore } from '../stores/use-menu-store';
import { VotingSessionVisualizationMenu } from './voting-session-visualization-menu';

export const propositionMenuButtons = [
  {
    icon: <Album size={32} />,
    label: 'Dados Gerais',
    value: 'general',
  },
  {
    icon: <Vote size={36} />,
    label: 'Votações',
    value: 'votes',
  },
  {
    icon: <UsersRound size={32} />,
    label: 'Autores',
    value: 'authors',
  },
  // {
  //   icon: <Clock size={32} />,
  //   label: 'Tramitações',
  //   value: 'tramitacoes',
  //   disabled: true,
  // },
  // {
  //   icon: <GitCompareArrows size={36} />,
  //   label: 'Relacionadas',
  //   value: 'relacionadas',
  //   disabled: true,
  // },
];

export const PropositionMenu = () => {
  const activeIndex = useMenuStore((state) => state.activeIndex);

  return (
    <div className="w-full flex justify-between">
      <div className="w-min  pr-4">
        <ScrollMenu>
          {propositionMenuButtons.map((button) => (
            <ScrollMenuButton
              key={button.label}
              icon={button.icon}
              title={button.label}
            ></ScrollMenuButton>
          ))}
        </ScrollMenu>
      </div>
      {propositionMenuButtons[activeIndex].value === 'votes' ? (
        <div className="w-1/3">
          <VotingSessionVisualizationMenu />
        </div>
      ) : null}
    </div>
  );
};
