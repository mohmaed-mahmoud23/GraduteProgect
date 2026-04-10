"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GaetAllPrand() {
  const router = useRouter();

  return (
    <div className="p-6 min-h-screen ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Brands</h1>

        <Button
          onClick={() => router.push("/dashboard/brands/createprand")}
          className="px-5 py-2  rounded-xl hover:bg-gray-800 transition"
        >
          + Create Brand
        </Button>
      </div>

      {/* Content */}
      <div className=" rounded-2xl shadow p-10 text-center">
        <p className="text-gray-500 text-lg">No brands yet 😢</p>
      </div>
    </div>
  );
}
