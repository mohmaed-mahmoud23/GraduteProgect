"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { createBrandSchema, CreateBrandFormValues } from "@/lib/zodAuth";
import { usePostbrandMutation } from "@/app/redux/slices/ApiSlice";

export default function CreateBrandDialog() {
  

const form = useForm<CreateBrandFormValues>({
  resolver: zodResolver(createBrandSchema),
  defaultValues: {
    name: "",
    slogan: "",
    attachment: undefined as unknown as File,
  },
});
const [createBrand, { isLoading }] = usePostbrandMutation();

const onSubmit = async (data: CreateBrandFormValues) => {
  try {
    const result = await createBrand({
      name: data.name,
      slogan: data.slogan,
      attachment: data.attachment!,
    }).unwrap();

    toast.success(result?.message || "Created ✅");
    form.reset();
  } catch (err: any) {
    toast.error(err?.data?.message || "Error ❌");
  }
};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-12 px-6 rounded-xl font-bold">
          <Plus className="w-5 h-5 me-2" />
          Create Brand
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create Brand</DialogTitle>
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
                    <Input className="h-12 rounded-xl" {...field} />
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
                    <Input className="h-12 rounded-xl" {...field} />
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
      <FormLabel>Image</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          className="h-12 rounded-xl"
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl font-bold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 me-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Brand"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
