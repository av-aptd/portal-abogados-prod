import clsx from "clsx";
import React, { useState } from "react";
import { formatDate } from "shared/helpers";
import Link from "next/link";
import { Ring } from "@uiball/loaders";
import { DocToValidate, Trash, Cross } from "components/icons";
import { useUIStore } from "store/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDocument, setStatusDocument } from "apis/processes";
import { usePortalStore } from "store/portal";

const DocCard = ({ doc, processId, customerId }: any) => {
  const showModalExtended = useUIStore((state) => state.showModalExtended);
  const profile = usePortalStore((state) => state.profile);

  const setDocId = usePortalStore((state) => state.setDocId);
  const queryClient = useQueryClient();

  const rejectDoc = async (docId: string) => {
    setDocId(docId);
    showModalExtended();
  };

  const deleteMutation = useMutation(
    async (docId) => deleteDocument(profile.token, processId, docId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["documents"] });
      },
    }
  );

  const deleteDoc = async (docId: any) => {
    deleteMutation.mutate(docId);
  };

  return (
    <>
      <div
        className="bg-white mb-3 last:mb-0 rounded-lg border p-3 text-sm flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center"
        key={doc.id}
      >
        <div>
          <p className="flex-1">{doc.documentType.name}</p>
          {doc?.status == 2 && (
            <p className="text-xs text-red-500 pt-1 md:pt-0.5 text-center md:text-left pb-2 md:pb-0">
              Motivo del rechazo: {doc.status_reason}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <p className="w-20 text-xs text-gray-500">
            {formatDate(doc.uploadedDate, "short", "es")}
          </p>
          <p className="pr-6">
            <span
              className={clsx(
                doc.status == 0 && "text-yellow-800 bg-yellow-100",
                doc.status == 1 && "text-green-800 bg-green-100",
                doc.status == 2 && "text-red-800 bg-red-100",
                "px-4 rounded-full py-1 text-xs"
              )}
            >
              {doc.status == 0 && "Pendiente"}
              {doc.status == 1 && "Validado"}
              {doc.status == 2 && "Rechazado"}
            </span>
          </p>
          {doc.status == 0 && (
            <Link
              href={{
                pathname: `/portal/aptd/retencion/validar-documentacion/[processId]/[documentId]`,
                query: {
                  processId: processId,
                  documentId: doc.id,
                  customerId: customerId,
                },
              }}
              className=""
            >
              <DocToValidate className="w-6 h-6 text-gray-400" />
            </Link>
          )}
          {doc.status == 1 && (
            <button onClick={() => rejectDoc(doc.id)} className="p-0.5">
              <Cross className="w-5 h-5 text-gray-400" />
            </button>
          )}
          {doc.status == 2 && (
            <button
              onClick={() => deleteDoc(doc.id)}
              disabled={deleteMutation.isLoading}
              className=""
            >
              {deleteMutation.isLoading ? (
                <Ring size={20} color="#9DA3B0" />
              ) : (
                <Trash className="w-6 h-6 text-gray-400" />
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DocCard;
