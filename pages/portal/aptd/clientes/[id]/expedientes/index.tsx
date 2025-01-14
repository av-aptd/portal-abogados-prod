import PortalLayout from "components/layouts/portal";

import type { NextPageWithLayout } from "../../../../../_app";
import type { ReactElement } from "react";
import React from "react";
import ClientLayout from "components/layouts/client";
import { usePortalStore } from "store/portal";
import LoadingContainer from "components/portal/loading";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserProcesses } from "apis/client";
import PortalHeader from "components/portal/layout/header";
import { ArrowNext } from "components/icons";

const ExpedientesUserAdmin: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();

  const userProcessesQuery = useQuery(
    ["userProcesses", router.query.id],
    async () => getUserProcesses(profile.token, router.query.id)
  );

  return (
    <>
      <PortalHeader title="Expedientes" />
      <div className="flex justify-between border-b border-gray-100 px-4 pb-4">
        <p className="text-sm font-medium pt-1">Listado de los expedientes</p>
      </div>
      <div className="p-4">
        {userProcessesQuery.isLoading ? (
          <LoadingContainer />
        ) : (
          <>
            {userProcessesQuery.data &&
              userProcessesQuery.data.map((process: any) => (
                <Link
                  href={`/portal/aptd/clientes/${router.query.id}/expedientes/${process.id}`}
                  className="border p-4 rounded-lg flex justify-between items-center mb-4 hover:bg-gray-50 duration-150"
                  key={process.id}
                >
                  <div>
                    <p className="text-gray-500 text-sm">
                      {process.processname}
                    </p>
                    <p className="text-gray-700 font-medium text-sm">
                      Plan {process.planName} -{" "}
                      {process.contractprice.toLocaleString("es-AR")}€
                    </p>
                  </div>

                  <ArrowNext className="text-gray-400 w-6 h-6" />
                </Link>
              ))}
          </>
        )}
      </div>
    </>
  );
};

ExpedientesUserAdmin.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ClientLayout>{page}</ClientLayout>
    </PortalLayout>
  );
};

export default ExpedientesUserAdmin;
