import React from 'react';
import { Proposition } from '../types/Proposition';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
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
  return (
    <div className="w-full h-max relative">
      <button
        className={cn(
          'font-medium w-full relative overflow-hidden flex h-[80px] items-center rounded-full bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:bg-purple-200',
          'focus:bg-gradient-to-r from-neutral-950 to-neutral-900 focus:text-white focus:font-bold',
          isSelected &&
            'bg-gradient-to-r from-neutral-950 to-neutral-900 text-white font-bold'
        )}
        key={proposition.id}
        tabIndex={1}
        {...props}
      >
        <motion.div
          className="absolute top-0 left-0 w-full bg-purple-600 h-full flex items-center"
          variants={variants}
          animate={isLoading ? 'loading' : 'loaded'}
          transition={{
            type: 'tween',
            background: {
              duration: 0,
            },
            animation: {
              duration: 0,
            },
            width: {
              durantion: 1,
            },
          }}
        >
          <div className="h-full w-full bg-purple-600"></div>

          <svg
            className="inset-0 h-full min-w-[40px] w-[40px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 100"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 40,0 0,100" fill="#9333ea" />
          </svg>
        </motion.div>
        {isLoading ? null : (
          <>
            <div className="flex h-full items-center pl-4 bg-purple-600 rounded-bl-full rounded-tl-full">
              <span className="font-bold min-w-[60px] max-w-[60px] w-[60px] text-white text-center">
                {proposition.numero}
              </span>
            </div>
            <svg
              className="inset-0 h-full min-w-[40px] w-[40px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 100"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 40,0 0,100" fill="#9333ea" />
            </svg>
            <div className="p-4 px-10 w-full">
              <span className="line-clamp-2 text-start w-full">
                {proposition.ementa !== ''
                  ? proposition.ementa
                  : 'Ementa não informada'}
              </span>
            </div>
          </>
        )}
      </button>
    </div>
  );
};
