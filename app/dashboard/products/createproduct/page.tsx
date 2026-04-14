"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2, Sparkles, Image as ImageIcon, Box, Tag, DollarSign, Archive } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createProductSchema, CreateProductFormValues } from "@/lib/zodAuth";
import { usePostproductMutation, useGetBrandsQuery, useGetCategoriesQuery } from "@/app/redux/slices/ApiSlice";

export default function CreateProductPage() {
  const router = useRouter();
  const { data: brandsData, isLoading: isLoadingBrands } = useGetBrandsQuery();
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const [createProduct, { isLoading: isCreating }] = usePostproductMutation();

  const brands = (brandsData?.data as any)?.result?.result || [];
  const categories = (categoriesData?.data as any)?.result?.result || [];

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      originalPrice: 0,
      discountPercent: 0,
      stock: 0,
      attachments: undefined as unknown as File[],
    },
  });

  const onSubmit = async (data: CreateProductFormValues) => {
    try {
      await createProduct(data).unwrap();
      toast.success("Product created successfully! 🚀");
      form.reset();
      router.push("/dashboard/products");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to create product ❌");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-transparent flex justify-center">
      <Card className="w-full max-w-4xl rounded-3xl border-none shadow-2xl bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden">
        <CardHeader className="p-10 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
              <Box className="w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-4xl font-black tracking-tighter">Create Product</CardTitle>
              <CardDescription className="text-lg">Add a new masterpiece to your collection.</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-10 pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Column: Core Info */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <Tag className="w-4 h-4 text-primary" /> Product Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. Ultra Comfort Sneakers" 
                            className="h-12 rounded-xl bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/30" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell the world about this product..." 
                            className="min-h-[150px] rounded-xl bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/30" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column: Relationships & Inventory */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                             Brand
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl bg-background/50 border-muted-foreground/20">
                                <SelectValue placeholder={isLoadingBrands ? "..." : "Select Brand"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-muted/20 shadow-xl">
                              {brands.map((brand: any) => (
                                <SelectItem key={brand._id} value={brand._id} className="rounded-lg">
                                  {brand.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                             Category
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl bg-background/50 border-muted-foreground/20">
                                <SelectValue placeholder={isLoadingCategories ? "..." : "Select Category"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-muted/20 shadow-xl">
                              {categories.map((cat: any) => (
                                <SelectItem key={cat._id} value={cat._id} className="rounded-lg">
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="originalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                             <DollarSign className="w-4 h-4 text-primary" /> Price
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              className="h-12 rounded-xl bg-background/50 border-muted-foreground/20" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discountPercent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Discount %</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              className="h-12 rounded-xl bg-background/50 border-muted-foreground/20" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                           <Archive className="w-4 h-4 text-primary" /> Current Stock
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            className="h-12 rounded-xl bg-background/50 border-muted-foreground/20" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* ── Multi-Image Upload ── */}
              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => {
                  const selectedFiles: File[] = field.value ?? [];

                  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const newFiles = Array.from(e.target.files ?? []);
                    if (newFiles.length === 0) return;
                    // Merge with existing, skip duplicates by name + size
                    const merged = [...selectedFiles];
                    newFiles.forEach((nf) => {
                      const isDup = merged.some((ef) => ef.name === nf.name && ef.size === nf.size);
                      if (!isDup) merged.push(nf);
                    });
                    field.onChange(merged);
                    e.target.value = ""; // reset so same file can be re-added after removal
                  };

                  const removeFile = (index: number) => {
                    const updated = selectedFiles.filter((_, i) => i !== index);
                    field.onChange(updated.length > 0 ? updated : (undefined as unknown as File[]));
                  };

                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-primary" /> Product Images
                        <span className="text-xs font-normal text-muted-foreground/60 ml-1">(select one or more)</span>
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          {/* Clickable drop-zone */}
                          <label
                            htmlFor="product-images-input"
                            className="flex flex-col items-center justify-center w-full min-h-[120px] rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-all cursor-pointer group"
                          >
                            <ImageIcon className="w-8 h-8 text-primary/40 group-hover:text-primary/70 transition-colors mb-2" />
                            <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                              Click to select images
                            </span>
                            <span className="text-xs text-muted-foreground/50 mt-1">
                              PNG, JPG, WEBP · Multiple allowed
                            </span>
                            <Input
                              id="product-images-input"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>

                          {/* Thumbnails */}
                          {selectedFiles.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                              {selectedFiles.map((file, index) => {
                                const url = URL.createObjectURL(file);
                                return (
                                  <div
                                    key={`${file.name}-${index}`}
                                    className="relative group rounded-xl overflow-hidden border border-muted/30 aspect-square shadow-sm"
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={url}
                                      alt={file.name}
                                      className="w-full h-full object-cover"
                                      onLoad={() => URL.revokeObjectURL(url)}
                                    />
                                    {/* Hover overlay with remove button */}
                                    <button
                                      type="button"
                                      onClick={() => removeFile(index)}
                                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                                      aria-label={`Remove ${file.name}`}
                                    >
                                      <span className="text-white text-xs font-bold bg-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">✕</span>
                                    </button>
                                    {/* Index badge */}
                                    <span className="absolute top-1 left-1 text-[10px] font-bold bg-black/60 text-white rounded-full px-1.5 py-0.5">
                                      {index + 1}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {selectedFiles.length > 0 && (
                            <p className="text-xs text-muted-foreground/60">
                              {selectedFiles.length} image{selectedFiles.length > 1 ? "s" : ""} selected · hover a thumbnail to remove it
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="pt-6 flex justify-end gap-4 border-t border-muted/20">
                <Button 
                    type="button" 
                    variant="ghost" 
                    className="h-14 px-8 rounded-2xl font-bold"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isCreating}
                    className="h-14 px-12 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center gap-3 active:scale-95"
                >
                    {isCreating ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-6 h-6" />
                            Launch Product
                        </>
                    )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
