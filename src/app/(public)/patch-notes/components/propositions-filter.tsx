import React, { useState, useEffect, useRef, LegacyRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ComboBox } from '@/components/ui/combo';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPortal } from 'react-dom';
import { useGetPropositionTypesQuery } from '../hooks/api/use-get-proposition-types.query';
import { DataConverter } from '@/lib/converter';
import { markForFocusLater, returnFocus } from '@/lib/focusManager';
import { InputSound } from '@/components/ui/inut-sound';
import { ScrollIntoView } from '@/components/animated/scroll-into-view';
import { useSearchParams } from 'next/navigation';

const formSchema = z.object({
  typeAcronym: z.array(z.string()).nullable(),
  year: z.array(z.string()).nullable(),
});

type Props = {
  onFilter: (filter: z.infer<typeof formSchema>) => void;
  isOpen: boolean;
};

export const PropositionsFilter = ({ onFilter, isOpen }: Props) => {
  const firstFieldRef = useRef<HTMLDivElement>(null);
  const [shouldHide, setShouldHide] = useState(true);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [isPreviousFocusSetted, setIsPreviousFocusSetted] = useState(false);

  const searchParams = useSearchParams();
  const typeAcronym = searchParams?.get('typeAcronym');
  const year = searchParams?.get('year');

  const { data: propositionTypes, isLoading } = useGetPropositionTypesQuery();

  const typeOptions = DataConverter.toSelectOptions(
    propositionTypes ?? [],
    'cod',
    'nome'
  );

  const yearOptions = DataConverter.toSelectOptions(
    Array.from(
      { length: new Date().getFullYear() - 1999 },
      (_, i) => i + 2000
    ).map((year) => ({
      value: year.toString(),
      label: year.toString(),
    })),
    'value',
    'label'
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeAcronym: [],
      year: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onFilter(values);
  }

  const handleAnimationComplete = (animation: string) => {
    if (animation === 'closed') {
      setShouldHide(true);
      firstFieldRef.current?.blur();
      returnFocus();
    }
    if (animation === 'open') firstFieldRef.current?.focus();
  };

  const handleAnimationStart = () => {
    const audio = new Audio('/assets/audio/slide.mp3');
    audio.volume = 0.01;
    audio.play();
  };

  const handleFocusTypeAcronym = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget && !isPreviousFocusSetted) {
      markForFocusLater(e.relatedTarget);
      setIsPreviousFocusSetted(true);
    }
  };

  useEffect(() => {
    if (isOpen) setShouldHide(false);
  }, [isOpen]);

  useEffect(() => {
    form.setValue('typeAcronym', typeAcronym?.split(',') ?? []);
    form.setValue('year', year?.split(',') ?? []);
  }, [typeAcronym, year]);

  useEffect(() => {
    const element = document.getElementById('portals');
    if (element) {
      setPortalElement(element);
    } else {
      console.warn("Element with id 'portals' not found in the DOM");
    }
  }, []);

  const content = (
    <ScrollIntoView
      onAnimationComplete={handleAnimationComplete}
      onAnimationStart={handleAnimationStart}
      shouldHide={shouldHide}
      isOpen={isOpen}
    >
      <h1 className="text-4xl font-bold text-white">Filtro</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="typeAcronym"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputSound>
                    <ComboBox
                      {...field}
                      value={field.value ?? []}
                      isLoading={isLoading}
                      options={typeOptions}
                      onFocus={handleFocusTypeAcronym}
                      ref={firstFieldRef as LegacyRef<HTMLInputElement>}
                      placeholder="Tipo"
                      className="rounded-full  data-[focused=true]:bg-black data-[focused=true]:text-white h-14 data-[focused=true]:placeholder:text-white data-[focused=true]:border-0"
                      optionClassName="rounded-full whitespace-nowrap flex overflow-hidden overflow-ellipsis  data-[selected=true]:bg-black data-[checked=true]:bg-orange-500 data-[selected=true]:text-white"
                    />
                  </InputSound>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputSound>
                    <ComboBox
                      {...field}
                      value={field.value ?? []}
                      options={yearOptions}
                      placeholder="Ano"
                      className="rounded-full  data-[focused=true]:bg-black data-[focused=true]:text-white h-14 data-[focused=true]:placeholder:text-white data-[focused=true]:border-0"
                      optionClassName="rounded-full whitespace-nowrap flex overflow-hidden overflow-ellipsis  data-[selected=true]:bg-black data-[checked=true]:bg-orange-500 data-[selected=true]:text-white"
                    />
                  </InputSound>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full rounded-full py-6 focus:bg-white focus:text-red-500 focus:border-0 focus:outline-none focus:ring-0"
          >
            Filtrar
          </Button>
        </form>
      </Form>
    </ScrollIntoView>
  );

  return portalElement ? createPortal(content, portalElement) : null;
};
