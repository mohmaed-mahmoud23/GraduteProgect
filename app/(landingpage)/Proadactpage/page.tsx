"use client"

import {  useGetProductsQuery } from "@/app/redux/slices/ApiSlice"
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function GettAllProdact(){
const { data, isLoading } = useGetProductsQuery();

const products  = data?.data?.result?.result || [];


   if (isLoading) {
     return (
       <div className="px-2 py-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
         {Array.from({ length: 10 }).map((_, i) => (
           <ProductCardSkeleton key={i} />
         ))}
       </div>
     );
   }

   return (
     <div className="      px-12 py-14   grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-5  ">
       {products.map((products) => (
         <ProductCard key={products._id} products={products} />
       ))}
     </div>
   );
}