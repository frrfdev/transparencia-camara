import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex gap-2 bg-gray-200 w-full border-neutral-200 px-4 py-4 pr-8 animate-pulse drop-shadow-soft',
        className
      )}
      {...props}
    ></div>
  );
}

export { Skeleton };
