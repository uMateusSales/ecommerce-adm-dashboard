import Stripe from "stripe";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

import { stripe } from "@/lib/stripe";

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

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((i) =>
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "BRL",
        product_data: { name: i.name },
        unit_amount: i.price.toNumber() * 100,
      },
    })
  );

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

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?sucess=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: { orderId: order.id },
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
};
