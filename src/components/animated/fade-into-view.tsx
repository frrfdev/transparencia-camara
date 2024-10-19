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
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

export const FadeIntoView = ({
  children,
  className,
  shouldHide,
  ...props
}: Props) => {
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
        variants={variants}
        transition={{ duration: 1 }}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
