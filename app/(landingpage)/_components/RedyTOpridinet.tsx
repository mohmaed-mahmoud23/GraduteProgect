import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Ready() {
  return (
    <section className="py-20 px-6 flex justify-center">
      <div className="w-full max-w-7xl rounded-[3rem] py-24 px-10 text-center bg-card border border-border relative overflow-hidden shadow-2xl group">
        
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
        
        <h2 className="text-4xl md:text-7xl font-bold mb-8 relative z-10 tracking-tighter text-foreground">
          Ready to Engineer <br /> <span className="text-accent underline underline-offset-8 decoration-accent/30">Your World?</span>
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-xl relative z-10 leading-relaxed">
          Join a community of professionals and visionaries who trust Al-Masanae for high-performance tools and elite coatings.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
          <Link
            href="/Proadactpage"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-16 px-12 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl transition-transform hover:scale-105 active:scale-95"
            )}
          >
            Explore Catalog
          </Link>

          <Link
            href="/lighthouse"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-16 px-12 rounded-full font-bold uppercase tracking-widest text-xs border-border/50 hover:bg-accent/10 transition-all"
            )}
          >
            Technical Support
          </Link>
        </div>
      </div>
    </section>
  );
}
