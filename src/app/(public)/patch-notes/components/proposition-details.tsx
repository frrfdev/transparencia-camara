import { useGetPropositionAuthorsQuery } from '../hooks/api/use-get-proposition-authors.query';
import { useGetPropositionDetailsQuery } from '../hooks/api/use-get-proposition-details.query';
import { Proposition } from '../types/Proposition';
import { PersonCard } from './person-card';
import { useGetPropositionResume } from '../hooks/api/use-get-proposition-resume';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { PropositionDetailsSkeleton } from './proposition-details.skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { PropositionResume } from './proposition-resume';
import {
  DetailsGrid,
  DetailsGridContent,
  DetailsGridHeader,
  DetailsGridRow,
} from '@/components/ui/details-grid';
import { Link } from '@/components/ui/link';
import { useMessageContext } from '@/app/providers/message-provider';

type PropositionDetailsProps = {
  proposition: Proposition | null;
};

export const PropositionDetails = ({
  proposition,
}: PropositionDetailsProps) => {
  const { addMessage } = useMessageContext();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (proposition) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [proposition]);

  const { data: propositionDetails, isPending: isDetailsLoading } =
    useGetPropositionDetailsQuery({
      propositionId: proposition?.id?.toString() ?? '',
    });
  const { data: propositionAuthors, isPending: isAuthorsLoading } =
    useGetPropositionAuthorsQuery({
      propositionId: proposition?.id?.toString() ?? '',
    });
  const {
    data: resumeData,
    isPending: isResumeLoading,
    isError,
  } = useGetPropositionResume({
    propositionId: proposition?.id.toString() ?? '',
  });

  const propositionAuthorsWithId = propositionAuthors?.map((author) => {
    const a = author.uri.split('/');
    return {
      ...author,
      id: Number(a[a.length - 1]),
    };
  });

  const isLoading = useMemo(() => {
    return isDetailsLoading;
  }, [isDetailsLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <PropositionDetailsSkeleton key="skeleton" />
      ) : (
        isVisible && (
          <motion.div
            key="content"
            className="h-full w-1/2 px-10 pt-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div
              className="h-full w-full focus:outline-none rounded-lg gap-4 flex flex-col"
              tabIndex={0}
            >
              <DetailsGridHeader>
                {propositionDetails?.dataApresentacao
                  ? Intl.DateTimeFormat('pt-BR').format(
                      new Date(propositionDetails.dataApresentacao)
                    )
                  : ''}{' '}
                -{' '}
                <span
                  title="Copiar ID"
                  className="cursor-pointer hover:text-white text-purple-500"
                  onClick={() => {
                    addMessage(
                      {
                        content: 'ID da proposta copiado',
                      },
                      1000
                    );
                    navigator.clipboard.writeText(
                      propositionDetails?.id.toString() ?? ''
                    );
                  }}
                >
                  {propositionDetails?.id ?? ''}
                </span>
              </DetailsGridHeader>
              <DetailsGrid>
                <DetailsGridRow
                  label="TIPO"
                  value={`${propositionDetails?.siglaTipo ?? ''} - ${
                    propositionDetails?.descricaoTipo ?? ''
                  }`}
                />
                <DetailsGridRow
                  label="NÚMERO"
                  value={propositionDetails?.numero}
                />
                <DetailsGridRow
                  label="STATUS"
                  value={
                    propositionDetails?.statusProposicao.descricaoTramitacao
                  }
                />
                <DetailsGridRow
                  label="ORGÃO"
                  value={propositionDetails?.statusProposicao.siglaOrgao}
                />
              </DetailsGrid>

              <div className=" drop-shadow-md">
                <div className="bg-gray-300 font-bold text-black w-full p-2 text-center">
                  Autores
                </div>
                <DetailsGridContent>
                  {propositionAuthorsWithId?.length ? (
                    propositionAuthorsWithId?.map((author) => (
                      <PersonCard
                        key={author.id}
                        tabIndex={0}
                        personId={author.id}
                        code={author.codTipo}
                        label={author.nome}
                      />
                    ))
                  ) : (
                    <div className="w-full p-6 text-center font-bold text-gray-300">
                      Nenhum autor encontrado
                    </div>
                  )}
                </DetailsGridContent>
              </div>

              <DetailsGridContent
                className="relative p-4 h-full min-h-[100px]"
                tabIndex={0}
              >
                <div className="absolute top-4 right-4 flex gap-2">
                  {propositionDetails?.urlInteiroTeor && (
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
                  )}
                  {resumeData?.resume && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="pokemon"
                          className="shadow-soft bg-yellow-500 hover:bg-yellow-600 focus:bg-black text-white"
                        >
                          Ver Resumo Completo
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl  max-h-[90vh] overflow-y-auto">
                        <PropositionResume resumeData={resumeData} />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {resumeData?.resume ? (
                  <div className="">
                    <p className="text-sm text-gray-500 mb-2">
                      Resumo gerado por IA:
                    </p>
                    {resumeData.resume.map((item, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="font-semibold text-lg mb-1">
                          {item.title}
                        </h3>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Ementa:</p>
                    <p className="mt-6">{proposition?.ementa}</p>
                  </div>
                )}
              </DetailsGridContent>
            </div>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};
