import Image from 'next/image';
import React from 'react';

type Props = {
  avatarUrl: string;
  name: string;
};

export const PersonAvatar = ({ avatarUrl, name }: Props) => {
  return (
    <div className="h-[80px] rounded-full min-w-[80px] overflow-hidden w-[80px] relative">
      <Image
        src={
          process.env.NEXT_PUBLIC_ENV === 'localhost'
            ? '/assets/images/placeholder/person.jpg'
            : avatarUrl ?? ''
        }
        alt={name ?? ''}
        fill
        objectFit="cover"
        className="absolute w-full"
      />
    </div>
  );
};
