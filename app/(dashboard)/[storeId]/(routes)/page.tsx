import ConfigCard from "@/components/ConfigCard";

import { QuickLinks } from "@/components/quicklinks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="grid grid-cols-2 p-2 gap-3 mx-5">
      <div className="flex flex-col gap-2">
        <Card className="shadow">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-3xl">
              Bem vindo ao administrador de sua loja!
            </CardTitle>
            <CardDescription className="font-semibold">
              Aqui você vai poder configurar tudo que sua loja precisa para
              funcionar
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-lg">
            Sua loja é: {store?.name}
            <p className="font-semibold">
              Sua vitrine principal é a : {vitrine?.label}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col items-center">
            <CardTitle>
              Caso seja sua primeira vez utilizando o programa
            </CardTitle>
            <CardDescription>
              vou explicar brevemente para você ja ir começando a deixar sua
              loja pronta!
            </CardDescription>
          </CardHeader>
          <CardContent className="shadow-sm">
            <ConfigCard
              titulo="Vitrine"
              texto="É o titulo principal da sua primeira pagina, em sua vitrine principal que você muda a foto da primeira pagina e o nome de sua loja"
            />
            <ConfigCard
              titulo="Categoria"
              texto="São as categorias dos produtos de toda sua loja, seus clientes poderão navegar pelas categorias para encontrat um determinado tipo de produto"
            />
            <ConfigCard
              titulo="Produtos"
              texto="Aqui você visualizar todos os produtos criados na sua loja, assim como criar novos, alterar produtos ou remover produtos"
            />
            <ConfigCard
              titulo="Tamanhos"
              texto="Aqui você pode criar os tamanhos em que estarão disponiveis na hora que você for cadastrar um produto, podendo ter varios, ou apenas um padrão"
            />
            <ConfigCard
              titulo="Cores"
              texto="Aqui você pode criar as cores em que estarão disponiveis na hora que você for cadastrar um produto, podendo ser cores especificas, ou uma cor padrão "
            />{" "}
          </CardContent>
          <CardFooter className="flex flex-col">
            <QuickLinks />
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex flex-col gap-3">
            Resumo de sua loja
          </CardTitle>
          <CardDescription className="font-semibold text-lg">
            Aqui você pode acompanhar quantos cadastros e produtos você tem
            online
          </CardDescription>
          <CardContent className="flex flex-col self-center p-3 gap-4 mt-3 shadow-lg border">
            <CardDescription className="text-lg">
              Numero de produtos: {produtos.length}
            </CardDescription>
            <CardDescription className="text-lg">
              Numero de categorias: {categorias.length}
            </CardDescription>
            <CardDescription className="text-lg">
              Numero de Cores: {cores.length}
            </CardDescription>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DashboardPage;
