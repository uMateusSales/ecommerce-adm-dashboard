import prisma from "@/lib/prismadb";
import { format } from "date-fns";

import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prisma.category.findMany({
    where: { storeId: params.storeId },
    include: { billboard: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedCategories: CategoryColumn[] = categories.map((i) => ({
    id: i.id,
    createdAt: format(i.createdAt, "MMMM do, yyyy"),
    name: i.name,
    billboardLabel: i.billboard.label,
  }));

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryClient data={formattedCategories} />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
