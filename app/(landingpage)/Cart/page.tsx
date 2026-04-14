"use client";

import Image from "next/image";
import { useGetCartQuery } from "@/app/redux/slices/ApiSlice";

export default function GetAcrtuser() {
  const { data, isLoading } = useGetCartQuery();

  const products = data?.data.cart.products;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      {products?.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg p-3 shadow-sm"
        >
          {/* Image */}
          <div className="relative h-[150px]">
            <Image
              src={
                item.productId.images?.[0]?.secure_url ||
                "/placeholder.png"
              }
              alt={item.productId.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Name */}
          <h2 className="font-semibold mt-2">
            {item.productId.name}
          </h2>

          {/* Price */}
          <p className="text-sm">
            Price: {item.productId.salePrice}
          </p>

          {/* Quantity */}
          <p className="text-sm">
            Quantity: {item.quantity}
          </p>
        </div>
      ))}
    </div>
  );
}