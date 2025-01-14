import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../../_app";
import React from "react";
import type { ReactElement } from "react";

import ExcelUploader from "./components/uploader";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { useRouter } from "next/router";
const Autorizacion: NextPageWithLayout = () => {
  const router = useRouter();

  const processExcel = async () => {
    router.push("autorizacion/resultado");
  };

  return (
    <div className="py-6 mx-auto max-w-7xl">
      <SectionBloc
        title="Autorizaciones"
        description="Subir archivo de autorizaciones"
      >
        <ExcelUploader />
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full lg:w-auto flex justify-center rounded-md border border-gray-300 bg-gray-50 px-10 py-2 text-sm font-medium leading-4 text-gray-500 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Volver
          </button>
          <button
            type="button"
            onClick={processExcel}
            className="w-full lg:w-auto flex justify-center rounded-md border border-transparent bg-secondary px-10 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Continuar
          </button>
        </div>
      </SectionBloc>
    </div>
  );
};

Autorizacion.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Autorizacion;
