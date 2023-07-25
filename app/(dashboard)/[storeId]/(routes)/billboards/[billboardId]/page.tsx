import prisma from "@/lib/prismadb";
import BillboardForm from "./components/billboard-form";

const BillboardIdPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prisma.billBoard.findUnique({
    where: { id: params.billboardId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm data={billboard} />
      </div>
    </div>
  );
};

export default BillboardIdPage;
