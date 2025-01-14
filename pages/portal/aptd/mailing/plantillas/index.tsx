import React from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import type { ReactElement } from "react";
import { Webinar, Custom, Pago2o, Predefinida } from "components/icons";
import Link from "next/link";
import SectionBloc from "components/layouts/components/section/sectionBloc";
const Plantillas: NextPageWithLayout = () => {
  return (
    <div className="pt-6 mx-auto max-w-7xl">
      <SectionBloc title="Selecciona una Plantillas">
        <div className="grid lg:grid-cols-4 gap-8">
          <Link href="/portal/aptd/mailing/plantillas/webinar">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-center pb-2">
                <Webinar className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-center text-gray-500">Plantilla Webinar</p>
            </div>
          </Link>
          <Link href="/portal/aptd/mailing/plantillas/custom">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-center pb-2">
                <Custom className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-center text-gray-500">Plantilla Custom</p>
            </div>
          </Link>
          <Link href="/portal/aptd/mailing/plantillas/pago2ocuota">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-center pb-2">
                <Pago2o className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-center text-gray-500">Plantilla 2o pago</p>
            </div>
          </Link>
          <Link href="/portal/aptd/mailing/plantillas/predefinida">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-center pb-2">
                <Predefinida className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-center text-gray-500">Plantilla predefinida</p>
            </div>
          </Link>
        </div>
      </SectionBloc>
    </div>
  );
};

export default Plantillas;

Plantillas.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};
