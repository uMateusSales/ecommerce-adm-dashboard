"use client";

import { Store } from "@prisma/client";
import Heading from "@/components/ui/heading";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

interface SettingsFormProps {
  data: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ data, ...props }) => {
  return (
    <div className="flex items-center justify-between">
      <Heading title="Configurações" description="Configrações de sua loja" />
      <Button variant="destructive" size="sm" onClick={() => {}}>
        <Trash className="h-5 w-5" />
      </Button>{" "}
      2:51
    </div>
  );
};

export default SettingsForm;
