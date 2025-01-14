import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React from "react";
import type { ReactElement } from "react";
import { usePortalStore } from "store/portal";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { getUserProcesses } from "apis/client";
import { useQuery } from "@tanstack/react-query";
import PreguntasPanel from "components/portal/panel/preguntas";
import AcreedoresPanel from "components/portal/panel/acreedores";
import QuienPanel from "components/portal/panel/quien";
import ComoPanel from "components/portal/panel/como";
import PagosPanel from "components/portal/panel/pagos";
import DocumentosPanel from "components/portal/panel/documentos";
import Head from "next/head";

const Panel: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);

  const processesQuery = useQuery(["userProcesses"], () =>
    getUserProcesses(profile.token, profile.id)
  );

  return (
    <>
      <Head>
        <title>Panel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="pt-6 mx-auto max-w-7xl">
        <div className=" grid xl:grid-cols-2 gap-8 mt-4 pb-24 sm:pb-0">
          <SectionBloc title="Mi expediente">
            <div className="flex flex-col space-y-4">
              <PreguntasPanel />
              <AcreedoresPanel />
              <DocumentosPanel procesos={processesQuery} />
            </div>
          </SectionBloc>
          <SectionBloc title="Mi caso">
            <div className="flex flex-col space-y-4">
              <QuienPanel procesos={processesQuery} />
              <ComoPanel />
              <PagosPanel procesos={processesQuery} />
            </div>
          </SectionBloc>
        </div>
      </div>
    </>
  );
};

Panel.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Panel;
