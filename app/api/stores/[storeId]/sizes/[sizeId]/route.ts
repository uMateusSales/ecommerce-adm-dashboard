import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
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
    const { name, value } = body;
    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id not found", { status: 400 });
    }

    const updateSize = await prisma.size.updateMany({
      where: { id: params.sizeId },
      data: { name, value },
    });

    return NextResponse.json(updateSize);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
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

    if (!params.sizeId) {
      return new NextResponse("Size id found", { status: 400 });
    }

    const deleteSize = await prisma.size.deleteMany({
      where: { id: params.sizeId },
    });

    return NextResponse.json(deleteSize);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const findStoreById = await prisma.store.findFirst({
      where: { id: params.storeId },
    });
    if (!findStoreById) {
      return new NextResponse("Store Id not found", { status: 403 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id found", { status: 400 });
    }

    const findUniqueSize = await prisma.size.findFirst({
      where: { id: params.sizeId },
    });

    return NextResponse.json(findUniqueSize);
  } catch (error) {
    console.log("[SIZE_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
