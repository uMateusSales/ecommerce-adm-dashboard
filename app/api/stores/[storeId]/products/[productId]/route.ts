import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unathourized", { status: 401 });
    }

    const findStoreById = await prisma.store.findFirst({
      where: { id: params.storeId },
    });
    if (!findStoreById) {
      return new NextResponse("Store Id not found", { status: 403 });
    }
    const body = await req.json();
    const {
      name,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
      price,
    } = body;

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("product id not found", { status: 400 });
    }

    const updateProduct = await prisma.product.update({
      where: { id: params.productId },
      data: {
        name,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        price,
        images: { deleteMany: {} },
      },
    });

    const updateImages = await prisma.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: { data: [...images.map((i: { url: string }) => i)] },
        },
      },
    });

    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unathourized", { status: 401 });
    }

    const findStoreById = await prisma.store.findFirst({
      where: { id: params.storeId },
    });
    if (!findStoreById) {
      return new NextResponse("Store Id not found", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("product not found", { status: 400 });
    }

    const deleteProduct = await prisma.product.deleteMany({
      where: { id: params.productId },
    });

    return NextResponse.json(deleteProduct);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const findStoreById = await prisma.store.findFirst({
      where: { id: params.storeId },
    });
    if (!findStoreById) {
      return new NextResponse("Store Id not found", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("product not found", { status: 400 });
    }

    const findUniqueProduct = await prisma.product.findFirst({
      where: { id: params.productId },
      include: { images: true, size: true, color: true, category: true },
    });

    return NextResponse.json(findUniqueProduct);
  } catch (error) {
    console.log("[PRODUCT_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
