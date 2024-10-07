import React, { useState, useEffect, useRef, LegacyRef } from 'react';
import { motion } from 'framer-motion';
import { ComboBox } from '@/components/ui/combo';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPortal } from 'react-dom';
import { useGetPropositionTypesQuery } from '../hooks/api/use-get-proposition-types.query';
import { DataConverter } from '@/lib/converter';

const formSchema = z.object({
  typeAcronym: z.array(z.string()).nullable(),
});

type Props = {
  onFilter: (filter: z.infer<typeof formSchema>) => void;
  isOpen: boolean;
};

export const PropositionsFilter = ({ onFilter, isOpen }: Props) => {
  const firstFieldRef = useRef<HTMLDivElement>(null);
  const [shouldHide, setShouldHide] = useState(true);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  const { data: propositionTypes, isLoading } = useGetPropositionTypesQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeAcronym: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onFilter(values);
  }

  const variants = {
    open: { right: '0' },
    closed: { right: '-40%' },
  };

  useEffect(() => {
    if (isOpen) setShouldHide(false);
  }, [isOpen]);

  useEffect(() => {
    const element = document.getElementById('portals');
    if (element) {
      setPortalElement(element);
    } else {
      console.warn("Element with id 'portals' not found in the DOM");
    }
  }, []);

  const content = (
    <motion.div
      className={cn(
        shouldHide
          ? 'overflow-hidden h-0 w-0'
          : 'absolute h-full p-4 top-0 overflow-hidden z-50 -right-[40%] w-[40%] bg-red-600 border-l-[40px] drop-shadow-[rgba(17,_17,_26,_0.1)_-10px_0px_16px] border-red-700'
      )}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      onAnimationComplete={(a) => {
        if (a === 'closed') {
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
      <h1 className="text-4xl font-bold text-white">Filtro</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="typeAcronym"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <ComboBox
                    {...field}
                    value={field.value ?? []}
                    isLoading={isLoading}
                    options={DataConverter.toSelectOptions(propositionTypes ?? [], 'sigla', 'nome')}
                    onFocus={(e) => {
                      console.log(e);
                      const audio = new Audio('/assets/audio/focus.wav');
                      audio.volume = 0.01;
                      audio.play();
                    }}
                    ref={firstFieldRef as LegacyRef<HTMLInputElement>}
                    placeholder="Tipo"
                    className="rounded-full data-[focused=true]:bg-black data-[focused=true]:text-white h-14 data-[focused=true]:placeholder:text-white data-[focused=true]:border-0"
                    optionClassName="rounded-full data-[selected=true]:bg-black data-[checked=true]:bg-orange-500 data-[selected=true]:text-white"
                  />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </motion.div>
  );

  return portalElement ? createPortal(content, portalElement) : null;
};
