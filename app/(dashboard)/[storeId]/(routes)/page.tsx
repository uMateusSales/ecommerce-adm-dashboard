import prisma from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prisma.store.findFirst({ where: { id: params.storeId } });

  return (
    <div>
      <h1>Bem vindo a sua loja, comece a configurar nas opções acima!</h1>
      <p>Loja: {store?.name}</p>
    </div>
  );
};

export default DashboardPage;
