import prisma from "@/lib/prismadb";
import { format } from "date-fns";

import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { priceFormatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prisma.product.findMany({
    where: { storeId: params.storeId },
    include: { category: true, size: true, color: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedProducts: ProductColumn[] = products.map((i) => ({
    id: i.id,
    createdAt: format(i.createdAt, "MMMM do, yyyy"),
    name: i.name,
    isFeatured: i.isFeatured,
    isArchived: i.isArchived,
    price: priceFormatter.format(i.price.toNumber()),
    category: i.category.name,
    color: i.color.value,
    size: i.size.name,
  }));

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductClient data={formattedProducts} />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
