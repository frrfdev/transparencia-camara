import React, { useState, useEffect, useRef, LegacyRef } from 'react';
import { motion } from 'framer-motion';
import { ComboBox } from '@/components/ui/combo';

type Props = {
  onFilter: (filter: string) => void;
  isOpen: boolean;
};

export const PropositionsFilter = ({ onFilter, isOpen }: Props) => {
  const [canHide, setCanHide] = useState(true);
  const firstFieldRef = useRef<HTMLDivElement>(null);

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
      onAnimationComplete={() =>
        !isOpen ? setCanHide(true) : firstFieldRef.current?.focus()
      }
      onAnimationStart={() => {
        const audio = new Audio('/assets/audio/slide.mp3');
        audio.volume = 0.01;
        audio.play();
      }}
    >
      <h1 className="text-4xl font-bold text-white">Filtro</h1>
      <div>
        <ComboBox
          options={[
            {
              label: 'Todos',
              value: 'all',
            },
            {
              label: 'Todos2',
              value: 'all2',
            },
          ]}
          onFocus={() => {
            const audio = new Audio('/assets/audio/focus.wav');
            audio.volume = 0.01;
            audio.play();
          }}
          ref={firstFieldRef as LegacyRef<HTMLInputElement>}
          placeholder="Tipo"
          className="rounded-full data-[focused=true]:bg-black  data-[focused=true]:text-white h-14 data-[focused=true]:placeholder:text-white data-[focused=true]:border-0"
          optionClassName="rounded-full data-[selected=true]:bg-black data-[checked=true]:bg-orange-500 data-[selected=true]:text-white"
        ></ComboBox>
      </div>
    </motion.div>
  );
};
