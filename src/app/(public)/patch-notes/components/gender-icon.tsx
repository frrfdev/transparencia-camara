import { FemaleSvg } from '@/components/icons/female.svg';
import { MaleSvg } from '@/components/icons/male.svg';
import React from 'react';

type Props = {
  gender: string;
};

export const GenderIcon = ({ gender }: Props) => {
  if (gender === 'M') {
    return <MaleSvg fill="#60a5fa" height={16} width={16}></MaleSvg>;
  }

  if (gender === 'F') {
    return <FemaleSvg fill="#f87171" height={22} width={22}></FemaleSvg>;
  }

  return null;
};
