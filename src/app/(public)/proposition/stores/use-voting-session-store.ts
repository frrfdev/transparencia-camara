import { create } from 'zustand';

type VotingSessionStore = {
  selectedVotingSession: string;
  setSelectedVotingSession: (votingSessionId: string) => void;
};

export const useVotingSessionStore = create<VotingSessionStore>((set) => ({
  selectedVotingSession: '',
  setSelectedVotingSession: (votingSessionId) =>
    set({ selectedVotingSession: votingSessionId }),
}));
