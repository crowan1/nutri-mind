import Skeleton from '../Skeleton'

function CardSkeleton({ rows }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
      <div className="flex items-start gap-3.5">
        <Skeleton className="size-9 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="mt-2 h-3 w-64 max-w-full" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: rows }, (_, index) => (
          <Skeleton key={index} className="h-11 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

// Mirrors the two-column shape of the loaded page so the layout does not jump
// when the profile lands.
export default function ProfileSkeleton() {
  return (
    <div
      role="status"
      aria-label="Chargement de votre profil"
      className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]"
    >
      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-line bg-white p-6 text-center">
          <Skeleton className="mx-auto size-20 rounded-full" />
          <Skeleton className="mx-auto mt-4 h-5 w-32" />
          <Skeleton className="mx-auto mt-2 h-3 w-40" />
        </div>
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-36 rounded-2xl" />
      </div>

      <div className="flex flex-col gap-5">
        <CardSkeleton rows={4} />
        <CardSkeleton rows={2} />
      </div>
    </div>
  )
}
