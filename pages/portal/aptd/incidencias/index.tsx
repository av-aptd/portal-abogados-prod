import React from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import type { ReactElement } from "react";
import PortalHeader from "components/portal/layout/header";
import ListIncidents from "components/portal/incidencias/listIncidents";
import IncidentSlideOver from "components/portal/incidencias/incidentSlide";

const Incidencias: NextPageWithLayout = () => {
  return (
    <>
      <PortalHeader title="Listado incidencias" />
      <div className="mx-auto max-w-7xl py-6">
        <ListIncidents />
      </div>
      <IncidentSlideOver />
    </>
  );
};

Incidencias.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Incidencias;
