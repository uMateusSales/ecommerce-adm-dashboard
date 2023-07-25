import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
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
    const { label, imageUrl } = body;
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id not found", { status: 400 });
    }

    const updateBillboard = await prisma.billBoard.updateMany({
      where: { id: params.billboardId },
      data: { label, imageUrl },
    });

    return NextResponse.json(updateBillboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
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

    if (!params.billboardId) {
      return new NextResponse("Billbaord not found", { status: 400 });
    }

    const deleteBillboard = await prisma.billBoard.deleteMany({
      where: { id: params.billboardId },
    });

    return NextResponse.json(deleteBillboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
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

    if (!params.billboardId) {
      return new NextResponse("Billbaord not found", { status: 400 });
    }

    const findUniqueBillboard = await prisma.billBoard.findFirst({
      where: { id: params.billboardId },
    });

    return NextResponse.json(findUniqueBillboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
