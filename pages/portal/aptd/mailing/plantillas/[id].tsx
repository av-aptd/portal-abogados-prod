import React from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import type { ReactElement } from "react";
import { useRouter } from "next/router";
import CustomTemplate from "../components/templates/custom";
import WebinarTemplate from "../components/templates/webinar";
import Pago2oTemplate from "../components/templates/pago2";
import PlantillaPredefinida from "../components/templates/predefinida";
import PlantillaManual from "../components/templates/manual";

const Plantilla: NextPageWithLayout = () => {
  const { query } = useRouter();

  return (
    <div className="pt-6 mx-auto max-w-7xl">
      {query.id == "webinar" && <WebinarTemplate />}
      {query.id == "custom" && <CustomTemplate />}
      {query.id == "pago2ocuota" && <Pago2oTemplate />}
      {query.id == "predefinida" && <PlantillaPredefinida />}
      {query.id == "manual" && <PlantillaManual />}
    </div>
  );
};

export default Plantilla;

Plantilla.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};
