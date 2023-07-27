"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams, useRouter } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityId: string;
}

export const ApiList: React.FC<ApiListProps> = ({ entityId, entityName }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/stores/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        type="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        type="public"
        description={`${baseUrl}/${entityName}/{${entityId}}`}
      />
      <ApiAlert
        title="POST"
        type="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        type="admin"
        description={`${baseUrl}/${entityName}/{${entityId}}`}
      />
      <ApiAlert
        title="DELETE"
        type="admin"
        description={`${baseUrl}/${entityName}/{${entityId}}`}
      />
    </>
  );
};
