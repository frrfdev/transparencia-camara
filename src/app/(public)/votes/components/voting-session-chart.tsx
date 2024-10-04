import React from 'react';
import { Vote } from '../types/GetVotingSessionVotesResponse';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { LabelList, Pie, PieChart } from 'recharts';
import { cn } from '@/lib/utils';
import { ColorUtils } from '../utils/colors';
import { PartyVotes } from '../types/PartyVotes';

const chartConfig = {
  count: {
    label: 'Total',
  },
  yes: {
    label: 'Sim',
    color: 'var(--color-yes)',
  },
  no: {
    label: 'Não',
    color: '#ef4444',
  },
  obstruction: {
    label: 'Obstrução',
    color: '#eab308',
  },
  abstention: {
    label: 'Abstenção',
    color: '#6b7280',
  },
  article17: {
    label: 'Artigo 17',
    color: '#f97316',
  },
} satisfies ChartConfig;

type Props = {
  votes: Vote[];
  className?: string;
  onBarClick?: (barKey: string, data: PartyVotes) => void;
};

const parseVoteType = (voteType: string) => {
  if (voteType === 'Sim') return 'yes';
  if (voteType === 'Não') return 'no';
  if (voteType === 'Abstenção') return 'abstention';
  if (voteType === 'Artigo 17') return 'article17';
  return 'obstruction';
};

export const VotingSessionChart = ({ votes, className }: Props) => {
  const votesByType = votes.reduce((acc, vote) => {
    const type = vote.tipoVoto;
    if (!acc.find((t) => t.type === type)) {
      acc.push({
        type,
        count: 0,
        fill: ColorUtils.voteTypeToColor(type),
      });
    }
    const voteType = acc.find((t) => t.type === type);
    if (!voteType) return acc;
    voteType.count++;
    return acc;
  }, [] as { type: string; count: number; fill: string }[]);

  return (
    <ChartContainer
      config={chartConfig}
      className={cn('min-h-[200px] w-full', className)}
    >
      <PieChart data={votesByType}>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="count" hideLabel />}
        />
        <Pie data={votesByType} dataKey="count">
          <LabelList
            dataKey="type"
            className="fill-background"
            stroke="none"
            fontSize={12}
            formatter={(value: keyof typeof chartConfig) => {
              console.log(value);
              return chartConfig[parseVoteType(value)]?.label;
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};
