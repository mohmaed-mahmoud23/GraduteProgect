"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from "@splinetool/react-spline";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroPremium() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Only run animations on the client
    let ctx = gsap.context(() => {
      // Zoom-out intro animation
      gsap.fromTo(containerRef.current,
        { filter: "blur(20px)", opacity: 0 },
        { filter: "blur(0px)", opacity: 1, duration: 2.5, ease: "power3.out" }
      );

      // Stagger text reveal
      gsap.fromTo(".hero-element",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: "expo.out", delay: 0.3 }
      );

      // Spline fade in (Massive Zoom Out for Robot)
      gsap.fromTo(splineRef.current,
        { opacity: 0, scale: 5, z: 2000, rotationX: -20 }, // Even more aggressive starting point
        { opacity: 1, scale: 1, z: 0, rotationX: 0, duration: 4, ease: "expo.out", delay: 0.1 }
      );

      // Cinematic Scroll Parallax Upgrade
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(textRef.current, {
        y: -150,
        opacity: 0.5,
        scale: 1.05,
        ease: "power3.out"
      }, 0);

      if (glowRef.current) {
        tl.to(glowRef.current, {
          y: 200,
          scale: 1.2,
          filter: "blur(250px)",
          ease: "power3.out"
        }, 0);
      }

      tl.to(".scroll-hint", { opacity: 0, duration: 0.1 }, 0);

      // Fade out spline on scroll down
      tl.to(splineRef.current, {
        y: -200,
        opacity: 0,
        scale: 0.8,
        ease: "power2.inOut"
      }, 0);

    }, containerRef);

    // Mouse Parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current || !splineRef.current) return;

      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30; // Stronger tilt
      const y = (e.clientY / innerHeight - 0.5) * 30;

      gsap.to(textRef.current, {
        x: x * 1.5,
        y: y * 1.5,
        rotationY: x * 0.8,
        rotationX: -y * 0.8,
        ease: "power2.out",
        duration: 1.2
      });

      // Opposite movement for parallax depth
      gsap.to(splineRef.current, {
        x: -x * 3,
        y: -y * 3,
        ease: "power2.out",
        duration: 1.8
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] w-full flex flex-col items-center justify-center text-center px-6 bg-background overflow-hidden"
      style={{ perspective: "1200px" }}
    >

      {/* Immersive Background Glow */}
      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/15 blur-[200px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Spline 3D Object - Dark abstract industrial robotic theme */}
      <div ref={splineRef} className="absolute inset-0 z-0 opacity-80 pointer-events-none md:pointer-events-auto mix-blend-screen scale-125 md:scale-100 flex items-center justify-center">
        {mounted && (
          <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        )}
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 max-w-6xl w-full flex flex-col items-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <p className="hero-element text-accent uppercase tracking-[0.5em] font-bold text-xs md:text-sm mb-8 flex items-center justify-center gap-6 drop-shadow-md">
          <span className="w-12 h-[1px] bg-accent/60 inline-block"></span>
          Absolute Precision // Al-Masanae
          <span className="w-12 h-[1px] bg-accent/60 inline-block"></span>
        </p>

        <h1 className="hero-element text-6xl md:text-8xl lg:text-[11rem] font-bold tracking-tighter leading-[0.85] mb-10 text-foreground mix-blend-difference drop-shadow-2xl">
          Engineered <br /> for <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground/60 to-foreground/30 dark:from-white dark:via-neutral-400 dark:to-neutral-800" style={{ WebkitTextStroke: "1px rgba(var(--foreground),0.15)" }}>Perfection.</span>
        </h1>

        <p className="hero-element text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed border-l-2 border-accent pl-6 text-left drop-shadow-md backdrop-blur-md bg-background/5 p-6 rounded-r-2xl border-y border-r border-border/10">
          Explore industrial grade tools and coatings crafted for the elite.
          Everything you need for an indestructible build.
        </p>

        <div className="hero-element mt-4" style={{ transform: "translateZ(50px)" }}>
          <Link href="/dashboard" className="group relative inline-flex items-center justify-center gap-6 h-16 pl-10 pr-3 rounded-full bg-foreground text-background font-bold uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all duration-500 overflow-hidden shadow-xl ring-1 ring-border/20 hover:ring-accent/50">
            <span className="relative z-10">Enter Catalog</span>
            <div className="relative z-10 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center group-hover:bg-background/40 transition-colors">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
            {/* Hover shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-background/20 to-transparent skew-x-12"></div>
          </Link>
        </div>
      </div>

      {/* Mouse scroll hint */}
      <div className="hero-element scroll-hint absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-foreground">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent"></div>
      </div>
    </section>
  );
}