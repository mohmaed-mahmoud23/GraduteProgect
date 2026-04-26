"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldAlert, Zap, Gem } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cards = [
  {
    id: "layer-1",
    icon: ShieldAlert,
    title: "Military-Grade Testing",
    desc: "Every batch of paint and every single power tool is subjected to extreme load and compound testing before it ever leaves our facility.",
    bgColor: "bg-card dark:bg-zinc-950",
    glow: "bg-rose-500",
  },
  {
    id: "layer-2",
    icon: Zap,
    title: "High-Torque Performance",
    desc: "Optimized brushless motors and advanced kinetics ensure you get maximum power output with minimal energy loss.",
    bgColor: "bg-card dark:bg-slate-950",
    glow: "bg-amber-500",
  },
  {
    id: "layer-3",
    icon: Gem,
    title: "Aesthetic Perfection",
    desc: "Because industrial doesn't mean ugly. Our finishes provide a flawless, sleek look that elevates the perception of your workspace.",
    bgColor: "bg-card dark:bg-stone-950",
    glow: "bg-emerald-500",
  },
];

export default function LayeredPinning() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const allCards = gsap.utils.toArray(".stacked-card");

      allCards.forEach((card: any, index: number) => {
        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${index * 40}`, // Stagger the pinning point slightly so they stack visually
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: true,
        });

        // Add a slight dimming effect to the card below it when a new one stacks on top
        if (index > 0) {
          gsap.to(allCards[index - 1], {
            scale: 0.95,
            opacity: 0.5,
            scrollTrigger: {
              trigger: card,
              start: `top center`,
              end: `top top`,
              scrub: true,
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-background pt-20 pb-40">
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <p className="text-accent font-semibold uppercase mb-4 tracking-widest text-center text-sm md:text-base">
          The Anatomy of Quality
        </p>
        <h2 className="text-4xl md:text-7xl font-bold text-center tracking-tight leading-none mb-6">
          Stacking Up Against <br />The Competition.
        </h2>
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-6 h-[200vh]"> {/* Shorter container = faster stacking */}
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`stacked-card absolute w-full md:w-[90%] left-0 md:left-[5%] min-h-[500px] md:min-h-[600px] rounded-[40px] border border-border/50 ${card.bgColor} shadow-2xl flex flex-col justify-center p-12 md:p-20 overflow-hidden`}
              style={{ zIndex: idx }}
            >
              {/* Background ambient glow */}
              <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20 ${card.glow}`}></div>

              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-10 backdrop-blur-sm">
                  <Icon className="w-10 h-10 text-foreground" />
                </div>

                <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{card.title}</h3>
                <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed max-w-2xl">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
