import React, { forwardRef, useEffect, useRef } from 'react';
import { ButtonProps } from './button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type PokemonButtonProps = {
  isSelected?: boolean;
  isLoading?: boolean;
  detailRender?: React.ReactNode;
  color?: string;
  skeletonColor?: string;
} & ButtonProps;

export const PokemonButton = forwardRef<HTMLButtonElement, PokemonButtonProps>(
  (
    {
      isSelected,
      isLoading,
      children,
      detailRender,
      color = '#9333ea',
      skeletonColor = '#9333ea',
      onFocus,
      ...props
    },
    ref
  ) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const variants = {
      loading: {
        background: color,
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        width: '100%',
      },
      loaded: {
        background: 'transparent',
        animation: 'none',
        width: 0,
      },
    };

    useEffect(() => {
      if (isSelected && (audioRef.current?.paused || !audioRef.current)) {
        const audio = new Audio('/assets/audio/focus.wav');
        audioRef.current = audio;
        audio.volume = 0.05;
        audio.play();
      }
    }, [isSelected]);

    return (
      <button
        ref={ref}
        data-selected={isSelected}
        onFocus={(e) => {
          onFocus?.(e);
          if (!isSelected) {
            const audio = new Audio('/assets/audio/focus.wav');
            audioRef.current = audio;
            audio.volume = 0.05;
            audio.play();
          }
        }}
        className={cn(
          'font-medium w-full group/button relative overflow-hidden flex h-[80px] items-center rounded-full bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:bg-purple-200 transition-all pr-4',
          'focus:bg-gradient-to-r from-neutral-950 to-neutral-900 focus:text-white focus:font-bold',
          'data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-neutral-950 data-[selected=true]:to-neutral-900 data-[selected=true]:text-white data-[selected=true]:font-bold'
        )}
        {...props}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex items-center overflow-hidden"
          style={{ background: color }}
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
          <div
            className="h-full w-full"
            style={{ background: skeletonColor }}
          ></div>

          <svg
            className="inset-0 h-full min-w-[40px] w-[40px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 100"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 40,0 0,100" fill={skeletonColor} />
          </svg>
        </motion.div>
        {isLoading ? null : (
          <>
            <div
              className="flex h-full items-center pl-4 rounded-bl-full rounded-tl-full"
              style={{ background: color }}
            >
              <span className="font-bold min-w-[60px] max-w-[60px] w-[60px] text-white flex justify-center items-center text-center">
                {detailRender}
              </span>
            </div>
            <svg
              className="inset-0 h-full min-w-[40px] w-[40px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 100"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 40,0 0,100" fill={color} />
            </svg>
            {children}
          </>
        )}
      </button>
    );
  }
);

PokemonButton.displayName = 'PokemonButton';
