"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from "@splinetool/react-spline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    id: "01",
    title: "Industrial Grade",
    desc: "Every product is tested under extreme conditions, ensuring maximum durability and performance for heavy machinery and structural integrity.",
  },
  {
    id: "02",
    title: "Advanced Ergonomics",
    desc: "Our hand tools are designed to reduce fatigue and increase precision, mapping perfectly to human kinetics for extended operational use.",
  },
  {
    id: "03",
    title: "Chemical Resilience",
    desc: "Furniture paints forged with synthetic resins to resist abrasions, UV rays, and strong chemicals. A finish that lasts modern lifetimes.",
  }
];

export default function CinematicScroll() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    let ctx = gsap.context(() => {
      // Pin the left column while the right column scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
      });

      // Animate each feature item on scroll
      gsap.utils.toArray(".feature-item").forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "center center",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-background mt-20 border-t border-border/10 perspective-1000">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background/50 via-background to-background pointer-events-none" />

      <div className="mx-auto flex max-w-[90rem] w-full flex-col lg:flex-row gap-8 lg:gap-16 px-6 md:px-20 relative z-10 items-start">

        {/* Left Column (Fixed Text) */}
        <div
          ref={leftColRef}
          className="w-full lg:w-1/2 h-screen flex flex-col justify-center max-w-2xl py-20 z-20"
        >
          <p className="split-text text-accent font-semibold flex items-center gap-4 mb-8 uppercase tracking-[0.3em] text-xs">
            <span className="w-8 h-[1px] bg-accent inline-block" />
            Uncompromising Standards
            <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
          </p>
          <h2 className="split-text text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-10 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-foreground/40 drop-shadow-sm pb-2">
            Engineered For <br /> The Relentless.
          </h2>
          <div className="split-text relative">
            <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-accent to-transparent"></div>
            <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed pl-8">
              We don't settle for <span className="text-foreground">"good enough"</span>. Our tools and finishes are forged for professionals who demand absolute perfection in every stroke, every cut, and every measure.
            </p>
          </div>
        </div>

        {/* Right Column (Scrolling UI & Interactive Robot) */}
        <div className="w-full lg:w-[50%] flex flex-col pt-[20vh] pb-[20vh] z-10 relative">

          {/* Interactive Spline Robot - Sticky inside the right column */}
          <div className="w-full h-[60vh] sticky top-[20vh] mb-32 rounded-[2.5rem] border border-border/10 bg-card/5 backdrop-blur-3xl overflow-hidden shadow-2xl flex items-center justify-center transform-style-3d ring-1 ring-white/5 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent z-0"></div>

            {/* Replace this URL with your custom Spline Robot URL if needed */}
            <div className="w-full h-full relative z-10 scale-125">
              {mounted && (
                <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
              )}

              {/* Label */}
              <div className="absolute bottom-6 left-6 text-xs text-foreground/50 tracking-[0.2em] uppercase font-mono bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 pointer-events-none">
                Interactive Mode
              </div>
            </div>
          </div>

          {/* Changing Sections / Cards */}
          <div className="flex flex-col gap-32 relative z-10 mt-[20vh]">
            {features.map((feat) => (
              <div
                key={feat.id}
                className="feature-item bg-card/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group"
              >
                {/* Number Watermark */}
                <div className="absolute top-0 right-0 p-8 text-8xl font-bold opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 font-mono text-foreground pointer-events-none">
                  {feat.id}
                </div>

                {/* Glow affect */}
                <div className="absolute -inset-10 bg-gradient-to-br from-accent/0 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-background to-secondary/50 flex items-center justify-center mb-8 border border-white/5 shadow-inner">
                  <span className="text-2xl font-bold font-mono text-accent">{feat.id}</span>
                </div>

                <h3 className="text-3xl font-bold mb-4 tracking-tight drop-shadow-sm relative z-10">{feat.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed relative z-10 max-w-lg">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
