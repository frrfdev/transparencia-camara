import React, { useEffect, useRef } from 'react';
import { Proposition } from '../types/Proposition';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { usePropositionListStore } from '../stores/use-proposition-list-store';
import { PokemonButton } from '@/components/ui/pokemon-button';
type Props = {
  proposition: Proposition;
  isSelected?: boolean;
  isLoading?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const variants = {
  loading: {
    background: '#9333ea',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    width: '100%',
  },
  loaded: {
    background: 'transparent',
    animation: 'none',
    width: 0,
  },
};

export const PropositionButton = ({
  proposition,
  isSelected,
  isLoading,
  ...props
}: Props) => {
  const { selectedPropositionId } = usePropositionListStore();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      if (selectedPropositionId === proposition.id) {
        setTimeout(() => {
          if (buttonRef.current !== document.activeElement) {
            buttonRef.current?.focus();
          }
        }, 10);
      }
    }
  }, [selectedPropositionId, proposition.id]);

  return (
    <div className="w-full h-max relative">
      <PokemonButton
        ref={buttonRef}
        key={proposition.id}
        tabIndex={1}
        {...props}
        isSelected={!!isSelected}
        isLoading={!!isLoading}
        detailRender={
          <span className="text-sm">{`N° ${proposition.numero}`}</span>
        }
      >
        <div className="p-4 px-10 w-full">
          <span className="line-clamp-2 text-start w-full">
            {proposition.ementa !== ''
              ? `${proposition.ementa}`
              : 'Ementa não informada'}
          </span>
        </div>
      </PokemonButton>
    </div>
  );
};
