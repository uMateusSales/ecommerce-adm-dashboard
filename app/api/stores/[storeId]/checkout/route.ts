import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

const corsHeaders = {
  "Acess-Control-Allow-Origin": "*",
  "Acess-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Acess-Control-Allow-Headers": "Content-Type, Authorization",
};

export const OPTIONS = async () => {
  return NextResponse.json({}, { headers: corsHeaders });
};

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  const { productIds } = await req.json();

  if (!productIds || productIds.lenght === 0) {
    return new NextResponse("No product id found", { status: 400 });
  }
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const order = await prisma.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((i: string) => ({
          product: { connect: { id: i } },
        })),
      },
    },
  });

  return NextResponse.json({ headers: corsHeaders });
};
