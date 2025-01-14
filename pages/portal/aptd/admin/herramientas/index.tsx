import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "./../../../../_app";
import React from "react";
import type { ReactElement } from "react";
import Link from "next/link";

const AdminHerramientas: NextPageWithLayout = () => {
  return (
    <div className="mt-8">
      <div className="bg-white p-8 rounded-lg border max-w-3xl mx-auto">
        <h1 className="text-center text-primary font-bold text-lg">
          HERRAMIENTAS ADMIN
        </h1>
        <p className="text-center text-gray-400 pt-2">Por favor no tocar</p>
        <div className="flex justify-center mt-8">
          <Link
            href="/portal/aptd/admin/herramientas/nueva-cuenta"
            className="bg-secondary text-white px-4 py-1 text-sm rounded"
          >
            Nueva Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

AdminHerramientas.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default AdminHerramientas;
