import prisma from "@/lib/prismadb";
import ProductForm from "./components/product-form";

const ProductIdPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const product = await prisma.product.findUnique({
    where: { id: params.productId },
    include: { images: true },
  });

  const categories = await prisma.category.findMany({
    where: { storeId: params.storeId },
  });

  const sizes = await prisma.size.findMany({
    where: { storeId: params.storeId },
  });

  const colors = await prisma.color.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          sizes={sizes}
          colors={colors}
          categories={categories}
          data={product}
        />
      </div>
    </div>
  );
};

export default ProductIdPage;
