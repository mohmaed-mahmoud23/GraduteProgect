"use client";

import Image from "next/image";
import { useGetCartQuery } from "@/app/redux/slices/ApiSlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GetAcrtuser() {
  const { data, isLoading } = useGetCartQuery();

  const products = data?.data?.cart?.products || [];
  const hasProducts = products.length > 0;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      {/* المنتجات */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products
          .filter((item) => item.productId) // يمنع null products
          .map((item) => (
            <div
              key={item._id}
              className="border rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-[150px]">
                <Image
                  src={
                    item.productId?.images?.[0]?.secure_url ||
                    "/placeholder.png"
                  }
                  alt={item.productId?.name || "product"}
                  fill
                  className="object-contain"
                />
              </div>

              <h2 className="font-semibold mt-2 line-clamp-1">
                {item.productId?.name || "Deleted Product"}
              </h2>

              <p className="text-sm text-gray-500">
                Price: {item.productId?.salePrice || 0}
              </p>

              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
          ))}
      </div>

      {/* Checkout Section 🔥 */}
      <div className="mt-8 flex items-center justify-between bg-gradient-to-r from-black to-gray-800 p-4 rounded-2xl shadow-xl">
        <div>
          <p className="text-lg font-semibold text-white">
            {hasProducts ? "Checkout?" : "Cart"}
          </p>
          <p className="text-sm text-gray-300">
            {hasProducts ? "Continue to payment" : "Cart is empty"}
          </p>
        </div>

        <Link href={"/Creatorder"}>
          <Button
            variant={"ghost"}
            disabled={!hasProducts}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300
              ${
                hasProducts
                  ? "text-black bg-white hover:bg-gray-200"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
          >
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
