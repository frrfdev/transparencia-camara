'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetPropositionDetailsQuery } from '../../patch-notes/hooks/api/use-get-proposition-details.query';
import { useGetPropositionResume } from '../../patch-notes/hooks/api/use-get-proposition-resume';
import { DetailsGridContent } from '@/components/ui/details-grid';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { PropositionDetailsSkeleton } from '../../patch-notes/components/proposition-details.skeleton';

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={variants}
        transition={{ duration: 1 }}
        initial="closed"
        animate="open"
        exit="closed"
        className="h-full overflow-hidden"
      >
        {isLoading ? (
          <PropositionDetailsSkeleton></PropositionDetailsSkeleton>
        ) : (
          <motion.div
            variants={variants}
            transition={{ duration: 0.3 }}
            initial="closed"
            animate="open"
            exit="closed"
            className="h-full overflow-hidden"
          >
            <DetailsGridContent
              className="relative p-4 h-full rounded-md"
              tabIndex={0}
            >
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

              {propositionResume?.resume ? (
                <div className="">
                  <p className="text-sm text-gray-500 mb-2">
                    Resumo gerado por IA:
                  </p>
                  {propositionResume.resume.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center flex-col p-6">
                  <p className="text-lg font-bold text-red-400 mb-2">
                    Resumo não encontrado
                  </p>
                  <p className="text-md mb-10 text-gray-500 text-center">
                    Você pode gerar um resumo para esta proposição clicando no
                    botão "Gerar Resumo" abaixo.
                  </p>
                  <Input placeholder="email@exemplo.com"></Input>
                  <span className="text-sm text-gray-500 my-2 text-center">
                    Coloque seu email aqui caso queira ser notificado quando o
                    resumo estiver pronto
                  </span>
                  <Button>Gerar Resumo</Button>
                </div>
              )}
            </DetailsGridContent>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
