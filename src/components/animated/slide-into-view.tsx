'use client';

import React from 'react';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = MotionProps & {
  direction?: 'right' | 'left';
  shouldHide?: boolean;
  className?: string;
};

const variants = {
  right: { open: { translateX: '0' }, closed: { translateX: '100%' } },
  left: {
    open: { translateX: '0' },
    closed: { translateX: '-100%' },
  },
};

export const SlideIntoView = ({
  children,
  className,
  direction = 'right',
  shouldHide,
  ...props
}: Props) => {
  return (
    <AnimatePresence mode="wait">
      {shouldHide ? null : (
        <motion.div
          {...props}
          className={cn(
            'absolute z-50',
            direction === 'right' ? 'right-0' : 'left-0',
            className
          )}
          variants={variants[direction]}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{
            type: 'keyframes',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
