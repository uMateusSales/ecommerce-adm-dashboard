import prisma from "@/lib/prismadb";
import ProductForm from "./components/product-form";

const ProductIdPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prisma.product.findUnique({
    where: { id: params.productId },
    include: { images: true },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm data={product} />
      </div>
    </div>
  );
};

export default ProductIdPage;
