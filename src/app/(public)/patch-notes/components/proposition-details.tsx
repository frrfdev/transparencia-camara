import { useGetPropositionAuthorsQuery } from '../hooks/api/use-get-proposition-authors.query';
import { useGetPropositionDetailsQuery } from '../hooks/api/use-get-proposition-details.query';
import { Proposition } from '../types/Proposition';
import { PersonCard } from './person-card';

type PropositionDetailsProps = {
  proposition: Proposition;
};

export const PropositionDetails = ({
  proposition,
}: PropositionDetailsProps) => {
  const { data: propositionDetails } = useGetPropositionDetailsQuery({
    propositionId: proposition.id,
  });
  const { data: propositionAuthors } = useGetPropositionAuthorsQuery({
    propositionId: proposition.id,
  });

  const propositionAuthorsWithId = propositionAuthors?.map((author) => {
    const a = author.uri.split('/');
    return {
      id: Number(a[a.length - 1]),
      ...author,
    };
  });

  return (
    <div className="h-full w-1/2 px-10 pt-4">
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
                {propositionDetails?.siglaTipo}
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
          <div className="mt-4 w-full max-h-[200px] overflow-x-auto flex gap-4 p-4">
            {propositionAuthorsWithId?.map((author) => (
              <PersonCard key={author.id} tabIndex={3} personId={author.id} />
            ))}
          </div>
        </div>

        <div
          className=" drop-shadow-md bg-white p-4 overflow-y-auto"
          tabIndex={4}
        >
          {propositionDetails?.ementa}
        </div>
      </div>
    </div>
  );
};
