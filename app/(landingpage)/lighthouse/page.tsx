"use client";

import { useGetProductsQuery } from "@/app/redux/slices/ApiSlice";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SplineViewer from "@/components/SplineViewer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LighthousePage() {
  const { data, isLoading } = useGetProductsQuery();
  // Filter only products that might be related to "Lighthouse", lights, or just show top gear
  const products = data?.data?.result?.result || [];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered Title Reveal
      gsap.fromTo(".light-title span",
        { y: 100, rotateX: -90, opacity: 0 },
        { 
          y: 0, 
          rotateX: 0, 
          opacity: 1, 
          duration: 1.5, 
          stagger: 0.2, 
          ease: "expo.out" 
        }
      );

      const cards = gsap.utils.toArray(".light-card");
      cards.forEach((card: any) => {
        gsap.fromTo(card,
          { y: 150, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100px",
              end: "center center",
              scrub: 1
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [products]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-accent overflow-hidden pt-32 pb-40">

      <div className="max-w-7xl mx-auto px-6 mb-32 flex flex-col items-center">
        {/* Core Glow Effect */}
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

        <div className="w-full h-[400px] relative mb-10 pointer-events-none">
           <SplineViewer url="https://prod.spline.design/6Wq1Q7YGyM-iab9I/scene.splinecode" className="w-full h-full" />
        </div>

        <p className="text-accent uppercase tracking-[0.5em] text-sm font-bold mb-6 border border-accent/30 px-6 py-2 rounded-full">Project Lighthouse</p>
        <h1 className="text-7xl md:text-[8rem] font-bold tracking-tighter text-center leading-[0.9] mb-8 relative z-10 drop-shadow-2xl light-title flex flex-col">
          <span className="block italic">Illuminate the</span> 
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 block">Unknown.</span>
        </h1>
        <p className="text-xl md:text-3xl text-neutral-400 font-medium text-center max-w-3xl relative z-10 leading-relaxed">
          Advanced site illumination, high-lumen density, and rugged casings. Discover equipment designed to pierce through the darkest industrial terrains.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {isLoading ? (
          <div className="flex justify-center p-20"><div className="w-8 h-8 rounded-full border-t flex animate-spin border-white" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.slice(0, 4).map((item: any, i: number) => (
              <div key={item._id} className="light-card relative bg-zinc-950 border border-white/10 rounded-3xl p-10 flex flex-col justify-between min-h-[500px] group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 font-mono mb-4">Lumen System // 0{i + 1}</p>
                  <h2 className="text-3xl font-bold mb-4">{item.name}</h2>
                  <p className="text-neutral-400 mb-8 max-w-md">{item.description?.substring(0, 100) || "Precision engineering wrapped in a shockproof alloy case, emitting flawless thermal-regulated output."}</p>
                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center py-10">
                  {item.images?.[0]?.secure_url ? (
                    <div className="relative w-64 h-64 ease-out duration-700 transform group-hover:scale-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      <Image src={item.images[0].secure_url} alt={item.name} fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-neutral-500">Node Active</div>
                  )}
                </div>

                <div className="relative z-10 flex justify-between items-center border-t border-white/10 pt-6 mt-auto">
                  <span className="font-mono text-2xl">£{item.salePrice || item.originalPrice}</span>
                  <Link href={`/Proadactpage`} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent hover:text-white transition-colors">
                    View Spec <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
