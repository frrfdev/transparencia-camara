'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetPropositionDetailsQuery } from '../../patch-notes/hooks/api/use-get-proposition-details.query';
import { useGetPropositionResume } from '../../patch-notes/hooks/api/use-get-proposition-resume';
import { DetailsGridContent } from '@/components/ui/details-grid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { PropositionDetailsSkeleton } from '../../patch-notes/components/proposition-details.skeleton';
import { MenuOption, useMenuContext } from '@/app/providers/menu-provider';
import { SoundFocus } from '@/components/ui/sound-focus';
import { Link } from '@/components/ui/link';

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

export const PropositionText = () => {
  const params = useParams();
  const { addOptions, removeOptions } = useMenuContext();
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

  useEffect(() => {
    const newOptions: MenuOption[] = [];
    if (propositionDetails?.urlInteiroTeor) {
      newOptions.push({
        key: 'i',
        label: 'Ver Projeto na Íntegra',
        icon: 'I',
        action: () => {
          window.open(propositionDetails.urlInteiroTeor, '_blank');
        },
      });
    }

    addOptions(newOptions);

    return () => {
      removeOptions(['i']);
    };
  }, [propositionDetails?.urlInteiroTeor]);

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
            className="h-full overflow-hidden p-4"
          >
            <DetailsGridContent
              className="relative p-4 h-full rounded-md"
              tabIndex={0}
            >
              <div className="absolute top-4 right-4 flex gap-2">
                {propositionDetails?.urlInteiroTeor && (
                  <SoundFocus>
                    <Link
                      href={propositionDetails.urlInteiroTeor}
                      target="_blank"
                      variant="pokemon"
                      tabIndex={0}
                      rel="noopener noreferrer"
                      className="bg-purple-500 hover:bg-purple-600 focus:bg-black text-white font-bold py-2 px-4 transition duration-300 text-sm"
                    >
                      Ver Projeto na Íntegra
                    </Link>
                  </SoundFocus>
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
                    botão &quot;Gerar Resumo&quot; abaixo.
                  </p>
                  <Input placeholder="email@exemplo.com"></Input>
                  <span className="text-sm text-gray-500 my-2 text-center">
                    Coloque seu email aqui caso queira ser notificado quando o
                    resumo estiver pronto
                  </span>
                  <SoundFocus>
                    <Button
                      variant="pokemon"
                      className="bg-red-600 text-white hover:opacity-50 focus:bg-white focus:text-black"
                    >
                      Gerar Resumo
                    </Button>
                  </SoundFocus>
                </div>
              )}
            </DetailsGridContent>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
