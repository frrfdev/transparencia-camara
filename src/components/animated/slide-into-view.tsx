import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = MotionProps & {
  shouldHide: boolean;
  isOpen: boolean;
  className?: string;
};

const variants = {
  open: { right: '0' },
  closed: { right: '-40%' },
};

export const SlideIntoView = ({
  children,
  className,
  shouldHide,
  isOpen,
  ...props
}: Props) => {
  return (
    <motion.div
      {...props}
      className={cn(
        shouldHide
          ? 'overflow-hidden h-0 w-0'
          : 'absolute h-full p-4 top-0 overflow-hidden z-50 -right-[40%] w-[40%] bg-red-600 border-l-[40px] drop-shadow-[rgba(17,_17,_26,_0.1)_-10px_0px_16px] border-red-700',
        className
      )}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
