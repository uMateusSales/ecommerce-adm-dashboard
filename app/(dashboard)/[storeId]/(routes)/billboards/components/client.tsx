"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillBoardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";


interface BillboardClientProps {
  data: BillBoardColumn[]
}




export const BillboardClient: React.FC<BillboardClientProps> = ({data}) => {
  const params = useParams();
  const router = useRouter();





  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards {${data.length}}`}
          description="Manage the billboardas for you stores"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-5 w-5" />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};
