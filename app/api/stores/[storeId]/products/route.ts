import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prisma from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
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
    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Sotre ID not found", { status: 400 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Image url required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("size id required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }
    if (typeof name !== "string") {
      return new NextResponse("Invalid name data", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unathourized user", { status: 403 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        sizeId,
        categoryId,
        colorId,
        storeId: params.storeId,
        isFeatured: isFeatured,
        isArchived: isArchived,
        images: {
          createMany: { data: [...images.map((i: { url: string }) => i)] },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);

    return new NextResponse("interal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url) || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Sotre ID not found", { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        storeId: params.storeId,
        colorId,
        categoryId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: { images: true, size: true, color: true, category: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);

    return new NextResponse("interal error", { status: 500 });
  }
}
