"use client";
import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetUpPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <main className="p-4">Root page</main>;
}
