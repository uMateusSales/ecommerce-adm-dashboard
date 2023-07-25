"use client";

import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "./button";
import { Alert, AlertDescription, AlertTitle } from "./alert";

interface ApiAlertProps {
  title: string;
  description: string;
  type: "public" | "admin";
}

const textMap: Record<ApiAlertProps["type"], string> = {
  public: "Public",
  admin: "Admin",
};
const typeMap: Record<ApiAlertProps["type"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  type = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
  };

  return (
    <Alert>
      <div className="flex items-center gap-x-2">
        <Server className="h-5 w-5" />
        <AlertTitle>{title}</AlertTitle>

        <Badge variant={typeMap[type]}>{textMap[type]}</Badge>
      </div>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-5 w-5" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
