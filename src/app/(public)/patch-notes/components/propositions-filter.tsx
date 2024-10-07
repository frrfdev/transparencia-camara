import React, { useState, useEffect, useRef, LegacyRef } from 'react';
import { motion } from 'framer-motion';
import { ComboBox } from '@/components/ui/combo';
import { cn } from '@/lib/utils';
import { Form } from '@/components/ui/form';
import { FormItem } from '@/components/ui/form-item';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

type Props = {
  onFilter: (filter: string) => void;
  isOpen: boolean;
};

export const PropositionsFilter = ({ onFilter, isOpen }: Props) => {
  const firstFieldRef = useRef<HTMLDivElement>(null);
  const form = useForm({
    defaultValues: {
      type: [],
    },
  });

  const [shouldHide, setShouldHide] = useState(true);

  const variants = {
    open: { right: '0' },
    closed: { right: '-40%' },
  };

  useEffect(() => {
    if (isOpen) setShouldHide(false);
  }, [isOpen]);

  return (
    <motion.div
      className={cn(
        shouldHide
          ? 'overflow-hidden h-0 w-0'
          : 'absolute h-[90%] p-4 top-0 overflow-hidden -right-[40%] w-[40%]  bg-red-600 border-l-[40px] drop-shadow-[rgba(17,_17,_26,_0.1)_-10px_0px_16px] border-red-700'
      )}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      onAnimationComplete={(a) => {
        if (a === 'close') {
          setShouldHide(true);
          firstFieldRef.current?.blur();
        }
        if (a === 'open') firstFieldRef.current?.focus();
      }}
      onAnimationStart={() => {
        const audio = new Audio('/assets/audio/slide.mp3');
        audio.volume = 0.01;
        audio.play();
      }}
    >
      <>
        <h1 className="text-4xl font-bold text-white">Filtro</h1>
        <Form
          onSubmit={form.handleSubmit((values) => console.log(values))}
          form={form}
        >
          <FormItem name="type" label="Tipo">
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
              onFocus={(e) => {
                console.log(e);
                const audio = new Audio('/assets/audio/focus.wav');
                audio.volume = 0.01;
                audio.play();
              }}
              ref={firstFieldRef as LegacyRef<HTMLInputElement>}
              placeholder="Tipo"
              className="rounded-full data-[focused=true]:bg-black  data-[focused=true]:text-white h-14 data-[focused=true]:placeholder:text-white data-[focused=true]:border-0"
              optionClassName="rounded-full data-[selected=true]:bg-black data-[checked=true]:bg-orange-500 data-[selected=true]:text-white"
            ></ComboBox>
            <Button>Sbumit</Button>
          </FormItem>
        </Form>
      </>
    </motion.div>
  );
};
