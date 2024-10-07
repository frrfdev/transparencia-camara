'use client';

import React from 'react';
import { DiagonalYellow } from '../backgrounds/diagonal-yellow';
import { motion } from 'framer-motion';

type DiagonalBackgroundProps = {
  children: React.ReactNode;
};

export const DiagonalBackground = ({ children }: DiagonalBackgroundProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden ">
      <motion.div
        className="absolute top-0 -right-[100%] h-full"
        animate={{
          right: 0,
        }}
        onAnimationStart={() => {
          const audio = new Audio('/assets/audio/slide.mp3');
          console.log(audio);
          audio.volume = 0.1;
          audio.play();
        }}
      >
        <DiagonalYellow className="w-auto h-full drop-shadow-[rgba(17,_17,_26,_0.1)_-10px_0px_16px]"></DiagonalYellow>
      </motion.div>
      <div className="relative z-10 w-full h-full flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
};
