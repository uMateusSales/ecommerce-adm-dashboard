import { MainNav } from "@/components/main-nav";
import { QuickLinks } from "@/components/quicklinks";
import prisma from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prisma.store.findFirst({ where: { id: params.storeId } });

  const produtos = await prisma.product.findMany({
    where: { storeId: params.storeId },
  });
  const categorias = await prisma.category.findMany({
    where: { storeId: params.storeId },
  });
  const cores = await prisma.color.findMany({
    where: { storeId: params.storeId },
  });
  const tamanhos = await prisma.size.findMany({
    where: { storeId: params.storeId },
  });

  const vitrine = await prisma.billBoard.findFirst({
    where: { storeId: params.storeId },
  });
  return (
    <div className="grid grid-cols-2 p-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">Bem vindo ao administrador de sua loja!</h1>
        <p className="font-semibold">Loja: {store?.name}</p>
        <p className="font-semibold">Vitrine principal: {vitrine?.label}</p>
        <p>Vou te falar passo a passo pra você jar ir começando...</p>
        <p>
          1 - Comece criando uma vitrine nova,{" "}
          <span className="font-semibold">
            a vitrine sera o banner principal de sua loja e onde ficara o titulo
            principal dela no site
          </span>
        </p>
        <p>
          2 - Logo apos criar sua vitrine, crie as categorias de produtos que
          sua loja vai vender todos os produtos ficarão separados nas categorias
          que você criar
        </p>
        <p>
          3 - Após isso,{" "}
          <span className="font-semibold">crie alguns tamanhos e cores</span>.
          Tudo pode ser criado ao seu gosto e ficarão disponiveis quando você
          atribuir aos novos produtos
        </p>
        <p>
          4 - Depois de ter seguidos os passos acima, esta na hora de criar os
          seu produtos, crie produtos atribuindo em sua devida categoria e
          vitrine. Apos isso o produto ficara exposto em seu site
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2>
          Clique em alguns dos botões abaixo para ir mais rapidamente criar algo
          que deseja
        </h2>
        <QuickLinks />
        <div className="flex flex-col items-center mt-6">
          <p>Atualmente você possui cadastrados:</p>
          <div className="font-semibold">
            <p>{produtos.length} produtos</p>
            <p>{categorias.length} categorias</p>
            <p>{cores.length} cores</p>
            <p>{tamanhos.length} tamanhos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
