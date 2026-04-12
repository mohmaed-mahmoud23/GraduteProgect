"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetBrandsQuery } from "@/app/redux/slices/ApiSlice";
import { Loader2, Plus, Search, MoreVertical } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function GetAllBrands() {
  const router = useRouter();
  const { data, isLoading, error } = useGetBrandsQuery();

  const brands = (data?.data as any)?.result?.result || [];

  return (
    <div className="p-8 min-h-screen bg-transparent">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Brands
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your brand identities and slogans
          </p>
        </div>

        <div className="flex items-center gap-3">
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search brands..." className="pl-10 h-11 rounded-xl bg-background/50 backdrop-blur-sm border-muted-foreground/20 focus-visible:ring-primary/30" />
            </div>
          <Button
            onClick={() => router.push("/dashboard/brands/createprand")}
            className="h-11 px-6 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 active:scale-95"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Brand
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-muted-foreground mt-4 font-medium">Loading brands...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-3xl border-destructive/20 bg-destructive/5 p-10">
            <p className="text-destructive font-semibold text-lg">Failed to load brands</p>
            <Button variant="outline" className="mt-4 rounded-xl" onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : brands.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-3xl border-muted-foreground/20 bg-muted/5 p-10">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Plus className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-xl font-medium">No brands found</p>
            <Button variant="link" className="mt-2 text-primary" onClick={() => router.push("/dashboard/brands/createbrand")}>Create your first brand</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {brands.map((brand: any) => (
              <Card
                key={brand._id}
                className="group overflow-hidden rounded-2xl border-muted/20 bg-background/50 backdrop-blur-md hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden bg-muted/30">
                    {brand.image?.secure_url ? (
                      <Image
                        src={brand.image.secure_url}
                        alt={brand.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-md">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-xl text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {brand.slogan || "Building the future"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
