import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useState, useEffect, use } from "react";
import type { ReactElement } from "react";
import NavSection from "components/portal/navSection";
import ContabilidadLayout from "components/layouts/contabilidad";

const Contabilidad: NextPageWithLayout = () => {
  return <></>;
};

Contabilidad.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ContabilidadLayout>{page}</ContabilidadLayout>
    </PortalLayout>
  );
};

export default Contabilidad;
