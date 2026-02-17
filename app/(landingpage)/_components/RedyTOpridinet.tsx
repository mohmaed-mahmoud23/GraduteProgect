import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Ready() {
  return (
    <section className="md:py2 px-6  flex justify-center lg:py-10 sm:py8">
      {/* container */}
      <div
        className="
        w-full 
        max-w-5xl 
        rounded-2xl 
        py-16 
        px-6
        text-center
        bg-gradient-to-r 
        from-[#0f2a2f] 
        via-[#12343a] 
        to-[#0b2c31]
        shadow-lg
      "
      >
        {/* title */}
        <h2 className="text-3xl md:text-5xl font-bold  mb-4">
          Ready to brighten your home?
        </h2>

        {/* description */}
        <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
          Join over 5,000 homeowners who have transformed their spaces with our
          platform.
        </p>

        {/* buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            href="/courses"
            className={
              buttonVariants({
                size: "lg",
              }) + " bg-cyan-500 hover:bg-cyan-600 border-0"
            }
          >
            Book a Pro Now
          </Link>

          <Link
            href="/login"
            className={
              buttonVariants({
                size: "lg",
                variant: "outline",
              }) + " border-gray-5 "
            }
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
