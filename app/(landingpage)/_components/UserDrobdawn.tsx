"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  BookOpen,
  Heart,
  Home,
  LayoutDashboardIcon,
  LogOut,
  Settings,
} from "lucide-react";

import Link from "next/link";

import { useGetProfileQuery } from "@/app/redux/slices/ApiSlice";

export function UserDropdown() {

  const { data } = useGetProfileQuery();

  const profile = data?.data?.profile 

  const role = profile?.role;

  const wishlist = profile?.wishlist || [];

  const fullName = `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`;

  const firstLetter = profile?.firstName?.charAt(0)?.toUpperCase() ?? "U";

  const isUser = role === "user";

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-9 w-9 rounded-full p-0 font-semibold"
        >
          {firstLetter}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">

        {/* User Info */}
        <DropdownMenuLabel>
          <p className="text-sm font-medium">{fullName}</p>
          <p className="text-xs text-muted-foreground">{profile?.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Home */}
        <DropdownMenuItem asChild>
          <Link href={"/"}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </DropdownMenuItem>

        {/* Courses */}
        <DropdownMenuItem asChild>
          <Link href={"/Coures"}>
            <BookOpen className="mr-2 h-4 w-4" />
            Courses
          </Link>
        </DropdownMenuItem>

        {/* Dashboard يظهر لغير اليوزر */}
        {!isUser && (
          <DropdownMenuItem asChild>
            <Link href={"/dashbord"}>
              <LayoutDashboardIcon className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        )}

        {/* Wishlist تظهر لليوزر */}
        {isUser && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuLabel className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              Wishlist ({wishlist.length})
            </DropdownMenuLabel>

            {wishlist.length > 0 ? (
              wishlist.slice(0, 3).map((item: any) => (
                <DropdownMenuItem key={item._id}>
                  ❤️ {item.title || "Saved Course"}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>
                No items in wishlist
              </DropdownMenuItem>
            )}
          </>
        )}

        <DropdownMenuSeparator />

        {/* Settings */}
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}