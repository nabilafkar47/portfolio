"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const navItems = [
  {
    label: "Experiences",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Thoughts",
    href: "/thoughts",
  },
  {
    label: "Equipments",
    href: "/equipments",
  },
];

export function ContentNavigation() {
  const pathname = usePathname();

  return (
    <section className="border-y border-dashed">
      <div className="mx-auto max-w-5xl lg:border-x lg:border-dashed py-5 px-6">
        <div className="flex flex-wrap gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Button
                key={item.label}
                asChild
                variant={isActive ? "default" : "ghost"}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
