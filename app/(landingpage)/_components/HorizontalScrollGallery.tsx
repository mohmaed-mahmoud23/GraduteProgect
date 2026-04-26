"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGetCategoriesQuery } from "@/app/redux/slices/ApiSlice";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScrollGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = (data?.data as any)?.result?.result || [];

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || categories.length === 0) return;

    let ctx = gsap.context(() => {
      const introBlock = sectionRef.current?.querySelector(".intro-block");
      const panelsArray = gsap.utils.toArray(".horizontal-panel");

      if (panelsArray.length > 0) {
        // --- 1. THE "BEFORE" STATE: High-Quality 3D Stack ---
        // We ensure they are visible on the right 50% of the viewport. Removed initial blur.
        panelsArray.forEach((panel: any, i: number) => {
          gsap.set(panel, {
            x: () => (window.innerWidth * 0.15) + (i * 10), // Relative to container's starting point
            y: () => (i * 12) - (panelsArray.length * 6),
            rotationY: -45,
            rotationX: 10,
            rotationZ: () => (Math.random() * 8 - 4),
            scale: 0.9,
            opacity: 1,
            filter: "brightness(1)", // Removed blur
          });
        });

        // Main GSAP Timeline for the entire section
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1.5,
            start: "top top",
            end: () => `+=${(containerRef.current?.scrollWidth || 3000) + 1000}`,
            invalidateOnRefresh: true,
          }
        });

        // --- 2. GSAP ENTRANCE ANIMATION (On Scroll) ---

        // Dissolve Intro Text
        if (introBlock) {
          mainTl.to(introBlock, {
            opacity: 0,
            x: -200,
            filter: "blur(30px)",
            skewX: -20,
            duration: 4,
            ease: "power2.inOut"
          }, 0);
        }

        // The "Fan-Out": Cards fly from stack to grid positions
        panelsArray.forEach((panel: any, i: number) => {
          mainTl.to(panel, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            rotationZ: 0,
            scale: 1,
            filter: "brightness(1.1)", // Removed blur
            duration: 5,
            ease: "expo.out"
          }, 0.2 + (i * 0.08));
        });

        // --- 3. HORIZONTAL SCROLL PHASE ---
        const totalScrollWidth = (containerRef.current?.scrollWidth || 0) - window.innerWidth;

        mainTl.to(containerRef.current, {
          x: () => -totalScrollWidth - 200,
          ease: "none",
          duration: panelsArray.length * 3
        }, 1.8);

        // Active State "Cover-Flow" Effect
        panelsArray.forEach((panel: any) => {
          const content = panel.querySelector(".card-content");
          gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainTl,
              start: "left right-=15%",
              end: "right left+=15%",
              scrub: true,
            }
          })
            .to(content, { scale: 1.1, filter: "brightness(1.2)", borderColor: "white", boxShadow: "0 0 100px rgba(255,255,255,0.2)", duration: 1 })
            .to(content, { scale: 0.95, filter: "brightness(0.8)", borderColor: "rgba(255,255,255,0.1)", boxShadow: "0 0 0px rgba(255,255,255,0)", duration: 1 });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [categories]);

  if (isLoading || categories.length === 0) return <div className="h-screen bg-black" />;

  const colorPalette = [
    { border: "border-pink-500", glow: "shadow-[0_0_80px_rgba(236,72,153,0.4)]", accent: "text-pink-400" },
    { border: "border-yellow-400", glow: "shadow-[0_0_80px_rgba(250,204,21,0.4)]", accent: "text-yellow-300" },
    { border: "border-purple-500", glow: "shadow-[0_0_80px_rgba(168,85,247,0.4)]", accent: "text-purple-400" },
    { border: "border-orange-500", glow: "shadow-[0_0_80px_rgba(249,115,22,0.4)]", accent: "text-orange-400" },
    { border: "border-cyan-400", glow: "shadow-[0_0_80px_rgba(34,211,238,0.4)]", accent: "text-cyan-400" }
  ];

  return (
    <section ref={sectionRef} className="relative w-full h-[100vh] bg-background overflow-hidden flex flex-col justify-center border-t border-border mt-32 md:mt-0" style={{ perspective: "2000px" }}>

      {/* High-End Typography */}
      <div className="intro-block absolute left-[10vw] top-[45%] -translate-y-1/2 z-20 max-w-2xl pointer-events-none">
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 text-foreground leading-[0.8] drop-shadow-2xl">
          Continual Design <br />
          <span className="text-accent font-serif italic text-6xl md:text-8xl drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]">Exploration</span>
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground font-bold leading-tight max-w-lg border-l-4 border-accent pl-8 py-2">
          To keep my creative edge, I regularly prototype and collect modern industrial inspirations.
        </p>
      </div>

      <div className="absolute top-12 left-10 z-10 opacity-60">
        <p className="text-accent font-mono uppercase tracking-[0.4em] text-[10px] font-black flex items-center gap-4">
          <span className="w-12 h-[2px] bg-accent inline-block"></span>
          Industrial Spectrum
        </p>
      </div>

      {/* Grid Container: Clean 2-Row Layout shifted to the right half */}
      <div
        ref={containerRef}
        className="flex flex-col flex-wrap content-start h-[88vh] mt-16 pt-[2vh] ml-[45vw] gap-12 md:gap-x-20 md:gap-y-14 w-max"
        style={{ transformStyle: "preserve-3d" }}
      >
        {categories.map((category: any, idx: number) => {
          const style = colorPalette[idx % colorPalette.length];
          return (
            <div
              key={category._id}
              className="horizontal-panel flex shrink-0 w-[85vw] md:w-[48vw] h-[38vh] md:h-[42vh] items-center justify-center transition-opacity"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`card-content relative w-full h-full rounded-[3.5rem] bg-card border-[3px] ${style.border} ${style.glow} flex flex-col justify-end p-10 overflow-hidden group shadow-2xl transition-all duration-700`} style={{ transformStyle: "preserve-3d" }}>

                {category.image?.secure_url && (
                  <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-all duration-[1500ms] group-hover:scale-110">
                    <Image
                      src={category.image.secure_url}
                      alt={category.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 z-10"></div>
                <div className="absolute inset-0 border-t border-white/5 rounded-[3.5rem] pointer-events-none z-20"></div>

                <div className="relative z-30 transform-gpu translate-z-50 w-full px-2">
                  <p className={`${style.accent} uppercase tracking-[0.6em] text-[10px] mb-4 font-black drop-shadow-md`}>
                    {category.slug || "Category"}
                  </p>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-1 tracking-tighter drop-shadow-2xl">
                    {category.name}
                  </h2>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
