import prisma from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prisma.store.findFirst({ where: { id: params.storeId } });

  return (
    <div>
      <h1>This is the Dashboard</h1>
      <p>Loja: {store?.name}</p>
    </div>
  );
};

export default DashboardPage;
