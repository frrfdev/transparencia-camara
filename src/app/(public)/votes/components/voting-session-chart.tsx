import React from 'react';
import { Vote } from '../../../../types/GetVotingSessionVotesResponse';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Label,
  LabelList,
  Pie,
  PieChart,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';
import { cn } from '@/lib/utils';
import { ColorUtils } from '../utils/colors';
import { PartyVotes } from '../../../../types/PartyVotes';

const chartConfig = {
  count: {
    label: 'Total',
  },
  yes: {
    label: 'Sim',
    color: '#22C55E',
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
  type?: 'pie' | 'radial' | 'donut';
};

const parseVoteType = (voteType: string) => {
  if (voteType === 'Sim') return 'yes';
  if (voteType === 'Não') return 'no';
  if (voteType === 'Abstenção') return 'abstention';
  if (voteType === 'Artigo 17') return 'article17';
  return 'obstruction';
};

export const VotingSessionChart = ({
  votes,
  className,
  type = 'pie',
}: Props) => {
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

  if (type === 'donut') {
    return (
      <ChartContainer config={chartConfig} className="mx-auto min-h-1 w-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={votesByType}
            dataKey="count"
            nameKey="type"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {votesByType.reduce((acc, vote) => {
                          return acc + vote.count;
                        }, 0)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Votos
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    );
  }

  if (type === 'radial') {
    // convert to {yes: 0, no: 0, ...} use the key not the type
    const convertedData = Object.fromEntries(
      votesByType.map((vote) => [parseVoteType(vote.type), vote.count])
    );

    return (
      <ChartContainer
        config={chartConfig}
        className="mx-auto min-h-[300px] w-full"
      >
        <RadialBarChart
          data={[convertedData]}
          endAngle={100}
          innerRadius={80}
          outerRadius={140}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[86, 74]}
          />
          <RadialBar dataKey="yes" fill="var(--color-yes)" />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {votesByType[0].count.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    );
  }

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
              return chartConfig[parseVoteType(value)]?.label;
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};
