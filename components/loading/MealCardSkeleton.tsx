// components/home-skeletons.tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"

export function MealGridSkeleton() {
  return (
    <section className="bg-zinc-950 py-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Skeleton */}
        <div className="mb-12 flex flex-col items-center space-y-4">
          <Skeleton className="h-4 w-32 bg-zinc-900" />
          <Skeleton className="h-10 w-64 bg-zinc-900" />
          <Skeleton className="h-px w-24 bg-zinc-900" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="w-full max-w-sm rounded-none border-none bg-zinc-900/50">
              <CardHeader className="p-0">
                <Skeleton className="aspect-[4/3] w-full rounded-none bg-zinc-900" />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-3/5 bg-zinc-900" />
                  <Skeleton className="h-6 w-1/5 bg-zinc-900" />
                </div>
                <Skeleton className="h-4 w-full bg-zinc-900" />
                <Skeleton className="h-4 w-4/5 bg-zinc-900" />
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between">
                 <Skeleton className="h-4 w-20 bg-zinc-900" />
                 <Skeleton className="h-8 w-28 bg-zinc-900" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}