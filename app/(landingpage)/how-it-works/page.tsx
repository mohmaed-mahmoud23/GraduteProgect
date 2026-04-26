"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGetCategoriesQuery } from "@/app/redux/slices/ApiSlice";
import SplineViewer from "@/components/SplineViewer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = (data?.data as any)?.result?.result || [];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered Title Reveal
      gsap.fromTo(".how-title span",
        { y: 120, rotateX: -30, opacity: 0 },
        { 
          y: 0, 
          rotateX: 0, 
          opacity: 1, 
          duration: 1.5, 
          stagger: 0.2, 
          ease: "expo.out" 
        }
      );

      // Cinematic entrance for text
      textRefs.current.forEach((text) => {
        if (!text) return;
        gsap.fromTo(text,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [categories]);

  return (
    <div ref={containerRef} className="bg-background min-h-screen pt-32 pb-40 text-foreground overflow-hidden">

      {/* 3D Intro Section */}
      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center -mt-32">
        <div className="absolute inset-0 z-0 opacity-40">
          <SplineViewer
            url="https://prod.spline.design/6Wq1Q7YGyM-iab9I/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4 pointer-events-none">
          <p className="text-accent uppercase tracking-[0.4em] text-sm font-bold mb-6">The Science of Engineering</p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-none how-title flex flex-col">
            <span className="block">How It</span> 
            <span className="block text-accent">Works.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Every molecule of our furniture paints and every gear in our hand tools is designed with absolute mathematical precision. We don&apos;t just build tools; we engineer ecosystems.
          </p>
        </div>
      </section>

      {/* Anatomy of our Categories (Real Data integration) */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <h2 ref={el => { textRefs.current[0] = el; }} className="text-5xl md:text-7xl font-bold mb-20 text-center tracking-tighter">
          The Anatomy of <span className="text-accent underline underline-offset-[16px] decoration-accent/30 tracking-tighter">Al-Masanae</span>
        </h2>

        {isLoading ? (
          <div className="flex justify-center"><div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="flex flex-col gap-32">
            {categories.map((cat: any, i: number) => (
              <div key={cat._id} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}>
                <div className="flex-1 w-full relative h-[400px] md:h-[600px] border border-border/50 rounded-3xl overflow-hidden bg-card group">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  {cat.image?.secure_url ? (
                    <img src={cat.image.secure_url} alt={cat.name} className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000 transform group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono uppercase tracking-widest bg-secondary/50">Core System: {cat.name}</div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-accent font-mono uppercase tracking-widest text-sm mb-4">Phase 0{i + 1}</p>
                  <h3 ref={el => { textRefs.current[i + 1] = el; }} className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-none">{cat.name}</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                    {cat.name.toLowerCase().includes('paint') ?
                      "Our composite resin matrix bonds at the molecular level, resisting thermal shock, heavy impact, and chemical abrasion. It is formulated to dry in extreme conditions while maintaining a flawless matte or gloss finish." :
                      cat.name.toLowerCase().includes('tool') ?
                        "Forged from aerospace-grade tungsten steel, our mechanical tools feature anti-vibration ergonomics. Real-time torque stabilization ensures maximum force translation without compromising user agility." :
                        "Engineered to bypass the limitations of traditional manufacturing. We integrate industrial-strength materials with uncompromising safety tolerances, creating equipment that outlasts the job itself."}
                  </p>
                  <div className="flex gap-4">
                    <span className="px-4 py-2 border border-border rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground">Durability</span>
                    <span className="px-4 py-2 border border-border rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground">Precision</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
