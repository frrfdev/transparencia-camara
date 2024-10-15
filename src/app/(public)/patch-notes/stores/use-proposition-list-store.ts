import { create } from 'zustand';

type PropositionListStore = {
  selectedPropositionId: number | null;
  setSelectedPropositionId: (id: number | null) => void;
};

export const usePropositionListStore = create<PropositionListStore>()(
  (set) => ({
    selectedPropositionId: null,
    setSelectedPropositionId: (id) => set({ selectedPropositionId: id }),
  })
);
