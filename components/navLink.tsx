"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={cn(
        isActive
          ? "font-bold text-primary"
          : "text-gray-600 hover:text-primary",
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
