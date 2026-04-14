import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ProductCardSkeleton() {
  return (
    <Card className="max-w-full rounded-xl overflow-hidden border bg-white shadow animate-pulse">
      {/* Image Skeleton */}
      <div className="h-[220px] bg-gray-100" />

      {/* Content Skeleton */}
      <CardContent className="p-4 space-y-3">
        {/* Brand */}
        <div className="h-3 w-20 bg-gray-200 rounded" />

        {/* Title */}
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-8 bg-gray-200 rounded" />
        </div>

        {/* Category */}
        <div className="h-3 w-24 bg-gray-200 rounded" />

        {/* Price */}
        <div className="h-5 w-20 bg-gray-300 rounded mt-2" />
      </CardContent>

      {/* Footer Skeleton */}
      <CardFooter>
        <div className="h-9 w-full bg-gray-300 rounded-lg" />
      </CardFooter>
    </Card>
  );
}
