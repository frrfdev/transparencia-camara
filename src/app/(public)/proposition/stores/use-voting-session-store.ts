import { create } from 'zustand';

type VotingSessionStore = {
  selectedVotingSession: string;
  setSelectedVotingSession: (votingSessionId: string) => void;
  selectedVisualization: 'charts' | 'person';
  setSelectedVisualization: (visualization: 'charts' | 'person') => void;
};

export const useVotingSessionStore = create<VotingSessionStore>((set) => ({
  selectedVotingSession: '',
  setSelectedVotingSession: (votingSessionId) =>
    set({ selectedVotingSession: votingSessionId }),
  selectedVisualization: 'charts',
  setSelectedVisualization: (visualization) =>
    set({ selectedVisualization: visualization }),
}));
