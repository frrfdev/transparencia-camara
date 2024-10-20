import { create } from 'zustand';

type VotingSessionStore = {
  selectedVotingSession: string;
  setSelectedVotingSession: (votingSessionId: string) => void;
  selectedVisualization: 'charts' | 'person';
  setSelectedVisualization: (visualization: 'charts' | 'person') => void;
  selectedPersonId: string;
  setSelectedPersonId: (personId: string) => void;
  selectedPersonVote: string;
  setSelectedPersonVote: (vote: string) => void;
  showVotationReplay: boolean;
  setShowVotationReplay: (show: boolean) => void;
};

export const useVotingSessionStore = create<VotingSessionStore>((set) => ({
  selectedVotingSession: '',
  setSelectedVotingSession: (votingSessionId) =>
    set({ selectedVotingSession: votingSessionId }),
  selectedVisualization: 'charts',
  setSelectedVisualization: (visualization) =>
    set({ selectedVisualization: visualization }),
  selectedPersonId: '',
  setSelectedPersonId: (personId) => set({ selectedPersonId: personId }),
  showVotationReplay: true,
  setShowVotationReplay: (show) => set({ showVotationReplay: show }),
  selectedPersonVote: '',
  setSelectedPersonVote: (vote) => set({ selectedPersonVote: vote }),
}));
