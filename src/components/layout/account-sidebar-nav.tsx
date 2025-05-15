
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AccountSidebarNavProps {
  items: NavItem[];
}

export function AccountSidebarNav({ items }: AccountSidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {items.map((item, index) => (
        <Link key={index} href={item.href} legacyBehavior passHref>
          <Button
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn(
              "w-full justify-start text-left",
              pathname === item.href
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
