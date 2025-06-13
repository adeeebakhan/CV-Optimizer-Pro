
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeletons() {
  return (
    <div className="space-y-8 w-full">
      {/* Score Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-3/5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-2/5 mb-2" />
            <Skeleton className="h-3 w-full" />
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-3/5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-2/5 mb-2" />
            <Skeleton className="h-3 w-full" />
          </CardContent>
        </Card>
      </div>

      {/* Optimized CV Skeleton */}
      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-7 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-40 w-full" />
        </CardContent>
        <CardContent> {/* Using CardContent for footer-like spacing */}
           <Skeleton className="h-10 w-48" />
        </CardContent>
      </Card>

      {/* Skill Gaps & Recommendations Skeleton */}
      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-7 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6 mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div>
            <Skeleton className="h-6 w-1/3 mb-3" />
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="p-3 border rounded-md bg-background">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-8 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
