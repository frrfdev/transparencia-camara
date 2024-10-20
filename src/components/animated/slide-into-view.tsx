'use client';

import React from 'react';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = MotionProps & {
  direction?: 'right' | 'left';
  shouldHide: boolean;
  className?: string;
};

const variants = {
  right: { open: { right: '0' }, closed: { right: '-100%' } },
  left: {
    open: { left: '0' },
    closed: { left: '-100%' },
  },
};

export const SlideIntoView = ({
  children,
  className,
  shouldHide,
  direction = 'right',
  ...props
}: Props) => {
  if (shouldHide) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...props}
        className={cn(
          shouldHide
            ? 'overflow-hidden h-0 w-0'
            : 'absolute h-min p-4 overflow-hidden z-50 w-full',
          className
        )}
        variants={variants[direction]}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
