"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImage {
  _id: string;
  secure_url: string;
  public_id: string;
}

export default function ImageGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(images?.[0]?.secure_url || "");

  if (!images || images.length === 0) return null;

  return (
    <div>
      {/* الصورة الكبيرة */}
      <div className="relative w-full h-[400px] mb-4 bg-gray-100 rounded">
        <Image
          src={active}
          alt="product"
          fill
          className="object-contain"
        />
      </div>

      {/* thumbnails */}
      <div className="flex flex-wrap md:flex-nowrap gap-2">
        {images.map((img) => (
          <div
            key={img._id}
            onClick={() => setActive(img.secure_url)}
            className={`relative w-20 h-20 cursor-pointer border rounded ${
              active === img.secure_url ? "border-black" : "border-gray-300"
            }`}
          >
            <Image
              src={img.secure_url}
              alt="thumbnail"
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}