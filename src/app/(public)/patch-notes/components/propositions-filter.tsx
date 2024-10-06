import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Props = {
  onFilter: (filter: string) => void;
  isOpen: boolean;
};

export const PropositionsFilter = ({ onFilter, isOpen }: Props) => {
  const [canHide, setCanHide] = useState(true);

  const variants = {
    open: { right: 0 },
    closed: { right: '-100%' },
  };

  useEffect(() => {
    if (isOpen) {
      setCanHide(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (canHide) return null;

  return (
    <motion.div
      className="absolute p-4 top-0 -right-full h-full w-[calc(50%-40px)] bg-red-600 border-l-[40px] drop-shadow-[rgba(17,_17,_26,_0.1)_-10px_0px_16px] border-red-700"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      onAnimationEnd={() => !isOpen && setCanHide(true)}
      onAnimationStart={() => {
        const audio = new Audio('/assets/audio/slide.mp3');
        audio.volume = 0.1;
        audio.play();
      }}
    >
      <h1 className="text-4xl font-bold text-white">Filtro</h1>
    </motion.div>
  );
};
