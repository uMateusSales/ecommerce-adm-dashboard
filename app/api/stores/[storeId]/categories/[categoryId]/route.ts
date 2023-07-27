import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
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
    const { name, billboardId } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id not found", { status: 400 });
    }

    const updateCategories = await prisma.category.updateMany({
      where: { id: params.categoryId },
      data: { name, billboardId },
    });

    return NextResponse.json(updateCategories);
  } catch (error) {
    console.log("[CATEGORIES_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
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

    if (!params.categoryId) {
      return new NextResponse("Category not found", { status: 400 });
    }

    const deleteCategory = await prisma.category.deleteMany({
      where: { id: params.categoryId },
    });

    return NextResponse.json(deleteCategory);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const findStoreById = await prisma.store.findFirst({
      where: { id: params.storeId },
    });
    if (!findStoreById) {
      return new NextResponse("Store Id not found", { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse("CategoryId not found", { status: 400 });
    }

    const findUniqueCategory = await prisma.category.findFirst({
      where: { id: params.categoryId },
    });

    return NextResponse.json(findUniqueCategory);
  } catch (error) {
    console.log("[CATEGORY_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
