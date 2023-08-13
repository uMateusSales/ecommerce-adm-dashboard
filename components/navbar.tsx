import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import { ModeToggle } from "./theme-toggle";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prisma.store.findMany({ where: { userId } });

  return (
    <div className="borde-b shadow-sm">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher stores={stores} />

        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4 ">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
