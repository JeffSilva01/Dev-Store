import { Skeleton } from '@/components/skeleton'

export default async function HomeLoading() {
  return (
    <div className="grid gap-6 grid-cols-9 grid-rows-6 h-full">
      <Skeleton className="col-span-6 row-span-6 h-[856px]" />
      <Skeleton className="col-span-3 row-span-3" />
      <Skeleton className="col-span-3 row-span-3" />
    </div>
  )
}
