import React from 'react';
import { Vote } from '../../../../types/GetVotingSessionVotesResponse';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import { ColorUtils } from '../utils/colors';
import { PartyVotes } from '../../../../types/PartyVotes';

const chartConfig = {
  yes: {
    label: 'Sim',
    color: '#22c55e',
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

export const VotingSessionPartyChart = ({ votes, className, onBarClick }: Props) => {
  // first we nee to create a division by the deputado_.siglaPartido
  // and then separate in two values, yes and no, so i can make a chart, there is one more value "Obstrução"
  const votesByParty = votes.reduce((acc, vote) => {
    const party = vote.deputado_.siglaPartido;
    if (!acc.find((p) => p.party === party)) {
      acc.push({
        party,
        yes: 0,
        no: 0,
        obstruction: 0,
        abstention: 0,
        article17: 0,
      });
    }

    const partyData = acc.find((p) => p.party === party);
    if (!partyData) return acc;
    if (vote.tipoVoto === 'Sim') {
      partyData.yes++;
    } else if (vote.tipoVoto === 'Não') {
      partyData.no++;
    } else if (vote.tipoVoto === 'Obstrução') {
      partyData.obstruction++;
    } else if (vote.tipoVoto === 'Abstenção') {
      partyData.abstention++;
    } else if (vote.tipoVoto === 'Artigo 17') {
      partyData.article17++;
    }
    return acc;
  }, [] as { party: string; yes: number; no: number; obstruction: number; abstention: number; article17: number }[]);

  return (
    <ChartContainer config={chartConfig} className={cn('min-h-[200px] w-full', className)}>
      <BarChart
        accessibilityLayer
        data={votesByParty.sort((a, b) => {
          return (
            b.abstention +
            b.article17 +
            b.obstruction +
            b.no +
            b.yes -
            (a.abstention + a.article17 + a.obstruction + a.no + a.yes)
          );
        })}
      >
        <XAxis
          dataKey="party"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <CartesianGrid vertical={false} />
        <Bar
          dataKey="yes"
          stackId="a"
          fill={ColorUtils.voteTypeToColor('Sim')}
          radius={4}
          onClick={(data) => onBarClick?.('yes', data)}
        />
        <Bar
          dataKey="no"
          stackId="a"
          fill={ColorUtils.voteTypeToColor('Não')}
          radius={4}
          onClick={(data) => onBarClick?.('no', data)}
        />
        <Bar
          dataKey="obstruction"
          stackId="a"
          fill={ColorUtils.voteTypeToColor('Obstrução')}
          radius={4}
          onClick={(data) => onBarClick?.('obstruction', data)}
        />
        <Bar
          dataKey="abstention"
          stackId="a"
          fill={ColorUtils.voteTypeToColor('Abstenção')}
          radius={4}
          onClick={(data) => onBarClick?.('abstention', data)}
        />
        <Bar
          dataKey="article17"
          stackId="a"
          fill={ColorUtils.voteTypeToColor('Artigo 17')}
          radius={4}
          onClick={(data) => onBarClick?.('article17', data)}
        />
      </BarChart>
    </ChartContainer>
  );
};
