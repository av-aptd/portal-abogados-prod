import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React from "react";
import type { ReactElement } from "react";
import Head from "next/head";
import ListClients from "components/portal/clients/listClients";

const Clientes: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Clientes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="pt-6 mx-auto max-w-7xl">
        <ListClients section="comercial" />
      </div>
    </>
  );
};

Clientes.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Clientes;
