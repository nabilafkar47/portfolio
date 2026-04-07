"use client";

import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";

export function Topbar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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
