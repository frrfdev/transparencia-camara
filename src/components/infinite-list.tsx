import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
  fetchNextPage: () => void;
};

export const InfiniteList = ({
  children,
  className,
  isLoading,
  fetchNextPage,
}: Props) => {
  const [isCooldown, setIsCooldown] = React.useState(false);
  const [loadMoreRef, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  });

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (entry?.isIntersecting && !isCooldown) {
      setIsCooldown(true);
      setTimeout(() => {
        setIsCooldown(false);
      }, 1000);
      setCount(count + 1);
      fetchNextPage();
    }
  }, [entry?.isIntersecting, isLoading, isCooldown]);

  return (
    <div
      className={cn('overflow-y-auto relative h-full flex flex-col', className)}
    >
      <div className="relative flex flex-col">
        {children}
        <div
          className="h-[10px] absolute w-full bottom-[50px]"
          ref={loadMoreRef}
        ></div>
      </div>
    </div>
  );
};
