import { create } from 'zustand';

interface PropositionAuthorsStore {
  selectedAuthors: string;
  setSelectedAuthors: (authors: string) => void;
}

export const usePropositionAuthorsStore = create<PropositionAuthorsStore>()(
  (set) => ({
    selectedAuthors: '',
    setSelectedAuthors: (authors) => set({ selectedAuthors: authors }),
  })
);
