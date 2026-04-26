"use client"

import { useGetProductsQuery } from "@/app/redux/slices/ApiSlice"
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GettAllProdact() {
  const { data, isLoading } = useGetProductsQuery();
  const products = data?.data?.result?.result || [];

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP Entry Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header parallax entry
      gsap.fromTo(headerRef.current, 
        { opacity: 0, scale: 0.95, y: 50 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power4.out" }
      );

      // We need to wait for rendering if products are loaded
      if (!isLoading && products.length > 0) {
        const cards = gsap.utils.toArray(".product-card-wrap");
        
        ScrollTrigger.batch(cards, {
          onEnter: (elements) => {
            gsap.fromTo(elements, 
              { opacity: 0, y: 100, rotationX: -15 },
              { 
                opacity: 1, 
                y: 0, 
                rotationX: 0,
                duration: 1, 
                stagger: 0.1, 
                ease: "power3.out",
                transformPerspective: 1000
              }
            );
          },
          start: "top 85%",
          once: true
        });
      }
    });

    return () => ctx.revert();
  }, [isLoading, products.length]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 overflow-x-hidden">
      {/* Header Section */}
      <div ref={headerRef} className="w-full px-6 md:px-12 lg:px-20 mb-20 md:mb-32 flex flex-col items-center text-center">
        <p className="text-accent uppercase tracking-widest text-sm font-semibold mb-6 flex items-center gap-3">
          <span className="w-12 h-[1px] bg-accent"></span> Equipment Database <span className="w-12 h-[1px] bg-accent"></span>
        </p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-6 leading-none">
          Industrial Catalog<span className="text-accent">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
          Explore our complete range of premium equipment, heavy-duty tools, and advanced furniture finishes engineered for absolute peak performance.
        </p>
      </div>

      {/* Main Layout: Sticky Sidebar Filters + Grid */}
      <div className="w-full px-6 md:px-12 lg:px-20 flex flex-col md:flex-row gap-12 relative">
        
        {/* Filters Sidebar (Sticky) */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="sticky top-32 bg-card/50 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between font-mono text-sm uppercase tracking-widest text-muted-foreground border-b border-border pb-4 mb-6">
              <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</span>
              <SlidersHorizontal className="w-4 h-4 text-accent" />
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center justify-between">Categories <ChevronDown className="w-4 h-4 text-muted-foreground" /></h3>
                <ul className="space-y-3 text-base text-foreground/80">
                  <li className="flex items-center gap-3 cursor-pointer group"><input type="checkbox" className="w-5 h-5 rounded border-border text-accent focus:ring-accent" /> <span className="group-hover:text-accent transition-colors">Power Tools</span></li>
                  <li className="flex items-center gap-3 cursor-pointer group"><input type="checkbox" className="w-5 h-5 rounded border-border text-accent focus:ring-accent" /> <span className="group-hover:text-accent transition-colors">Furniture Paints</span></li>
                  <li className="flex items-center gap-3 cursor-pointer group"><input type="checkbox" className="w-5 h-5 rounded border-border text-accent focus:ring-accent" /> <span className="group-hover:text-accent transition-colors">Hand Equipment</span></li>
                </ul>
              </div>
              
              <div className="pt-6 border-t border-border">
                <h3 className="font-bold text-lg mb-4 flex items-center justify-between">Price Range <ChevronDown className="w-4 h-4 text-muted-foreground" /></h3>
                {/* Dummy slider representation */}
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mt-6 shadow-inner">
                  <div className="w-1/2 h-full bg-accent" />
                </div>
                <div className="flex justify-between text-sm mt-3 text-muted-foreground font-mono">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1" ref={gridRef}>
          {/* Sorting Header */}
          <div className="flex justify-between items-center mb-8 border-b border-border pb-6">
            <p className="text-base text-muted-foreground font-medium">{isLoading ? "Synchronizing database..." : `Displaying ${products.length} precision models`}</p>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider cursor-pointer">
              Sort by: <span className="text-accent underline underline-offset-8 decoration-accent/50 hover:decoration-accent transition-colors">Elite First</span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="product-card-wrap">
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product._id} className="product-card-wrap transform-gpu">
                  <ProductCard products={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}