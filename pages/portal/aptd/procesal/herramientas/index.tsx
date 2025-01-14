import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React from "react";
import type { ReactElement } from "react";

import { Venia, Calculadora, Autorizacion, Burofax } from "components/icons";
import Link from "next/link";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import PortalHeader from "components/portal/layout/header";

const Herramientas: NextPageWithLayout = () => {
  return (
    <>
      <PortalHeader title="Herramientas de procesal" />

      <div className="pt-6 mx-auto max-w-7xl">
        <SectionBloc
          title="Herramientas"
          description="Listado de herramientas para acelerar procesos"
        >
          <div className="grid lg:grid-cols-4 gap-8 items-start">
            <Link
              href="/portal/aptd/procesal/herramientas/venias"
              className="bg-gray-50 rounded-lg border p-8 hover:bg-gray-100 duration-150"
            >
              <div>
                <div className="flex justify-center">
                  <Venia className="h-12 w-12 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500 text-center pt-2">Venias</p>
              </div>
            </Link>

            <Link
              href="/portal/aptd/procesal/herramientas/calculadora"
              className="bg-gray-50 rounded-lg border p-8 hover:bg-gray-100 duration-150"
            >
              <div>
                <div className="flex justify-center">
                  <Calculadora className="h-12 w-12 text-gray-500" />
                </div>

                <p className="text-sm text-gray-500 text-center pt-2">
                  Calculadora de embargos
                </p>
              </div>
            </Link>

            <Link
              href="/portal/aptd/procesal/herramientas/autorizacion"
              className="bg-gray-50 rounded-lg border p-8 hover:bg-gray-100 duration-150"
            >
              <div>
                <div className="flex justify-center">
                  <Autorizacion className="h-12 w-12 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500 text-center pt-2">
                  Autorización
                </p>
              </div>
            </Link>

            <Link
              href="/portal/aptd/procesal/herramientas/burofax"
              className="bg-gray-50 rounded-lg border p-8 hover:bg-gray-100 duration-150"
            >
              <div>
                <div className="flex justify-center">
                  <Burofax className="h-12 w-12 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500 text-center pt-2">
                  Burofax
                </p>
              </div>
            </Link>
            <Link
              href="/portal/aptd/procesal/herramientas/nulidades"
              className="bg-gray-50 rounded-lg border p-8 hover:bg-gray-100 duration-150"
            >
              <div>
                <div className="flex justify-center">
                  <Burofax className="h-12 w-12 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500 text-center pt-2">
                  Nulidades
                </p>
              </div>
            </Link>
          </div>
        </SectionBloc>
      </div>
    </>
  );
};

Herramientas.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Herramientas;
