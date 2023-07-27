import prisma from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

const CategoryIdPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const category = await prisma.category.findUnique({
    where: { id: params.categoryId },
  });
  const billboards = await prisma.billBoard.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} data={category} />
      </div>
    </div>
  );
};

export default CategoryIdPage;
