import React from "react";
import clsx from "clsx";
import { CreditorsList, Check, Warning } from "components/icons";
import MiniLoading from "../miniLoading";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserCreditors } from "apis/client";
import { usePortalStore } from "store/portal";

const AcreedoresPanel = () => {
  const path = usePathname();

  const profile = usePortalStore((state) => state.profile);

  const userCreditors = useQuery({
    queryKey: ["userCreditors", profile.token, profile.id],
    queryFn: () => getUserCreditors(profile.token, profile.id),
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b flex justify-between items-center p-4 bg-gray-50">
        <div className="flex space-x-2 items-center">
          <CreditorsList className="w-6 h-6 text-gray-400" />
          <h3 className="text-gray-700">Listado de acreedores</h3>
        </div>
        <div>
          {userCreditors.isLoading ? (
            <></>
          ) : (
            <>
              {userCreditors.data.length < 2 ? (
                <Warning className="w-6 h-6 text-red-400" />
              ) : (
                <Check className="w-6 h-6 text-secondary" />
              )}
            </>
          )}
        </div>
      </div>
      <div className="p-4">
        {userCreditors.isLoading ? (
          <MiniLoading color="#19ABE3" />
        ) : (
          <div>
            <p
              className={clsx(
                "text-sm",
                userCreditors.data.length < 2 ? "text-red-400" : "text-gray-500"
              )}
            >
              {userCreditors.data.length == 0
                ? "Todavía no has subido ningun acreedor."
                : userCreditors.data.length < 2
                ? `Has subido un acreedor y como mínimo necesitas subir 2 acreedores.`
                : `Has subido un total de ${userCreditors.data.length} acreedores.`}
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <Link
            href={`${path}/listado-acreedores`}
            className="border text-sm p-2 rounded-lg mt-4 inline-block text-gray-500 hover:bg-gray-50 duration-150"
          >
            Añadir acreedor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AcreedoresPanel;
