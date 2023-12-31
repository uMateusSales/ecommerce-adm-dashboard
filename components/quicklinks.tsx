"use client";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useOrigin } from "@/hooks/use-origin";

export const QuickLinks = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const origin = useOrigin();
  const routes = [
    {
      href: `${origin}/${params.storeId}/products/new`,
      label: "Criar novo produto",
    },
    {
      href: `${origin}/${params.storeId}/categories/new`,
      label: `Criar nova categoria`,
    },
    {
      href: `${origin}/${params.storeId}/billboards`,
      label: "Mudar vitrine da sua loja",
    },
  ];
  console.log(pathname);
  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between  lg:space-x-6",
          className
        )}
      >
        {routes.map((i) => (
          <Link
            href={i.href}
            key={i.href}
            className={cn(
              "text-sm  p-4 font-semibold border rounded-md border-neutral-600 hover:bg-slate-300"
            )}
          >
            {i.label}
          </Link>
        ))}
      </div>
    </>
  );
};
