import prisma from "@/lib/prismadb";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { priceFormatter } from "@/lib/utils";
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";

const OrderPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prisma.order.findMany({
    where: { storeId: params.storeId },
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  const formattedOrders: OrderColumn[] = orders.map((i) => ({
    id: i.id,
    createdAt: format(i.createdAt, "do MMMM, yyyy", { locale: ptBR }),
    phone: i.phone,
    address: i.address,
    products: i.orderItems.map((i) => i.product.name).join(", "),
    totalPrice: priceFormatter.format(
      i.orderItems.reduce((total, i) => {
        return total + Number(i.product.price);
      }, 0)
    ),
    isPaid: i.isPaid,
  }));

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <OrderClient data={formattedOrders} />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
