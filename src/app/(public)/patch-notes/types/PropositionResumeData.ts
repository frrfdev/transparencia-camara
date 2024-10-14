export type PropositionResumeData = {
  id: string;
  url: string;
  propositionNumber: string;
  created_at: string;
  resume: {
    title: string;
    description: string;
  }[];
};
