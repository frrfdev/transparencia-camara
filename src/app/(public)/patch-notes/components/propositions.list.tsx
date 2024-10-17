'use client';

import React, { useEffect, useState } from 'react';
import {
  GetPropositionsParams,
  useGetPropositionsQuery,
} from '../hooks/api/use-get-propositions.query';
import { usePagination } from '@/hooks/use-pagination';
import { PropositionDetails } from './proposition-details';
import { useMenuContext } from '@/app/providers/menu-provider';
import { PropositionsFilter } from './propositions-filter';
import { useRouter, useSearchParams } from 'next/navigation';
import { UrlUtils } from '../../votes/utils/url';
import { InfiniteList } from '@/components/infinite-list';
import { PropositionButton } from './proposition-button';
import { Proposition } from '../types/Proposition';
import { usePropositionListStore } from '../stores/use-proposition-list-store';

export const PropositionsList = () => {
  const { paginationConfig, dispatchPagination } = usePagination();
  const { addOptions, removeOption } = useMenuContext();
  const router = useRouter();
  const { selectedPropositionId, setSelectedPropositionId } =
    usePropositionListStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();
  const typeAcronym = searchParams?.get('typeAcronym');
  const year = searchParams?.get('year');

  const {
    data: propositions,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPropositionsQuery({
    ...paginationConfig,
    dispatchPagination,
    sort: {
      field: '',
      order: 'desc',
    },
    filter: {
      typeAcronym,
      year,
    },
  } as GetPropositionsParams);

  const selectedProposition = propositions?.pages
    .flatMap((page) => page.data)
    ?.find((a) => a.id === selectedPropositionId);

  useEffect(() => {
    addOptions([
      {
        key: 'y',
        label: 'Filtro',
        icon: 'Y',
        action: () => {
          setIsFilterOpen((old) => !old);
        },
      },
    ]);

    return () => {
      removeOption('y');
      removeOption('d');
    };
  }, []);

  return (
    <div className="h-full w-full flex gap-2 pb-4 relative overflow-hidden">
      <div className="flex flex-col p-10 pt-4 pb-0 h-full w-1/2">
        <InfiniteList
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          className="p-4"
        >
          <div className="h-full flex w-full flex-col gap-4">
            {propositions?.pages
              .flatMap((page) => page.data)
              ?.map((proposition) => (
                <PropositionButton
                  isSelected={proposition.id === selectedPropositionId}
                  key={proposition.id}
                  onFocus={() => {
                    setSelectedPropositionId(proposition.id);
                    addOptions([
                      {
                        key: 'd',
                        label: 'Detalhes',
                        icon: 'D',
                        action: () => {
                          router.push(`/proposition/${proposition.id}`);
                        },
                      },
                    ]);
                  }}
                  proposition={proposition}
                ></PropositionButton>
              ))}
            {isLoading || isFetchingNextPage
              ? Array.from(Array(paginationConfig.pageSize)).map((_, index) => (
                  <PropositionButton
                    key={`prop-${index}`}
                    isLoading={true}
                    proposition={{} as Proposition}
                  />
                ))
              : null}
          </div>
        </InfiniteList>
      </div>
      {selectedPropositionId && selectedProposition && (
        <PropositionDetails proposition={selectedProposition} />
      )}

      <PropositionsFilter
        onFilter={(values) => {
          router.push(`/patch-notes?${UrlUtils.buildQueryString(values)}`);
        }}
        close={() => {
          setIsFilterOpen(false);
        }}
        isOpen={isFilterOpen}
      />
    </div>
  );
};
