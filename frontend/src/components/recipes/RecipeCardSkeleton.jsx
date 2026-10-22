import Skeleton from '../Skeleton'

// Mirrors RecipeCard's own boxes so the grid keeps its shape while the
// recipes load, instead of collapsing and then pushing the page down.
export default function RecipeCardSkeleton() {
  return (
    <div className="flex w-[320px] flex-col justify-between rounded-3xl border border-line bg-white p-5">
      <Skeleton className="mb-4 h-[140px] rounded-2xl" />

      <Skeleton className="h-6 w-3/4" />

      <div className="mt-4 flex gap-6">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-16" />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>

      <div className="mt-5 flex gap-1.5">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
        <div className="flex flex-1 flex-col gap-2 pr-4">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-1.5 w-32 rounded-full" />
        </div>
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  )
}
