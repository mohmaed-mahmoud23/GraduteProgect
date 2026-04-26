"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemToggle } from "@/components/ui/themToggle";
import Image from "next/image";
import Logo from "../../../public/images/image (27).png";
import { UserDropdown } from "./UserDrobdawn";
import { useGetCartQuery, useGetProfileQuery } from "@/app/redux/slices/ApiSlice";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Paint", href: "/paint" },
  { name: "Lighthouse", href: "/lighthouse" },
  { name: "How it works", href: "/how-it-works" },
  { name: "Gallery", href: "/gallery" },
  { name: "Products", href: "/Proadactpage" },
];

export default function Navbar() {
  const { data: user } = useGetProfileQuery();
  const { data } = useGetCartQuery();
  const cartLength = data?.data?.cart?.products?.length || 0;

  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Auto-hide the navbar when scrolling down, show when scrolling up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center w-full pointer-events-none px-4"
    >
      {/* Floating Island Container */}
      <div className="pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-border/50 bg-background/70 px-6 py-3 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-8 overflow-hidden rounded-md transition-transform group-hover:scale-105">
            <Image src={Logo} alt="Paint & Light" fill className="object-cover" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">Al-Masanae</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-muted-foreground transition-colors hover:text-accent relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 w-0 h-[2px] bg-accent left-0 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          <Link href="/Cart" className="text-sm font-semibold text-muted-foreground hover:text-accent flex items-center gap-2">
             Cart
             <span className="bg-accent text-background text-[10px] font-bold px-2 py-0.5 rounded-full">{cartLength}</span>
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemToggle />
          {user ? (
            <UserDropdown />
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="text-sm font-semibold hover:text-accent px-4 py-2">
                Login
              </Link>
              <Link href="/register" className={cn(buttonVariants({ variant: "default", size: "sm" }), "rounded-full px-6 font-bold tracking-wide")}>
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
           <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="absolute top-20 left-4 right-4 pointer-events-auto rounded-3xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl p-6 lg:hidden"
           >
             <div className="flex flex-col gap-4">
               {navLinks.map(link => (
                 <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className="text-xl font-bold border-b border-border/50 pb-2">
                   {link.name}
                 </Link>
               ))}
               <Link href="/Cart" onClick={() => setOpen(false)} className="text-xl font-bold border-b border-border/50 pb-2 text-accent">
                 Cart ({cartLength})
               </Link>
               <div className="flex gap-4 pt-4">
                 <ThemToggle />
                 {!user && (
                   <>
                     <Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "flex-1 rounded-full")}>Login</Link>
                     <Link href="/register" className={cn(buttonVariants({ variant: "default" }), "flex-1 rounded-full")}>Register</Link>
                   </>
                 )}
               </div>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
