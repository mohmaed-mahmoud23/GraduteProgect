"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/app/redux/slices/ApiSlice";
import { Loader2, Plus, Search, MoreVertical, Package, Tag, Layers, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import UpdateProductDialog from "@/components/UpdateProductDialog";

export default function GetAllProducts() {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const router = useRouter();
    const { data, isLoading, error } = useGetProductsQuery();

    const products = (data?.data as any)?.result?.result || [];
    console.log(products)
    return (
        <div className="p-8 min-h-screen bg-transparent">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Products
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Inventory management and stock control
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search products..." className="pl-10 h-11 rounded-xl bg-background/50 backdrop-blur-sm border-muted-foreground/20 focus-visible:ring-primary/30" />
                    </div>
                    <Button
                        onClick={() => router.push("/dashboard/products/createproduct")}
                        className="h-11 px-6 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 active:scale-95"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Product
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="relative h-full">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <Loader2 className="w-12 h-12 animate-spin text-primary" />
                        <p className="text-muted-foreground mt-4 font-medium">Loading inventory...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-3xl border-destructive/20 bg-destructive/5 p-10">
                        <p className="text-destructive font-semibold text-lg">Failed to load products</p>
                        <Button variant="outline" className="mt-4 rounded-xl" onClick={() => window.location.reload()}>Try Again</Button>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-3xl border-muted-foreground/20 bg-muted/5 p-10">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                            <Package className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-xl font-medium">Your inventory is empty</p>
                        <Button variant="link" className="mt-2 text-primary" onClick={() => router.push("/dashboard/products/createproduct")}>Add your first product</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product: any) => (
                            <Card
                                key={product._id}
                                className="group overflow-hidden rounded-2xl border-muted/20 bg-background/50 backdrop-blur-md hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 relative"
                            >
                                <CardContent className="p-0">
                                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="bg-white/80 backdrop-blur-md shadow-sm"
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setOpen(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                    <div className="relative aspect-square overflow-hidden bg-muted/30">
                                        {product.attachments?.[0]?.secure_url || product.images?.[0]?.secure_url ? (
                                            <Image
                                                src={product.attachments?.[0]?.secure_url || product.images?.[0]?.secure_url}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                No image
                                            </div>
                                        )}

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            {product.discountPercent > 0 && (
                                                <Badge className="bg-destructive hover:bg-destructive text-white border-none rounded-lg px-2 py-1">
                                                    -{product.discountPercent}% OFF
                                                </Badge>
                                            )}
                                            <Badge variant="secondary" className="bg-background/80 backdrop-blur-md text-xs font-bold rounded-lg px-2 py-1 uppercase tracking-tighter">
                                                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
                                            </Badge>
                                        </div>

                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full">
                                                <Tag className="w-3 h-3" />
                                                {(product.brand as any)?.name || "Generic"}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                                <Layers className="w-3 h-3" />
                                                {(product.category as any)?.name || "Misc"}
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>

                                        <div className="mt-4 flex items-end justify-between">
                                            <div>
                                                <p className="text-xs text-muted-foreground line-through decoration-destructive/50">
                                                    ${product.originalPrice}
                                                </p>
                                                <p className="text-2xl font-black text-foreground tracking-tighter">
                                                    ${product.finalPrice || product.originalPrice}
                                                </p>
                                            </div>
                                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary text-muted-foreground">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <UpdateProductDialog
                    open={open}
                    setOpen={setOpen}
                    product={selectedProduct}
                />
            </div>
        </div >
    );
}
