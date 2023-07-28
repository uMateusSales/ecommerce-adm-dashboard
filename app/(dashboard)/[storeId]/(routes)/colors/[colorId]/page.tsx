import prisma from "@/lib/prismadb";
import ColorForm from "./components/color-form";

const ColorIdPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await prisma.color.findUnique({
    where: { id: params.colorId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm data={color} />
      </div>
    </div>
  );
};

export default ColorIdPage;
