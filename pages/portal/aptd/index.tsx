import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "./../../_app";
import React from "react";
import type { ReactElement } from "react";

const Portal: NextPageWithLayout = () => {
  return (
    <div className="mt-8">
      <div className="bg-white p-8 rounded-lg border max-w-3xl mx-auto">
        <h1 className="text-center text-primary font-bold text-lg">
          Bienvenido al portal v2.0
        </h1>
        <p className="text-center text-gray-400 pt-2">
          Estamos en modo de pruebas, no tengáis en cuenta los errores que
          puedan surgir.
        </p>
        <p className="text-center text-xs text-secondary pt-4">
          Con amor, el equipo de tecnología ;)
        </p>
      </div>
    </div>
  );
};

Portal.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Portal;
