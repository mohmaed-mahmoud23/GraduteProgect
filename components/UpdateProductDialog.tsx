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
import { ScrollArea } from "@/components/ui/scroll-area";

import { useUpdateProductMutation } from "@/app/redux/slices/ApiSlice";
import { updateProductSchema, UpdateProductFormValues } from "@/lib/zodAuth";
import { Textarea } from "@/components/ui/textarea";

export default function UpdateProductDialog({ open, setOpen, product }: any) {
    const [updateProduct, { isLoading }] = useUpdateProductMutation();

    const form = useForm<UpdateProductFormValues>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: product?.name || "",
            description: product?.description || "",
            brand: product?.brand?._id || "",
            category: product?.category?._id || "",
            originalPrice: product?.originalPrice || "",
            discountPercent: product?.discountPercent || "",
            stock: product?.stock || "",
        },
    });

    const onSubmit = async (data: UpdateProductFormValues) => {
        try {
            await updateProduct({
                id: product._id,
                ...(data.name && { name: data.name }),
                ...(data.description && { description: data.description }),
                ...(data.brand && { brand: data.brand }),
                ...(data.category && { category: data.category }),
                ...(data.originalPrice !== "" && { originalPrice: data.originalPrice }),
                ...(data.discountPercent !== "" && { discountPercent: data.discountPercent }),
                ...(data.stock !== "" && { stock: data.stock }),
            }).unwrap();

            toast.success("Product updated ✅");
            setOpen(false);
        } catch (err: any) {
            toast.error(err?.data?.message || "Error ❌");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="rounded-2xl sm:max-w-[600px] h-full max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Update Product</DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-[calc(90vh-100px)] px-1">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 pb-6">
                            {/* NAME */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Product Name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* DESCRIPTION */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Product Description" rows={4} className="resize-none" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                       


                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* PRICE */}
                                <FormField
                                    control={form.control}
                                    name="originalPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="0.00" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* DISCOUNT */}
                                <FormField
                                    control={form.control}
                                    name="discountPercent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Discount (%)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="0" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* STOCK */}
                                <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="0" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full mt-6">
                                {isLoading ? <Loader2 className="animate-spin" /> : "Update Product"}
                            </Button>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
