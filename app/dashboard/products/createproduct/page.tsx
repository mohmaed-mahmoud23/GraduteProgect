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

import { Plus, Loader2, Sparkles, Image as ImageIcon, Box, Tag, Layers, DollarSign, Archive } from "lucide-react";
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
      attachments: undefined as unknown as File,
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
                              {brands.map((brand) => (
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
                              {categories.map((cat) => (
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

                  <FormField
                    control={form.control}
                    name="attachments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            Product Image
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="file"
                              accept="image/*"
                              className="h-12 rounded-xl bg-background/50 border-muted-foreground/20 file:bg-primary/10 file:text-primary file:rounded-lg file:border-none file:px-3 file:mr-4 cursor-pointer"
                              onChange={(e) => field.onChange(e.target.files?.[0])}
                            />
                            <ImageIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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
