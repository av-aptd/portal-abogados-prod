import Link from "next/link";
import React from "react";
import { CreditorsList, Warning } from "components/icons";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { usePortalStore } from "store/portal";
import { getUserCreditors } from "apis/client";

const CreditorBox = ({ userId }: number | any) => {
  const profile = usePortalStore((state) => state.profile);

  const { data, isLoading } = useQuery(["userCreditors", userId], () =>
    getUserCreditors(profile.token, userId)
  );

  if (isLoading) return null;

  console.log(data);

  return (
    <Link
      href={`/portal/aptd/procesal/documentacion/${userId}/documentos/acreedores`}
      className={clsx(
        data.length < 2 ? "border-red-400" : "",
        " border-2 flex justify-center items-center rounded-lg bg-gray-50 hover:bg-gray-100 duration-150 relative"
      )}
    >
      <div className="p-6">
        <div className="pb-1">
          <CreditorsList
            className={clsx(
              data.length < 2 ? "text-red-400" : "text-gray-500",
              "w-12 h-12  mx-auto"
            )}
          />
        </div>
        <p
          className={clsx(
            data.length < 2 ? "text-red-400" : "text-gray-500",
            "text-sm  px-4 text-center mt-2"
          )}
        >
          Listado de acreedores cliente.
        </p>
      </div>
      {data.length < 2 && (
        <Warning className="absolute top-1 right-1 w-5 h-5 text-red-400" />
      )}
    </Link>
  );
};

export default CreditorBox;
