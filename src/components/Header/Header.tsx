"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-primary-foreground text-lg font-bold">
                P
              </span>
            </div>
            <span className="text-xl font-bold">Pokédex</span>
          </div>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Pokémon
          </Link>
        </nav>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
