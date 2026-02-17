import { Button } from "@/components/ui/button";
import Image from "next/image";

import HerosectionImage from "../../../public/images/ChatGPT Image Feb 17, 2026, 07_21_06 PM.png"

export default function HeroSection() {
  return (
    <section className="relative h-[95vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={HerosectionImage}
          alt="Hero Background"
          fill
          priority
          className="
    object-cover
    object-[50%_25%]   /* موبايل */
    md:object-center   
  "
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Build Modern Experiences
          </h1>

          <p className="text-lg md:text-xl mb-8">
            Create powerful applications using Next.js, Tailwind CSS and shadcn
            UI components.
          </p>

          <div className="flex justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline" className="">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
