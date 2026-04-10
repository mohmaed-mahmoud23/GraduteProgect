import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-[95vh] w-full overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-pulse" />

        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[120px] animate-pulse" />

        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Build Modern Experiences
        </h1>

        <p className="text-lg md:text-xl mb-8 text-muted-foreground">
          Create powerful applications using Next.js, Tailwind CSS and shadcn UI
          components.
        </p>

        <div className="flex justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
