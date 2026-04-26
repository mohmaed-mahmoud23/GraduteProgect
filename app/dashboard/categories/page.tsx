"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useGetCategoriesQuery,
  useUpdateCategoryAttachmentMutation,
} from "@/app/redux/slices/ApiSlice";import { Loader2, Plus, Search, MoreVertical, LayoutGrid } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import UpdateCategoryDialog from "@/components/UpdateCategoryDialog";

export default function GetAllCategories() {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
const [updateCategoryAttachment, { isLoading: isUploading }] =
  useUpdateCategoryAttachmentMutation();
    const router = useRouter();
    const { data, isLoading, error } = useGetCategoriesQuery();

    const categories = (data?.data as any)?.result?.result || [];
    console.log(categories)
    return (
      <div className="p-8 min-h-screen bg-transparent">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Categories
            </h1>
            <p className="text-muted-foreground mt-2">
              Organize your products into meaningful groups
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-10 h-11 rounded-xl bg-background/50 backdrop-blur-sm border-muted-foreground/20 focus-visible:ring-primary/30"
              />
            </div>
            <Button
              onClick={() =>
                router.push("/dashboard/categories/createcategory")
              }
              className="h-11 px-6 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 active:scale-95"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Category
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-muted-foreground mt-4 font-medium">
                Loading categories...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-3xl border-destructive/20 bg-destructive/5 p-10">
              <p className="text-destructive font-semibold text-lg">
                Failed to load categories
              </p>
              <Button
                variant="outline"
                className="mt-4 rounded-xl"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-3xl border-muted-foreground/20 bg-muted/5 p-10">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <LayoutGrid className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-xl font-medium">
                No categories found
              </p>
              <Button
                variant="link"
                className="mt-2 text-primary"
                onClick={() =>
                  router.push("/dashboard/categories/createcategory")
                }
              >
                Create your first category
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categories.map((category: any) => (
                <Card
                  key={category._id}
                  className="group overflow-hidden rounded-2xl border-muted/20 bg-background/50 backdrop-blur-md hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 relative"
                >
                  <CardContent className="p-0">
                    <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/80 backdrop-blur-md shadow-sm"
                        onClick={() => {
                          setSelectedCategory(category);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                      {/* زرار تغيير الصورة */}
                      <label className="cursor-pointer">
                        <Button asChild> 
                          <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium  backdrop-blur-md shadow-sm  transition-colors">
                            {isUploading ? "Uploading..." : "Change Image"}
                          </span>
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            await updateCategoryAttachment({
                              id: category._id,
                              attachment: file,
                            });
                          }}
                        />
                      </label>
                    </div>
                    <div className="relative aspect-video overflow-hidden bg-muted/30">
                      {category.image?.secure_url ? (
                        <Image
                          src={category.image.secure_url}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-md"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="font-bold text-xl text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <h3 className="font-bold text-xl text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {category.slug}
                      </h3>
                      {category.brand?.name && (
                        <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mt-2 px-3 py-1 bg-primary/5 rounded-full inline-block">
                          {category.brand.name}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <UpdateCategoryDialog
            open={open}
            setOpen={setOpen}
            category={selectedCategory}
          />
        </div>
      </div>
    );
}
