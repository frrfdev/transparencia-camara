'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetPropositionDetailsQuery } from '../../patch-notes/hooks/api/use-get-proposition-details.query';
import { useGetPropositionResume } from '../../patch-notes/hooks/api/use-get-proposition-resume';
import { DetailsGridContent } from '@/components/ui/details-grid';
import Link from 'next/link';

export const PropositionText = () => {
  const params = useParams();
  const {
    data: propositionDetails,
    isPending: isLoadingPropositionDetails,
    isError: isErrorPropositionDetails,
  } = useGetPropositionDetailsQuery({
    propositionId: params.id as string,
  });
  const {
    data: propositionResume,
    isPending: isLoadingPropositionResume,
    isError: isErrorPropositionResume,
  } = useGetPropositionResume({
    propositionId: params.id as string,
  });

  const isLoading = isLoadingPropositionDetails || isLoadingPropositionResume;
  const isError = isErrorPropositionDetails || isErrorPropositionResume;

  return (
    <DetailsGridContent className="relative p-4 h-full rounded-md" tabIndex={0}>
      <div className="absolute top-4 right-4 flex gap-2">
        {propositionDetails?.urlInteiroTeor && (
          <Link
            href={propositionDetails.urlInteiroTeor}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
          >
            Ver Projeto na Íntegra
          </Link>
        )}
      </div>

      {isLoading ? (
        <p>Carregando resumo...</p>
      ) : isError ? (
        <p>Erro ao carregar o resumo.</p>
      ) : propositionResume?.resume ? (
        <div className="">
          <p className="text-sm text-gray-500 mb-2">Resumo gerado por IA:</p>
          {propositionResume.resume.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-2">Ementa:</p>
          <p className="mt-6">{propositionDetails?.ementa}</p>
        </div>
      )}
    </DetailsGridContent>
  );
};
