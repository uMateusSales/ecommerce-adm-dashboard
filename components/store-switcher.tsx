"use client";
import { useState } from "react";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@prisma/client";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { StoreModal } from "./modals/store-modal";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  stores: Store[];
}

const StoreSwitcher = ({ className, stores = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const storeItems = stores.map((i) => ({ label: i.name, value: i.id }));
  const currentStore = storeItems.find((i) => i.value === params.storeId);
  const storeSelect = (store: { value: string; label: string }) => {
    setOpen(true);
    router.push(`/${store.value}`);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Escolha uma loja"
            className={cn("w-[200px] justify-between ", className)}
          >
            <StoreIcon className="mr-2 h-5 w-5" />
            {currentStore?.label}
            <ChevronsUpDown className="ml-auto h-5 w-5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Procurar loja..." />
              <CommandEmpty>Nenhuma loja encontrada</CommandEmpty>
              <CommandGroup>
                {storeItems.map((i) => (
                  <CommandItem
                    key={i.value}
                    onSelect={() => storeSelect(i)}
                    className="text-sm"
                  >
                    <StoreIcon className="mr-2 h-5 w-5" />
                    {i.label}
                    <Check
                      className={cn(
                        "ml-auto h-5 w-5",
                        currentStore?.value === i.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    storeModal.onOpen();
                  }}
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Criar nova loja
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default StoreSwitcher;
