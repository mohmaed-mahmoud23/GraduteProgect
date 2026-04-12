"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

import { Loader2, Sparkles, Image as ImageIcon, FolderPlus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createCategorySchema, CreateCategoryFormValues } from "@/lib/zodAuth";
import { usePostcategoryMutation, useGetBrandsQuery } from "@/app/redux/slices/ApiSlice";

export default function CreateCategoryPage() {
    const router = useRouter();
    const { data: brandsData, isLoading: isLoadingBrands } = useGetBrandsQuery();
    const [createCategory, { isLoading: isCreating }] = usePostcategoryMutation();

    const brands = (brandsData?.data as any)?.result?.result || [];

    const form = useForm<CreateCategoryFormValues>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: "",
            brand: "",
            attachment: undefined as unknown as File,
            slug :""
        },
    });

    const onSubmit = async (data: CreateCategoryFormValues) => {
        try {
await createCategory({
  name: data.name,
  slug: data.slug,
  brands: [data.brand], // ✅ صح
  attachment: data.attachment!,
});
            toast.success("Category created successfully! ✨");
            form.reset();
            router.push("/dashboard/categories");
        } catch (err: any) {
            toast.error(err?.data?.message || "Error creating category ❌");
        }
    };

    return (
      <div className="flex min-h-screen items-center justify-center p-6 bg-transparent">
        <Dialog
          open={true}
          onOpenChange={() => router.push("/dashboard/categories")}
        >
          <DialogContent className="sm:max-w-[500px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
            <div className="bg-gradient-to-br from-primary/10 via-background to-background p-8">
              <DialogHeader className="mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 text-primary">
                  <FolderPlus className="w-6 h-6" />
                </div>
                <DialogTitle className="text-3xl font-bold tracking-tight">
                  Create Category
                </DialogTitle>
                <DialogDescription className="text-muted-foreground pt-1">
                  Categorize your products by linking them to a brand.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* NAME */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-foreground/70">
                          Category Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Smartphones, Shoes, Electronics"
                            className="h-12 rounded-xl bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* slug */}
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-foreground/70">
                          slug Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Smartphones, Shoes, Electronics"
                            className="h-12 rounded-xl bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* BRAND SELECTION */}
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-foreground/70">
                          Select Brand
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl bg-background/50 border-muted-foreground/20 focus:ring-primary/30">
                              <SelectValue
                                placeholder={
                                  isLoadingBrands
                                    ? "Loading brands..."
                                    : "Select a brand"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-muted/20 shadow-xl">
                            {brands.map((brand) => (
                              <SelectItem
                                key={brand._id}
                                value={brand._id}
                                className="rounded-lg py-2 cursor-pointer"
                              >
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* IMAGE */}
                  <FormField
                    control={form.control}
                    name="attachment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-foreground/70">
                          Category Image
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="file"
                              accept="image/*"
                              className="h-12 rounded-xl bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/30 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all pr-10"
                              name={field.name}
                              ref={field.ref}
                              onBlur={field.onBlur}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                }
                              }}
                            />
                            <ImageIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    disabled={isCreating}
                    className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all mt-4"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        Creating Category...
                      </>
                    ) : (
                      "Create Category"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
}
