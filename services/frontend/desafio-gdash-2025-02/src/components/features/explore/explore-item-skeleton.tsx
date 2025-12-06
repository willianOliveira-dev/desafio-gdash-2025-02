import { Skeleton } from '@/components/ui/skeleton';

export function ExploreItemSkeleton() {
    return (
        <div className="bg-white/80 rounded-3xl p-4 flex flex-col items-center shadow-md">
            <Skeleton className="h-4 w-10 mb-2" />

            <Skeleton className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl mb-3" />

            <Skeleton className="h-6 w-3/4 mb-2" />

            <Skeleton className="h-4 w-1/2 rounded-full" />
        </div>
    );
}
