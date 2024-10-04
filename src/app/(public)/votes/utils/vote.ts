export const VoteUtils = {
  voteTypeTextToSlug: (voteType: string) => {
    switch (voteType) {
      case 'Sim':
        return 'yes';
      case 'Não':
        return 'no';
      case 'Abstenção':
        return 'abstention';
      case 'Obstrução':
        return 'obstruction';
    }
  },
};
