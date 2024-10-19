import React from 'react';
import { Vote } from '../../../../types/GetVotingSessionVotesResponse';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Radar,
  PolarAngleAxis,
  PolarGrid,
  RadarChart,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import { ColorUtils } from '../utils/colors';
import { PartyVotes } from '../../../../types/PartyVotes';
import { PartyIcon } from '../../patch-notes/components/party-icon';

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
  type?: 'bar' | 'radar';
};

export const VotingSessionPartyChart = ({
  votes,
  className,
  onBarClick,
  type = 'bar',
}: Props) => {
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

  if (type === 'radar') {
    return (
      <ChartContainer config={chartConfig} className=" min-h-1">
        <RadarChart data={votesByParty}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <PolarAngleAxis
            dataKey="party"
            tick={({ x, y, textAnchor, index, ...props }) => {
              const data = votesByParty[index];
              return (
                <text
                  x={x}
                  y={index === 0 ? y - 10 : y}
                  textAnchor={textAnchor}
                  fontSize={13}
                  fontWeight={500}
                  {...props}
                >
                  <tspan className="fill-green-500">{data.yes}</tspan>
                  <tspan className="fill-muted-foreground">/</tspan>
                  <tspan className="fill-red-500">{data.no}</tspan>
                  <tspan
                    x={x}
                    dy={'1rem'}
                    fontSize={12}
                    className="fill-muted-foreground"
                  >
                    {data.party.slice(0, 3)}
                  </tspan>
                </text>
              );
            }}
          />
          <PolarGrid className="fill-gray-900/10 " />
          <Radar
            dataKey="no"
            className="fill-red-500"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1,
            }}
          />
          <Radar
            dataKey="yes"
            className="fill-green-500"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1,
            }}
          />
        </RadarChart>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className={cn('min-h-[200px] w-full', className)}
    >
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
          tickFormatter={(value: string) => value.slice(0, 3)}
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
