'use client';

import React from 'react';
import {
  DiagonalBackgroundElement,
  DiagonalBackgroundElementProps,
} from '../backgrounds/diagonal-yellow';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type DiagonalBackgroundProps = {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  className?: string;
} & Pick<DiagonalBackgroundElementProps, 'outerClassName' | 'innerClassName'>;

export const DiagonalBackground = ({
  children,
  direction = 'right',
  outerClassName,
  innerClassName,
  className,
}: DiagonalBackgroundProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden ">
      <motion.div
        className={cn(
          'absolute top-0 h-full',
          direction === 'right'
            ? '-right-[100%]'
            : '-left-[100%] scale-x-[-1] scale-y-[-1]'
        )}
        animate={
          direction === 'right'
            ? {
                right: 0,
              }
            : {
                left: 0,
              }
        }
        onAnimationStart={() => {
          const audio = new Audio('/assets/audio/slide.mp3');
          audio.volume = 0.1;
          audio.play();
        }}
      >
        <DiagonalBackgroundElement
          className="w-auto h-full drop-shadow-[rgba(17,_17,_26,_0.1)_-10px_0px_16px]"
          outerClassName={outerClassName}
          innerClassName={innerClassName}
        ></DiagonalBackgroundElement>
      </motion.div>
      <div
        className={cn(
          'relative z-10 w-full h-full flex flex-col overflow-hidden',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
