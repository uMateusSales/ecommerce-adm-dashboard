"use client";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <>
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        {routes.map((i) => (
          <Link
            href={i.href}
            key={i.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              i.active ? "text-black dark:text-white" : "text-muted-foreground"
            )}
          >
            {i.label}
          </Link>
        ))}
      </nav>
    </>
  );
};
