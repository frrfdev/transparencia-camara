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
import { FilterSlideIntoView } from '@/components/animated/filter-slide-into-view';
import { useSearchParams } from 'next/navigation';
import { useMenuContext } from '@/app/providers/menu-provider';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  typeAcronym: z.array(z.string()).nullable(),
  year: z.array(z.string()).nullable(),
  number: z.string().nullable(),
});

type Props = {
  onFilter: (filter: z.infer<typeof formSchema>) => void;
  isOpen: boolean;
  close: () => void;
};

export const PropositionsFilter = ({ onFilter, isOpen, close }: Props) => {
  const { addOption, removeOption } = useMenuContext();

  const firstFieldRef = useRef<HTMLDivElement | null>(null);
  const [shouldHide, setShouldHide] = useState(true);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [isPreviousFocusSetted, setIsPreviousFocusSetted] = useState(false);

  const searchParams = useSearchParams();

  const typeAcronym = searchParams?.get('typeAcronym');
  const year = searchParams?.get('year');
  const number = searchParams?.get('number');

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
      number: '',
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
      setIsPreviousFocusSetted(false);
    }
    if (animation === 'open') firstFieldRef.current?.focus();
  };

  const handleAnimationStart = () => {
    const audio = new Audio('/assets/audio/slide.mp3');
    audio.volume = 0.01;
    audio.play().then(() => {
      audio.remove();
    });
  };

  const handleFocusNumber = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget && !isPreviousFocusSetted) {
      markForFocusLater(e.relatedTarget);
      setIsPreviousFocusSetted(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setShouldHide(false);
      addOption({
        key: 'Escape',
        label: 'Fechar',
        icon: 'Esc',
        action: () => {
          close();
        },
      });
    } else {
      removeOption('Escape');
    }

    return () => {
      removeOption('Escape');
    };
  }, [isOpen]);

  useEffect(() => {
    form.setValue('typeAcronym', typeAcronym?.split(',') ?? []);
    form.setValue('year', year?.split(',') ?? []);
    form.setValue('number', number ?? '');
  }, [typeAcronym, year, number]);

  useEffect(() => {
    const element = document.getElementById('portals');
    if (element) {
      setPortalElement(element);
    } else {
      console.warn("Element with id 'portals' not found in the DOM");
    }
  }, []);

  const content = (
    <FilterSlideIntoView
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
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputSound disabled={!isOpen}>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      tabIndex={isOpen ? 0 : -1}
                      ref={(element: HTMLInputElement | null) => {
                        firstFieldRef.current = element;
                        field.ref(element);
                      }}
                      onFocus={handleFocusNumber}
                      placeholder="Números separados por vírgula. Exemplo(10,20,30)"
                      className="rounded-full  bg-white  data-[focused=true]:ring-2 ring-black h-14"
                    />
                  </InputSound>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeAcronym"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputSound disabled={!isOpen}>
                    <ComboBox
                      {...field}
                      mode="multi"
                      value={field.value ?? []}
                      isLoading={isLoading}
                      tabIndex={isOpen ? 0 : -1}
                      options={typeOptions}
                      ref={(element: HTMLInputElement | null) => {
                        firstFieldRef.current = element;
                        field.ref(element);
                      }}
                      placeholder="Tipo da proposta"
                      className="rounded-full data-[focused=true]:ring-2 ring-black h-14"
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
                  <InputSound disabled={!isOpen}>
                    <ComboBox
                      {...field}
                      tabIndex={isOpen ? 0 : -1}
                      value={field.value ?? []}
                      options={yearOptions}
                      placeholder="Ano de apresentação"
                      mode="multi"
                      className="rounded-full  data-[focused=true]:ring-2 ring-black h-14"
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
    </FilterSlideIntoView>
  );

  return portalElement ? createPortal(content, portalElement) : null;
};
