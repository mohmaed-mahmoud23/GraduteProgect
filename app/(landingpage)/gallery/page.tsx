"use client";

import { useGetProductsQuery } from "@/app/redux/slices/ApiSlice";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplineViewer from "@/components/SplineViewer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GalleryPage() {
  const { data, isLoading } = useGetProductsQuery();
  const products = data?.data?.result?.result || [];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        opacity: 0,
        y: 100,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
          scrub: 1
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [products]);

  return (
    <div ref={containerRef} className="bg-background min-h-screen text-foreground pt-32 pb-40">
      
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-10">
          <div className="max-w-3xl">
            <p className="text-accent font-mono uppercase tracking-[0.4em] mb-4">Visual Catalog</p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
              The <span className="text-foreground/40">Gallery</span> of Excellence.
            </h1>
            <p className="text-muted-foreground text-xl max-w-xl">A curated selection of our highest-performing industrial tools and professional furniture coatings.</p>
          </div>
          <div className="w-full md:w-64 h-64 relative bg-card rounded-full overflow-hidden border border-border/50 hidden lg:block shadow-[0_0_50px_rgba(0,0,0,0.05)]">
             <SplineViewer url="https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode" className="w-full h-full scale-150" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 gallery-grid columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {products.map((item: any) => (
            <motion.div 
              key={item._id}
              whileHover={{ scale: 0.98 }}
              className="gallery-item relative overflow-hidden rounded-[2rem] border border-border bg-card group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {item.images?.[0]?.secure_url ? (
                  <img 
                    src={item.images[0].secure_url} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                ) : (
                   <div className="w-full h-full bg-zinc-900 flex items-center justify-center font-mono text-xs text-neutral-600">No Image Available</div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                   <span className="text-accent font-mono text-xs mb-2 uppercase tracking-widest">{item.category?.name || "Equipment"}</span>
                   <h3 className="text-2xl font-bold mb-4">{item.name}</h3>
                   <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                      <span>View Project</span>
                      <span className="text-2xl">£{item.salePrice || item.originalPrice}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <style jsx>{`
        .text-outline-white {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
      `}</style>

    </div>
  );
}
