"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemToggle } from "@/components/ui/themToggle";
import Image from "next/image";
import Logo from "../../../public/images/image (27).png";

const navLinks = [
  { name: "Paint", href: "/paint" },
  { name: "Lighthouse", href: "/lighthouse" },
  { name: "How it works", href: "/how-it-works" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* 🔹 Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={Logo}
            alt="Paint & Light Logo"
            width={50}
            height={50}
            className="rounded-md"
          />
          <span className="ml-2 font-bold text-lg text-primary">
            Paint & Light
          </span>
        </Link>

        {/* 🔹 Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground transition hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 🔹 Desktop Buttons + Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Register
          </Link>
          <ThemToggle />
        </div>

        {/* 🔹 Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded hover:bg-secondary/10 transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🔹 Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background shadow-md">
          <div className="flex flex-col gap-3 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground hover:text-primary transition"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "w-full",
              )}
              onClick={() => setOpen(false)}
            >
              Login
            </Link>

            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "w-full",
              )}
              onClick={() => setOpen(false)}
            >
              Register
            </Link>

            <ThemToggle />
          </div>
        </div>
      )}
    </header>
  );
}
