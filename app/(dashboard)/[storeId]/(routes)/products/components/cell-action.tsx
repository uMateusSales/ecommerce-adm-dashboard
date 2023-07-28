"use client";
import { useParams, useRouter } from "next/navigation";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductColumn } from "./columns";
import { Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}/products/${data.id}`);
      router.refresh();
    } catch (error) {
      console.log("[PRODUCT_DELETE]", error);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-10 -w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Edit className="h-5 w-5 mr-2" />
            Actions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Edit className="h-5 w-5 mr-2" />
            Copy id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`products/${data.id}`)}>
            <Edit className="h-5 w-5 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Edit className="h-5 w-5 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
