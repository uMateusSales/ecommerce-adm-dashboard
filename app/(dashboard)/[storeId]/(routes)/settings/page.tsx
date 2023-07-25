import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prisma from "@/lib/prismadb";
import SettingsForm from "@/app/(dashboard)/[storeId]/(routes)/settings/components/settings-form";

interface SettingsPageProps {
  params: { storeId: string };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col gap-3">
      <div>
        <SettingsForm data={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
