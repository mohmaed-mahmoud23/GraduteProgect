"use client";

import React from "react";
import ImageGallery from "@/components/ImageGallery";
import { useGetsingelprodactQuery } from "@/app/redux/slices/ApiSlice";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import AddToCartButton from "@/components/AddToCartButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Prodactdetails = ({ params }: PageProps) => {
  const { id } = React.use(params);

  const { data, isLoading } = useGetsingelprodactQuery(id);

  if (isLoading) return <ProductCardSkeleton />;
  if (!data) return <p>No product found</p>;

  const product = data.data.product;
  const inStock = product.stock > 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* TOP */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* IMAGES (زي ما هي) */}
        <ImageGallery images={product.images} />

        {/* INFO */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-600">{product.description}</p>

          {/* PRICES */}
          <div className="flex gap-3 items-center">
            <p className="text-2xl font-bold">${product.salePrice}</p>

            <p className="line-through text-gray-400">
              ${product.originalPrice}
            </p>

            <span className="text-red-500 text-sm">
              -{product.discountPercent}%
            </span>
          </div>

          {/* STOCK */}
          <p className={inStock ? "text-green-600" : "text-red-600"}>
            {inStock ? `Stock: ${product.stock}` : "Out of Stock"}
          </p>

          <p className="text-sm text-gray-500">Sold: {product.soldItems}</p>

          <p className="text-sm text-gray-500">Slug: {product.slug}</p>
             <p>
          <b>Created At:</b> {new Date(product.createdAt).toLocaleString()}
        </p>

        </div>
      </div>

      {/* RAW DATA SECTION (زي ما انت عايز IDs) */}
  <AddToCartButton productId={product._id}/>
    </div>
  );
};

export default Prodactdetails;
