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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      if (selectedPropositionId === proposition.id) {
        setTimeout(() => {
          console.log(document.activeElement);
          if (buttonRef.current !== document.activeElement) {
            buttonRef.current?.focus();
          }
        }, 10);
      }
    }
  }, [selectedPropositionId, proposition.id]);

  useEffect(() => {
    if (
      selectedPropositionId === proposition.id &&
      (audioRef.current?.paused || !audioRef.current)
    ) {
      const audio = new Audio('/assets/audio/focus.wav');
      audioRef.current = audio;
      audio.volume = 0.05;
      audio.play();
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
        detailRender={proposition.numero}
      >
        <div className="p-4 px-10 w-full">
          <span className="line-clamp-2 text-start w-full">
            {proposition.ementa !== ''
              ? proposition.ementa
              : 'Ementa não informada'}
          </span>
        </div>
      </PokemonButton>
    </div>
  );
};
