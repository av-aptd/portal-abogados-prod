import { Upload, Warning, Check } from "components/icons";
import Link from "next/link";
import React, { useState, useEffect, use } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDocsToValidate, requiredDocsByProcessId } from "apis/processes";
import { usePortalStore } from "store/portal";
import { infoForDocuments } from "shared/helpers";

const DocumentosPanel = ({ procesos }: any) => {
  const path = usePathname();
  const [rejected, setRejected] = useState<any[]>([]);
  const [approved, setAproved] = useState<any[]>([]);
  const profile = usePortalStore((state) => state.profile);
  const clientInfo = usePortalStore((state) => state.clientInfo);

  const infoDocs = useQuery(["userProfileDocs"], () =>
    infoForDocuments(clientInfo, profile.token, profile.id)
  );

  console.log("infoDocs", infoDocs);

  const NumDocsQuery = useQuery(
    ["numDocs"],
    () =>
      requiredDocsByProcessId(
        profile.token,
        procesos.data[0].id,
        JSON.stringify(infoDocs.data != undefined ? infoDocs.data : [])
      ),
    {
      enabled: !!procesos.data && !!infoDocs,
    }
  );

  const userDocsUploaded = useQuery(
    ["filesUploaded"],
    () => getDocsToValidate(profile.token, procesos.data[0].id),
    {
      enabled: !!procesos.data,
      onSuccess(data) {
        setRejected(data.filter((item: any) => item.status === 2));
        setAproved(data.filter((item: any) => item.status === 1));
      },
    }
  );

  const totalDocsToUpload = () => {
    let totalDocs = 0;

    for (let i = 0; i < NumDocsQuery.data?.length; i++) {
      totalDocs += Number(NumDocsQuery.data[i].minDocsRequired);
    }

    return totalDocs;
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b flex justify-between items-center p-4 bg-gray-50">
        <div className="flex space-x-2 items-center">
          <Upload className="w-6 h-6 text-gray-400" />
          <h3 className="text-gray-700">Documentación requerida</h3>
        </div>
        <div>
          {rejected.length > 0 && <Warning className="w-6 h-6 text-red-400" />}
          {NumDocsQuery.isLoading ? (
            <></>
          ) : (
            <>
              {approved.length == NumDocsQuery.data?.length && (
                <Check className="w-6 h-6 text-secondary" />
              )}
            </>
          )}
        </div>
      </div>
      <div className="p-4">
        {NumDocsQuery.isLoading || userDocsUploaded.isLoading ? (
          <></>
        ) : (
          <p className="text-gray-500 text-sm">
            Has subido{" "}
            {userDocsUploaded.data?.filter((d: any) => d.status != 2).length -
              1}{" "}
            de {totalDocsToUpload()} documentos requeridos.
          </p>
        )}

        {rejected.length > 0 && (
          <div>
            <p className="text-red-400 text-sm">
              Tienes {rejected.length}{" "}
              {rejected.length > 1
                ? "documentos rechazados."
                : "documento rechazado."}
            </p>
          </div>
        )}
        <div className="flex justify-end">
          <Link
            href={`${path}/documentacion`}
            className="border text-sm p-2 rounded-lg mt-4 inline-block text-gray-500 hover:bg-gray-50 duration-150"
          >
            Subir documentación
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentosPanel;
