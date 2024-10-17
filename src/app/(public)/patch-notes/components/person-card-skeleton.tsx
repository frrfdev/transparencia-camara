import { PersonAvatarSkeleton } from './person-avatar-skeleton';

export const PersonCardSkeleton = () => {
  return (
    <div className="flex gap-2 bg-white border-b-2 w-full border-neutral-200 px-4 py-4 pr-8 animate-pulse">
      <PersonAvatarSkeleton />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between items-center gap-2">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      </div>
    </div>
  );
};
