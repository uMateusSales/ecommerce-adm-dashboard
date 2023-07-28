import prisma from "@/lib/prismadb";
import { format } from "date-fns";

import { SizeClient } from "./components/client";
import { SizeColmumn } from "./components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prisma.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedSizes: SizeColmumn[] = sizes.map((i) => ({
    id: i.id,
    createdAt: format(i.createdAt, "MMMM do, yyyy"),
    name: i.name,
    value: i.value,
  }));

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SizeClient data={formattedSizes} />
        </div>
      </div>
    </>
  );
};

export default SizesPage;
