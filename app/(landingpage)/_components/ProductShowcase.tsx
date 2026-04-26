"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Loader2, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetProductsQuery } from "@/app/redux/slices/ApiSlice";

export default function ProductShowcase() {
  const { data, isLoading } = useGetProductsQuery();
  const products = data?.data?.result?.result || [];

  // Show only up to 3 products to keep the minimal premium look
  const displayProducts = products.slice(0, 3);

  return (
    <section className="w-full bg-background py-32 px-6 md:px-20 border-t border-border/10 relative overflow-hidden">
      {/* Optimized Background without heavy blurs to fix paint lag */}
      <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-accent/5 rounded-full pointer-events-none transform-gpu translate-z-0" style={{ filter: "blur(150px)" }} />

      <div className="mx-auto max-w-7xl relative z-10">

        {/* Header Section */}
        <div className="flex flex-col mb-20 md:flex-row md:items-end justify-between gap-8 border-b border-border/10 pb-8">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold flex items-center gap-4 mb-4 uppercase tracking-[0.3em] text-xs">
              <span className="w-8 h-[1px] bg-accent inline-block" />
              Industrial Arsenal
            </p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
              Elite Equipment
            </h2>
          </div>

          <Link href="/Proadactpage" passHref>
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors group"
            >
              Full Catalog
              <span className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.button>
          </Link>
        </div>

        {/* Dynamic Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-1 md:col-span-3 flex justify-center py-32">
              <Loader2 className="w-12 h-12 animate-spin text-accent" />
            </div>
          ) : (
            displayProducts.map((prod: any, idx: number) => {
              return (
                <motion.div
                  key={prod._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.15,
                    ease: [0.16, 1, 0.3, 1] // Apple-like custom ease
                  }}
                  className="group relative flex flex-col h-[550px] bg-card/20 backdrop-blur-md rounded-[2rem] border border-white/5 overflow-hidden transform-gpu hover:bg-card/40 transition-colors duration-500"
                >

                  {/* Performance Fix: Static glow, only animating opacity, NO animating blurs! */}
                  <div className="absolute inset-x-8 top-1/4 h-1/2 rounded-full bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform-gpu translate-z-0" style={{ filter: "blur(60px)" }}></div>

                  {/* Top Bar */}
                  <div className="flex justify-between items-center p-8 z-10">
                    <span className="text-[10px] font-mono uppercase text-muted-foreground/80 tracking-[0.2em] border border-white/10 px-3 py-1 rounded-full bg-background/50">
                      {prod.category?.name || "Hardware"}
                    </span>
                    <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent hover:bg-accent/10 transition-all">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image Container */}
                  <div className="relative z-10 flex-1 flex items-center justify-center p-8">
                    <motion.div
                      whileHover={{ scale: 1.08, y: -10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="relative w-full h-full min-h-[200px] flex items-center justify-center transform-gpu"
                    >
                      {prod.images?.[0]?.secure_url ? (
                        // Using Next/Image with drop shadow filter instead of box-shadow for better performance on masks
                        <Image
                          src={prod.images[0].secure_url}
                          alt={prod.name}
                          fill
                          className="object-contain drop-shadow-2xl"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full border border-white/5 flex items-center justify-center">
                          <span className="text-muted-foreground uppercase text-[10px] tracking-widest font-mono">No Image</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Bottom Info - Brutalist typography */}
                  <div className="p-8 z-10 flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-foreground line-clamp-1 tracking-tight">
                      {prod.name}
                    </h3>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1">MSRP</span>
                        <span className="text-3xl font-light font-mono tracking-tighter">
                          £{prod.salePrice || prod.originalPrice || "0.00"}
                        </span>
                      </div>

                      <button className="w-14 h-14 rounded-2xl bg-foreground text-background flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xl hover:shadow-accent/20">
                        <ShoppingCart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
