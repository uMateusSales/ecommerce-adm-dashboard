"use client";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useOrigin } from "@/hooks/use-origin";

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const origin = useOrigin();
  const routes = [
    {
      href: `${origin}/${params.storeId}`,
      label: "Dashboard",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `${origin}/${params.storeId}/categories`,
      label: `Categorias`,
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Configurações",
      active: pathname === `/${params.storeId}/settings`,
    },
    {
      href: `${origin}/${params.storeId}/billboards`,
      label: `Billboards`,
      active: pathname === `/${params.storeId}/billboards`,
    },
  ];
  console.log(pathname);
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
