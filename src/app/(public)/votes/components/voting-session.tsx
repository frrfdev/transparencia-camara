import React, { useMemo, useState } from 'react';
import { VotingSession } from '../types/GetProjectVotingSessionsResponse';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useGetProjectVotingSessionsQuery } from '../hooks/api/use-get-project-voting-sessions.query';
import { useGetVotingSessionVotesQuery } from '../hooks/api/use-get-voting-session-votes.query';
import { VotingSessionChart } from './voting-session-chart';
import { VotingSessionPartyChart } from './voting-session-party-chart';
import { VotingSessionPersonVotes } from './voting-session-person-votes';
import { VoteUtils } from '../utils/vote';
import { PartyVotes } from '../types/PartyVotes';

type VotingSessionProps = {
  projectId: string;
};

type VotingSessionAccordionItemProps = {
  votingSession: VotingSession;
};

type VotingSessionAccordionContentProps = {
  isOpen: boolean;
  votingSessionId: string;
};

type VotingSessionAccordionProps = {
  votingSessions: VotingSession[];
};

export const VotingSessions = ({ projectId }: VotingSessionProps) => {
  const {
    data: votingSessions,
    isLoading: isLoadingVotingSessions,
    error: votingSessionsError,
  } = useGetProjectVotingSessionsQuery({
    projectId,
  });

  return (
    <div>
      {isLoadingVotingSessions && <p>Loading voting sessions...</p>}
      {votingSessionsError && (
        <p>Error: {(votingSessionsError as Error).message}</p>
      )}
      {votingSessions && (
        <div>
          <h1>Sessões de Votação</h1>
          <VotingSessionAccordion votingSessions={votingSessions.dados} />
        </div>
      )}
    </div>
  );
};

const VotingSessionAccordion = ({
  votingSessions,
}: VotingSessionAccordionProps) => {
  const [selectedVotingSessionId, setSelectedVotingSessionId] = useState<
    string | null
  >(null);

  return (
    <Accordion
      type="single"
      collapsible
      onValueChange={setSelectedVotingSessionId}
    >
      {votingSessions.map((votingSession) => (
        <AccordionItem value={votingSession.id} key={votingSession.id}>
          <AccordionTrigger>
            <VotingSessionAccordionTrigger votingSession={votingSession} />
          </AccordionTrigger>
          <AccordionContent>
            <VotingSessionAccordionContent
              key={votingSession.id}
              votingSessionId={votingSession.id}
              isOpen={selectedVotingSessionId === votingSession.id}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const VotingSessionAccordionTrigger = ({
  votingSession,
}: VotingSessionAccordionItemProps) => {
  return (
    <li key={votingSession.id}>
      Date: {votingSession.data}, Description: {votingSession.descricao},
      Approved: {votingSession.aprovacao ? 'Yes' : 'No'}
    </li>
  );
};

const VotingSessionAccordionContent = ({
  votingSessionId,
  isOpen,
}: VotingSessionAccordionContentProps) => {
  const [filter, setFilter] = useState<{
    party: string;
    voteType: string;
  } | null>();

  const {
    data: votingSessionVotes,
    isLoading: isLoadingVotes,
    error: votesError,
  } = useGetVotingSessionVotesQuery({
    votingSessionId: isOpen ? votingSessionId : '',
  });

  const handleBarClick = (barKey: string, data: PartyVotes) => {
    if (filter?.party === data.party && filter?.voteType === barKey) {
      setFilter(null);
    } else {
      setFilter({
        party: data.party,
        voteType: barKey,
      });
    }
  };

  const filteredVotes = useMemo(() => {
    if (!filter) return votingSessionVotes?.dados;

    const voteType = VoteUtils.voteTypeTextToSlug(filter.voteType);

    return votingSessionVotes?.dados.filter(
      (vote) =>
        vote.deputado_.siglaPartido === filter.party &&
        vote.tipoVoto === voteType
    );
  }, [filter, votingSessionVotes]);

  if (
    (!votingSessionVotes || !votingSessionVotes.dados.length) &&
    !isLoadingVotes
  )
    return <div>No votes for this voting session</div>;

  if (isLoadingVotes) return <p>Loading votes...</p>;
  if (votesError) return <p>Error: {(votesError as Error).message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <VotingSessionChart
          votes={votingSessionVotes?.dados ?? []}
          className="max-h-[500px]"
        />
        <VotingSessionPartyChart
          votes={votingSessionVotes?.dados ?? []}
          className="max-h-[500px]"
          onBarClick={handleBarClick}
        />
      </div>

      {votingSessionVotes && (
        <VotingSessionPersonVotes votes={filteredVotes ?? []} />
      )}
    </div>
  );
};
