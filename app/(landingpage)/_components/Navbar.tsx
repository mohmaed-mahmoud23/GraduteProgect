"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemToggle } from "@/components/ui/themToggle";
import Image from "next/image";
import Logo from "../../../public/images/image (27).png";
import { UserDropdown } from "./UserDrobdawn";
import {
  useGetCartQuery,
  useGetProfileQuery,
} from "@/app/redux/slices/ApiSlice";

const navLinks = [
  { name: "Paint", href: "/paint" },
  { name: "Lighthouse", href: "/lighthouse" },
  { name: "How it works", href: "/how-it-works" },
  { name: "Gallery", href: "/gallery" },
  { name: "product", href: "/Proadactpage" },
];

export default function Navbar() {
  const { data: user } = useGetProfileQuery();
  const { data, isLoading } = useGetCartQuery();

  // ✅ أهم سطر
  const cartLength = data?.data?.cart?.products?.length || 0;

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* 🔹 Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={Logo}
            alt="Paint & Light Logo"
            width={30}
            height={50}
            className="rounded-md"
          />
          <span className="ml-2 font-bold text-lg">Paint & Light</span>
        </Link>

        {/* 🔹 Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary"
            >
              {link.name}
            </Link>
          ))}

          {/* 🔥 Cart مع العدد */}
          <div className="relative">
            <Link
              href="/Cart"
              className="text-sm font-medium text-foreground hover:text-primary"
            >
              Cart
            </Link>

            {/* Badge */}
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartLength}
            </span>
          </div>
        </nav>

        {/* 🔹 Desktop Buttons */}
        {user ? (
          <UserDropdown />
        ) : (
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
        )}

        {/* 🔹 Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded hover:bg-secondary/10"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🔹 Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t bg-background shadow-md">
          <div className="flex flex-col gap-3 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* 🔥 Cart في الموبايل */}
            <Link href="/Cart" onClick={() => setOpen(false)}>
              Cart ({cartLength})
            </Link>

            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "w-full",
              )}
            >
              Login
            </Link>

            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "w-full",
              )}
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
