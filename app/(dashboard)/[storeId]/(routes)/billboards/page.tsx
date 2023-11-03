import prisma from "@/lib/prismadb";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BillboardClient } from "./components/client";
import { BillBoardColumn } from "./components/columns";

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma.billBoard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedBillboards: BillBoardColumn[] = billboards.map((i) => ({
    id: i.id,
    createdAt: format(i.createdAt, "do MMMM, yyyy", { locale: ptBR }),
    label: i.label,
  }));

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardClient data={formattedBillboards} />
        </div>
      </div>
    </>
  );
};

export default BillboardPage;
