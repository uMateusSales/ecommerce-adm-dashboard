import prisma from "@/lib/prismadb";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ColorClient } from "./components/client";
import { ColorColmumn } from "./components/columns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prisma.color.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedColors: ColorColmumn[] = colors.map((i) => ({
    id: i.id,
    createdAt: format(i.createdAt, "do MMMM, yyyy", { locale: ptBR }),
    name: i.name,
    value: i.value,
  }));

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ColorClient data={formattedColors} />
        </div>
      </div>
    </>
  );
};

export default ColorsPage;
