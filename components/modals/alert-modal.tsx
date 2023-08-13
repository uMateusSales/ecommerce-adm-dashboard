"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Modal
        title="Tem certeza ?"
        description="Esta ação não pode ser desfeita"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="pt-8 space-x-3 flex items-center justify-end w-full">
          <Button variant="outline" disabled={loading} onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" disabled={loading} onClick={onConfirm}>
            Continuar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AlertModal;
