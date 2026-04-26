"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gem } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AestheticPerfection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Smooth, slow fade and gentle translate - NOT chaotic
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.95, y: 80 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1.5, // Ultra-smooth scrub for elegant, delayed feeling
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-40 md:py-64 bg-background flex items-center justify-center overflow-hidden border-t border-border/10">
      
      {/* Very subtle ambient background for premium feel */}
      <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-background to-background pointer-events-none" />

      <div className="px-6 md:px-20 w-full max-w-7xl flex flex-col items-center z-10 relative">
        <div 
          ref={cardRef}
          className="relative w-full max-w-[65rem] rounded-[3rem] p-12 md:p-32 overflow-hidden ring-1 ring-white/5"
        >
          {/* Glassmorphism panel */}
          <div className="absolute inset-0 bg-card/20 backdrop-blur-[50px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] z-0" />
          
          {/* Soft reflection at the top edge */}
          <div className="absolute top-0 right-1/4 left-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

          {/* Internal gradient glow */}
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full z-0 pointer-events-none mix-blend-screen" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-foreground/5 blur-[120px] rounded-full z-0 pointer-events-none" />

          <div className="relative z-20 flex flex-col items-center text-center">
            {/* Elegant Icon Presentation */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-16 shadow-2xl backdrop-blur-xl relative group">
              <div className="absolute inset-0 bg-accent blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
              <Gem className="w-10 h-10 text-foreground relative z-10 group-hover:scale-110 transition-transform duration-700" strokeWidth={1} />
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.1] mb-12 text-transparent bg-clip-text bg-gradient-to-b from-white via-foreground to-foreground/40 drop-shadow-sm">
              Aesthetic Perfection
            </h2>

            <p className="text-xl md:text-3xl lg:text-4xl text-muted-foreground/80 leading-[1.6] max-w-4xl font-light">
              Because industrial doesn't mean ugly. Our finishes provide a <span className="text-foreground font-normal">flawless, sleek look</span> that elevates the perception of your workspace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
