export const ColorUtils = {
  voteTypeToColor: (voteType: string) => {
    if (voteType === 'Sim') return '#16a34a';
    if (voteType === 'Não') return '#ef4444';
    if (voteType === 'Abstenção') return '#6b7280';
    if (voteType === 'Artigo 17') return '#f97316';
    return '#eab308';
  },
};
