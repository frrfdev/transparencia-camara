'use client';

import React, { useEffect, useState } from 'react';
import {
  GetPropositionsParams,
  useGetPropositionsQuery,
} from '../hooks/api/use-get-propositions.query';
import { usePagination } from '@/hooks/use-pagination';
import { List } from '@/components/ui/list';
import { PropositionDetails } from './proposition-details';
import { useMenuContext } from '@/app/providers/menu-provider';
import { PropositionsFilter } from './propositions-filter';
import { cn } from '@/lib/utils';

export const PropositionsList = () => {
  const { paginationConfig, dispatchPagination } = usePagination();
  const { addOption } = useMenuContext();

  const [selectedPropositionId, setSelectedPropositionId] = useState<
    number | null
  >(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<unknown>({});

  const { data: propositions } = useGetPropositionsQuery({
    ...paginationConfig,
    dispatchPagination,
    sort: {
      field: '',
      order: 'desc',
    },
    filter: filters,
  } as GetPropositionsParams);

  const selectedProposition = propositions?.data?.find(
    (a) => a.id === selectedPropositionId
  );

  useEffect(() => {
    addOption({
      key: 'y',
      label: 'Filtro',
      icon: 'Y',
      action: () => {
        setIsFilterOpen((old) => !old);
      },
    });
  }, []);

  return (
    <div className="h-full w-full flex gap-2 pb-4 relative overflow-hidden">
      <List className="flex flex-col p-10 pt-4 gap-4 h-full w-1/2 overflow-y-auto">
        {propositions?.data?.map((proposition) => (
          <button
            className={cn(
              'font-medium flex h-[80px] items-center rounded-full bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]   border-0 outline-0 hover:bg-purple-200',
              'focus:bg-gradient-to-r from-neutral-950 to-neutral-900 focus:text-white focus:font-bold',
              proposition.id === selectedPropositionId &&
                'bg-gradient-to-r from-neutral-950 to-neutral-900 text-white font-bold'
            )}
            key={proposition.id}
            tabIndex={1}
            onFocus={() => {
              setSelectedPropositionId(proposition.id);
            }}
          >
            <div className="flex h-full items-center pl-4 bg-purple-600 rounded-bl-full rounded-tl-full">
              <span className="font-bold min-w-[60px] max-w-[60px] w-[60px] text-white text-center">
                {proposition.numero}
              </span>
            </div>
            <svg
              className="inset-0 h-full min-w-[40px] w-[40px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 100"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 40,0 0,100" fill="#9333ea" />
            </svg>
            <div className="p-4 px-10">
              <span className="line-clamp-2">{proposition.ementa}</span>
            </div>
          </button>
        ))}
      </List>
      {selectedPropositionId && selectedProposition && (
        <PropositionDetails proposition={selectedProposition} />
      )}

      <PropositionsFilter
        onFilter={(values) => setFilters(values)}
        isOpen={isFilterOpen}
      />
    </div>
  );
};
