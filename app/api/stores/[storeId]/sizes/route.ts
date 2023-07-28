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
    const { name, value } = body;
    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Sotre ID not found", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value required", { status: 400 });
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

    const size = await prisma.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]", error);

    return new NextResponse("interal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Sotre ID not found", { status: 400 });
    }

    const sizes = await prisma.size.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZE_GET]", error);

    return new NextResponse("interal error", { status: 500 });
  }
}
