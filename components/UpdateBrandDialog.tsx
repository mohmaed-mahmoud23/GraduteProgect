"use client";

import {
  Dialog,
  DialogContent,
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

import { Loader2 } from "lucide-react";
import { toast } from "sonner";


import { useUpdateBrandMutation } from "@/app/redux/slices/ApiSlice";
import { updateBrandSchema, UpdateBrandFormValues } from "@/lib/zodAuth";



export default function UpdateBrandDialog({ open, setOpen, brand }: { open: boolean, setOpen: (v: boolean) => void, brand: { _id: string, name: string, slogan: string } }) {
  const [updateBrand, { isLoading }] = useUpdateBrandMutation();

  const form = useForm<UpdateBrandFormValues>({
    resolver: zodResolver(updateBrandSchema),
    defaultValues: {
      name: brand?.name || "",
      slogan: brand?.slogan || "",
    },
  });

  const onSubmit = async (data: UpdateBrandFormValues) => {
    try {
      await updateBrand({
        id: brand._id,
        name: data.name,
        slogan: data.slogan,
      }).unwrap();

      toast.success("Brand updated ✅");
      setOpen(false);
    } catch (err: unknown) {
      toast.error((err as { data?: { message?: string } })?.data?.message || "Error ❌");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Update Brand</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Slogan</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="animate-spin" /> : "Update"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
