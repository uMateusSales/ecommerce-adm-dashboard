import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unathourized", { status: 401 });
    }
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id not found", { status: 400 });
    }

    const updateStore = await prisma.store.updateMany({
      where: { id: params.storeId, userId },
      data: { name },
    });

    return NextResponse.json(updateStore);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unathourized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id not found", { status: 400 });
    }

    const deleteStore = await prisma.store.deleteMany({
      where: { id: params.storeId, userId },
    });

    return NextResponse.json(deleteStore);
  } catch (error) {
    console.log("[STORE_DLETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
