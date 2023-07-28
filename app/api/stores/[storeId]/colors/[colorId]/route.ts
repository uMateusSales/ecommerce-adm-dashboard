import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("Color id not found", { status: 400 });
    }

    const updateColor = await prisma.color.updateMany({
      where: { id: params.colorId },
      data: { name, value },
    });

    return NextResponse.json(updateColor);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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

    if (!params.colorId) {
      return new NextResponse("Color id found", { status: 400 });
    }

    const deleteColor = await prisma.color.deleteMany({
      where: { id: params.colorId },
    });

    return NextResponse.json(deleteColor);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const findStoreById = await prisma.store.findFirst({
      where: { id: params.storeId },
    });
    if (!findStoreById) {
      return new NextResponse("Store Id not found", { status: 403 });
    }

    if (!params.colorId) {
      return new NextResponse("Color id found", { status: 400 });
    }

    const findUniqueColor = await prisma.color.findFirst({
      where: { id: params.colorId },
    });

    return NextResponse.json(findUniqueColor);
  } catch (error) {
    console.log("[COLOR_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
