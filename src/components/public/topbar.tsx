"use client";

import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export function Topbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="mx-auto max-w-5xl lg:border-x lg:border-dashed px-6 sm:px-8 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <Image
            src="/avatar.svg"
            alt="Logo"
            width={48}
            height={48}
            unoptimized
          />

          <nav>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
