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

import { Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

import { useUpdateCategoryMutation } from "@/app/redux/slices/ApiSlice";
import { updateCategorySchema, UpdateCategoryFormValues } from "@/lib/zodAuth";

export default function UpdateCategoryDialog({ open, setOpen, category }: any) {
    const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

    const form = useForm<UpdateCategoryFormValues>({
        resolver: zodResolver(updateCategorySchema),
        defaultValues: {
            name: category?.name || "",
            slug: category?.slug || "",
            brand: category?.brand?._id || "",
        },
    });

    const onSubmit = async (data: UpdateCategoryFormValues) => {
        try {
            await updateCategory({
                id: category._id,
                name: data.name,
                slug: data.slug,
                ...(data.brand && { brands: [data.brand] }),
            }).unwrap();

            toast.success("Category updated ✅");
            setOpen(false);
        } catch (err: any) {
            toast.error(err?.data?.message || "Error ❌");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="rounded-2xl sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>Update Category</DialogTitle>
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
                                        <Input {...field} placeholder="Category Name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* SLUG */}
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="category-slug" />
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
