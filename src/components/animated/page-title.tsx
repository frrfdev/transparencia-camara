'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  title: string;
};

export const PageTitle = ({ title }: Props) => {
  return null;
  return (
    <motion.div
      className="absolute inline-block z-20 top-0 right-1/2 transform -translate-x-1/2  text-2xl  shadow-soft text-white font-bold uppercase py-2 px-6 bg-neutral-900"
      initial={{ transform: 'translate(50%, -100%)' }}
      animate={{ transform: 'translate(50%, 0)' }}
      exit={{ transform: 'translate(50%, -100%)' }}
    >
      {title}
    </motion.div>
  );
};
