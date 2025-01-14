import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import ListCreditors from "components/portal/creditors/listCreditors";
import NewCreditorSlideOver from "components/portal/creditors/creditorSlideOver";
import PortalHeader from "components/portal/layout/header";

const AcreedoresList: NextPageWithLayout = () => {
  return (
    <>
      <PortalHeader title="Listado de acreedores" />
      <div className="pt-6 mx-auto max-w-7xl">
        <ListCreditors />
        <NewCreditorSlideOver />
      </div>
    </>
  );
};

AcreedoresList.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default AcreedoresList;
