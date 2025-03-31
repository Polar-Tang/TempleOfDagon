import { Skeleton } from "@/components/ui/skeleton"
import { CardContent, CardFooter } from "../ui/card"

export function SkeletonCard() {
    return (
        <div className="w-full overflow-hidden border-none shadow-none bg-trasparent">
            <CardContent className="p-4 flex flex-col items-center">
                <div className="mb-2 h-48 w-full relative flex items-center justify-center">
                    <Skeleton className="object-fit w-full h-full rounded-lg" />
                </div>
            <div className="text-center space-y-1">
                <Skeleton className="text-lg text-white font-medium" >
                0$
                </Skeleton>
                <br />

            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
                <Skeleton className="text-lg font-bold text-white" >
                0$
                </Skeleton>
            </div>
            <div className="flex items-center justify-center text-sm text-gray-700 mt-1">
            <Skeleton className="font-semibold text-white inline">blaxt</Skeleton>
            <div className="flex items-center ml-1">
              <Skeleton className="text-xs inline">precio</Skeleton>
            </div>
          </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
        <Skeleton className="w-full bg-navy-blue hover:bg-navy-blue/90 text-white">ver más</Skeleton>
      </CardFooter>
        </div>
    )
}
