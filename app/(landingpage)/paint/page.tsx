"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGetCategoriesQuery } from "@/app/redux/slices/ApiSlice";
import SplineViewer from "@/components/SplineViewer";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PaintPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetCategoriesQuery();
  const [showBottomSpline, setShowBottomSpline] = useState(false);

  const categories = (data?.data as any)?.result?.result || [];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Unified Animations (using GSAP instead of framer-motion)
      const tl = gsap.timeline();
      
      tl.fromTo(".subtitle-anim", 
        { opacity: 0, letterSpacing: "0.2em" },
        { opacity: 1, letterSpacing: "0.5em", duration: 1, ease: "power2.out", delay: 0.2 }
      )
      .fromTo(".paint-title span",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "expo.out" },
        "-=0.5"
      )
      .fromTo(".desc-anim",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        "-=0.8"
      );

      // 2. Hardware Accelerated Grid Scroll
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        gsap.fromTo(section,
          { opacity: 0, y: 80, scale: 0.98 },
          {
            opacity: 1, 
            y: 0, 
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "bottom 80%",
              scrub: 1, // Smooth scrub
            }
          }
        );
      });

      // 3. Lazy Load Secondary WebGL Canvas
      if (bottomSectionRef.current) {
        ScrollTrigger.create({
          trigger: bottomSectionRef.current,
          start: "top 120%",
          onEnter: () => setShowBottomSpline(true),
        });
      }

    }, containerRef);
    
    return () => ctx.revert();
  }, [categories]);

  return (
    <div ref={containerRef} className="bg-background min-h-screen text-foreground overflow-hidden pb-40">

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 perspective-1000">
        <div className="absolute inset-0 z-0 opacity-70 transform-gpu translate-z-0">
          <SplineViewer url="https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode" className="w-full h-full cursor-grab active:cursor-grabbing" />
        </div>

        <div className="relative z-10 max-w-5xl pointer-events-none mt-20 transform-style-3d">
          <p className="subtitle-anim text-accent uppercase text-xs md:text-sm font-bold mb-8 opacity-0">
            The Art of Coating
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-300 to-neutral-800 paint-title flex flex-col items-center">
            <span className="block drop-shadow-lg">Liquid</span> 
            <span className="block italic pr-8">Armor.</span>
          </h1>
          <p className="desc-anim text-lg md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed shadow-background/50 drop-shadow-xl opacity-0">
            Indestructible furniture finishes and industrial pigments. We don&apos;t just cover surfaces; we protect investments with molecular-bonded resilience.
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <h2 className="text-5xl md:text-7xl font-bold mb-24 tracking-tighter">
          Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/50 underline underline-offset-[12px] decoration-accent/20">Glossary.</span>
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat: any, i: number) => (
              <div
                key={cat._id}
                ref={(el) => { sectionRefs.current[i] = el; }}
                // Redesigned Card: Removed muddy blurry full-screen backgrounds.
                className="group relative h-[450px] lg:h-[500px] rounded-[2rem] border border-border bg-card/40 flex flex-col overflow-hidden transition-colors duration-500 hover:border-accent/40 shadow-xl hover:shadow-2xl hover:bg-card transform-gpu translate-z-0 will-change-transform"
              >
                {/* Clean Image Container (Top Half) */}
                <div className="relative w-full h-[60%] bg-white/5 border-b border-white/5 flex items-center justify-center overflow-hidden p-6">
                  
                  {/* Subtle background glow for the image box */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-0"></div>
                  
                  {cat.image?.secure_url ? (
                    // Using object-contain ensures random aspect ratios (like isolated products or screenshots) look perfect and aren't stretched/cut.
                    <div className="relative w-full h-full z-10 transition-transform duration-700 group-hover:scale-110">
                      <Image
                        src={cat.image.secure_url}
                        alt={cat.name}
                        fill
                        className="object-contain drop-shadow-xl"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center opacity-30">
                       <span className="text-[10px] font-mono tracking-widest uppercase">No Visual</span>
                    </div>
                  )}
                </div>

                {/* Text Content (Bottom Half) */}
                <div className="relative z-20 flex-1 flex flex-col p-8 justify-between bg-card/60 backdrop-blur-md">
                  <div>
                    <span className="text-accent font-mono text-[10px] uppercase tracking-widest mb-3 block border border-accent/20 w-fit px-3 py-1 rounded-full bg-background">Formulation // 0{i + 1}</span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight group-hover:text-accent transition-colors line-clamp-1">{cat.name}</h3>
                    <p className="text-neutral-400 text-sm max-w-xs group-hover:text-neutral-200 transition-colors duration-500 line-clamp-2">
                       {/* Hardcoded descriptive placeholder or actual description if available */}
                       High-performance industrial grade materials engineered for maximum resilience and visual perfection.
                    </p>
                  </div>
                  
                  {/* Accent Line */}
                  <div className="h-[2px] w-8 group-hover:w-full bg-accent transition-all duration-700 ease-out mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Technical Spec Banner (With Lazy WebGL) */}
      <section ref={bottomSectionRef} className="mt-40 px-6 max-w-7xl mx-auto">
        <div className="min-h-[400px] w-full bg-card/5 border border-white/5 rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-2xl">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full mix-blend-screen pointer-events-none transform-gpu translate-z-0" style={{ filter: "blur(120px)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-foreground/5 rounded-full pointer-events-none transform-gpu translate-z-0" style={{ filter: "blur(80px)" }} />

          <div className="flex-1 relative z-10 pointer-events-none">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-500 drop-shadow-sm">Uncompromising <br /> Resilience.</h2>
            <p className="text-neutral-400 max-w-lg mb-10 text-lg leading-relaxed">Our paints are tested against thermal shock, chemical abrasion, and mechanical impact to ensure your furniture remains flawless for decades.</p>
            <button className="px-8 py-4 bg-foreground text-background font-bold uppercase text-xs tracking-[0.2em] rounded-full hover:bg-accent hover:text-white transition-all shadow-xl hover:-translate-y-1 transform-gpu ring-1 ring-white/10 hover:ring-accent/50 pointer-events-auto">Request Catalog</button>
          </div>
          
          <div className="flex-1 h-[300px] md:h-full w-full relative z-10 flex items-center justify-center">
             {showBottomSpline ? (
               <SplineViewer url="https://prod.spline.design/iK-F2Zrt7mY-4rBw/scene.splinecode" className="w-full h-full scale-125" />
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center border border-white/5 rounded-full animate-pulse bg-white/5">
                 <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                 <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Initializing Asset</span>
               </div>
             )}
          </div>
        </div>
      </section>

    </div>
  );
}
