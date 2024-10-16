import { ScrollMenu, ScrollMenuButton } from '@/components/ui/scroll-menu';
import { Album, Clock, GitCompareArrows, UsersRound, Vote } from 'lucide-react';
import React from 'react';

export const propositionMenuButtons = [
  {
    icon: <Album size={32} />,
    label: 'Geral',
    value: 'general',
  },
  {
    icon: <Vote size={36} />,
    label: 'Votos',
    value: 'votes',
  },
  {
    icon: <UsersRound size={32} />,
    label: 'Autores',
    value: 'authors',
  },
  {
    icon: <Clock size={32} />,
    label: 'Tramitações',
    value: 'tramitacoes',
  },
  {
    icon: <GitCompareArrows size={36} />,
    label: 'Relacionadas',
    value: 'relacionadas',
  },
];

export const PropositionMenu = () => {
  return (
    <ScrollMenu>
      {propositionMenuButtons.map((button) => (
        <ScrollMenuButton
          key={button.label}
          icon={button.icon}
        ></ScrollMenuButton>
      ))}
    </ScrollMenu>
  );
};
