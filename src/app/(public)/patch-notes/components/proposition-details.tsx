import { useGetPropositionAuthorsQuery } from '../hooks/api/use-get-proposition-authors.query';
import { useGetPropositionDetailsQuery } from '../hooks/api/use-get-proposition-details.query';
import { Proposition } from '../types/Proposition';
import { PersonCard } from './person-card';
import { useGetPropositionResume } from '../hooks/api/use-get-proposition-resume';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PropositionDetailsSkeleton } from './proposition-details.skeleton';
import Link from 'next/link';

type PropositionDetailsProps = {
  proposition: Proposition | null;
};

export const PropositionDetails = ({
  proposition,
}: PropositionDetailsProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (proposition) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [proposition]);

  const { data: propositionDetails, isLoading: isDetailsLoading } =
    useGetPropositionDetailsQuery({
      propositionId: proposition?.id ?? 0,
    });
  const { data: propositionAuthors, isLoading: isAuthorsLoading } =
    useGetPropositionAuthorsQuery({
      propositionId: proposition?.id ?? 0,
    });
  const {
    data: resumeData,
    isLoading: isResumeLoading,
    isError,
  } = useGetPropositionResume(proposition?.id?.toString() ?? '');

  const propositionAuthorsWithId = propositionAuthors?.map((author) => {
    const a = author.uri.split('/');
    return {
      id: Number(a[a.length - 1]),
      ...author,
    };
  });

  const isLoading = isDetailsLoading || isAuthorsLoading || isResumeLoading;

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <PropositionDetailsSkeleton key="skeleton" />
      ) : (
        isVisible && (
          <motion.div
            key="content"
            className="h-full w-1/2 px-10 pt-4"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div
              className="h-full w-full focus:outline-none rounded-lg gap-4 flex flex-col"
              tabIndex={2}
            >
              <div className="bg-gray-300 font-bold text-black w-full p-2 text-center drop-shadow-md">
                {propositionDetails?.dataApresentacao
                  ? Intl.DateTimeFormat('pt-BR').format(
                      new Date(propositionDetails.dataApresentacao)
                    )
                  : ''}
              </div>
              <table className="drop-shadow-md">
                <tbody>
                  <tr className="border-b-2 border-gray-400/50">
                    <td className="bg-gray-300 text-center text-black p-2 w-1/2">
                      TIPO
                    </td>
                    <td className="bg-white text-black p-2 w-1/2">
                      {propositionDetails?.siglaTipo} -{' '}
                      {propositionDetails?.descricaoTipo}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-400/50">
                    <td className="bg-gray-300 text-center text-black p-2 w-1/2">
                      NÚMERO
                    </td>
                    <td className="bg-white text-black p-2 w-1/2">
                      {propositionDetails?.numero}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-400/50">
                    <td className="bg-gray-300 text-center text-black p-2 w-1/2">
                      STATUS
                    </td>
                    <td className="bg-white text-black p-2 w-1/2">
                      {propositionDetails?.statusProposicao.descricaoTramitacao}
                    </td>
                  </tr>
                  <tr className="">
                    <td className="bg-gray-300 text-center text-black p-2 w-1/2">
                      ORGÃO
                    </td>
                    <td className="bg-white text-black p-2 w-1/2">
                      {propositionDetails?.statusProposicao.siglaOrgao}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className=" drop-shadow-md">
                <div className="bg-gray-300 font-bold text-black w-full p-2 text-center">
                  Autores
                </div>
                <div className="max-h-[150px] flex-col  overflow-y-auto flex bg-white w-full">
                  {propositionAuthorsWithId?.map((author) => (
                    <PersonCard
                      key={author.id}
                      tabIndex={3}
                      personId={author.id}
                    />
                  ))}
                </div>
              </div>

              <div
                className="drop-shadow-md bg-white p-4 overflow-y-auto relative"
                tabIndex={4}
              >
                {propositionDetails?.urlInteiroTeor && (
                  <div className="absolute top-4 right-4">
                    <Link
                      href={propositionDetails.urlInteiroTeor}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
                    >
                      Ver Projeto na Íntegra
                    </Link>
                  </div>
                )}

                {isLoading ? (
                  <p>Carregando resumo...</p>
                ) : isError ? (
                  <p>Erro ao carregar o resumo.</p>
                ) : resumeData?.resume ? (
                  <div>
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
                    <p>{proposition?.ementa}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};
