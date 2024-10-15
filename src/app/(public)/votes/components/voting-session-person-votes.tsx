import React from 'react';
import { PersonVoteCard } from './person-vote-card';
import { Vote } from '../../../../types/GetVotingSessionVotesResponse';
type Props = {
  votes: Vote[];
};

export const VotingSessionPersonVotes = ({ votes }: Props) => {
  return (
    <div>
      <h2>Votes for Selected Voting Session:</h2>

      <ul className="flex flex-wrap">
        {votes?.map((vote, index) => (
          <li key={index}>
            <PersonVoteCard person={vote.deputado_} vote={vote} />
          </li>
        ))}
      </ul>
    </div>
  );
};
