import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

type Props = {
  avatarUrl: string;
  name: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const PersonAvatar = ({
  avatarUrl,
  name,
  className,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={cn(
        'h-[80px] rounded-full min-w-[80px] overflow-hidden w-[80px] relative',
        className
      )}
    >
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
