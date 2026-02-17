"use client";

import { Globe, Share2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button"; // من ShadCN

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
        {/* Column 1: Logo + Description + Social */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-lg text-primary">
            <Share2 size={20} /> Paint & Light
          </h2>
          <p className="text-sm text-muted-foreground">
            Premium painting and lighting services for the discerning homeowner.
            Quality guaranteed since 2021.
          </p>
          <div className="flex gap-3">
            {/* Social icons using ShadCN button variants */}
            <button
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <Share2 size={16} />
            </button>
            <button
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <Globe size={16} />
            </button>
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="space-y-2">
          <h3 className="font-semibold">Services</h3>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li className="hover:text-primary cursor-pointer">
              Furniture Painting
            </li>
            <li className="hover:text-primary cursor-pointer">
              Wall Texturing
            </li>
            <li className="hover:text-primary cursor-pointer">
              Custom Lighting
            </li>
            <li className="hover:text-primary cursor-pointer">
              Smart Home Integration
            </li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div className="space-y-2">
          <h3 className="font-semibold">Company</h3>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li className="hover:text-primary cursor-pointer">About Us</li>
            <li className="hover:text-primary cursor-pointer">Join as a Pro</li>
            <li className="hover:text-primary cursor-pointer">Case Studies</li>
            <li className="hover:text-primary cursor-pointer">Press</li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div className="space-y-2">
          <h3 className="font-semibold">Support</h3>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li className="hover:text-primary cursor-pointer">Help Center</li>
            <li className="hover:text-primary cursor-pointer">Safety</li>
            <li className="hover:text-primary cursor-pointer">
              Terms of Service
            </li>
            <li className="hover:text-primary cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <span>
            © 2024 Paint & Light Service Platform. All rights reserved.
          </span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <button
              className={
                buttonVariants({ variant: "ghost", size: "sm" }) +
                " flex items-center gap-1"
              }
            >
              <Globe size={14} /> English (US)
            </button>
            <span>|</span>
            <Button
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              USD
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
