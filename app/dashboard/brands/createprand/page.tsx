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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { Plus, Loader2, Image as ImageIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";

import {
  createBrandSchema,
  CreateBrandFormValues,
} from "@/lib/zodAuth";
import { usePostbrandMutation } from "@/app/redux/slices/ApiSlice";
import { useState } from "react";

export default function CreateBrandPage() {
  const router = useRouter();
  const [createBrand, { isLoading }] = usePostbrandMutation();

  const form = useForm<CreateBrandFormValues>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: "",
      slogan: "",
      attachment: undefined as unknown as File,
    },
  });

  const onSubmit = async (data: CreateBrandFormValues) => {
    try {
      const result = await createBrand(data).unwrap();
      toast.success(result?.message || "Brand created successfully! ✨");
      form.reset();
      router.push("/dashboard/brands");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Something went wrong ❌");
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => router.push("/dashboard/brands")}>
      <DialogContent className="sm:max-w-[450px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-gradient-to-br from-primary/10 via-background to-background p-8">
          <DialogHeader className="mb-6">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 text-primary">
              <Sparkles className="w-6 h-6" />
            </div>
            <DialogTitle className="text-3xl font-bold tracking-tight">
              Create Brand
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-1">
              Enter the details of your brand identity below.
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
                    <FormLabel className="text-sm font-semibold text-foreground/70">Brand Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Apple, Nike, etc."
                        className="h-12 rounded-xl bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SLOGAN */}
              <FormField
                control={form.control}
                name="slogan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-foreground/70">Slogan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Think Different"
                        className="h-12 rounded-xl bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/30"
                        {...field}
                      />
                    </FormControl>
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
                    <FormLabel className="text-sm font-semibold text-foreground/70">Brand Identity (Logo)</FormLabel>
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
                disabled={isLoading}
                className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Creating Brand...
                  </>
                ) : (
                  "Create Brand"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}


