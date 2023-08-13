import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string; orderId: string } }
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
  
      if (!params.orderId) {
        return new NextResponse("Order Id not found", { status: 400 });
      }
  
      const deleteOrder = await prisma.order.deleteMany({
        where: { id: params.orderId },
      });



  
      return NextResponse.json(deleteOrder);
    } catch (error) {
      console.log("[ORDER_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }