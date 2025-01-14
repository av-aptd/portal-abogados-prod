import React from "react";
import BodySection from "components/layouts/components/section/bodySection";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import Department from "components/portal/changelog/department";
import PortalLayout from "components/layouts/portal";
import VersionsLayout from "components/layouts/versions";
import type { NextPageWithLayout } from "../../../../_app";
import type { ReactElement } from "react";
import PortalHeader from "components/portal/layout/header";

const v101: NextPageWithLayout = () => {
  return (
    <>
      <PortalHeader title="Versión v1.01" />

      <ComplexSectionBloc>
        <HeaderSection title="v1.01" hasActions>
          <p className="text-sm text-gray-500">28.06.2023</p>
        </HeaderSection>
        <BodySection>
          <Department department="Comercial" />
          <ul className="list-disc list-inside text-gray-700 pb-4 text-sm pl-2">
            <li>
              Ya se pueden modificar los campos de nombre, apellidos, teléfono,
              DNI y deuda de un lead.
            </li>
          </ul>

          <Department department="RE" />
          <ul className="list-disc list-inside text-gray-700 pb-4 text-sm pl-2">
            <li className="pb-4">
              Se ha añadido la posibilidad de añadir documentos requeridos. al
              cliente.
              <img
                src="/changelog/v101/1.webp"
                alt="1.01"
                className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl"
              />
            </li>
            <li>
              Se ha añadido un buscador para encontrar el documento. requerido.
              <img
                src="/changelog/v101/2.webp"
                alt="1.01"
                className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl"
              />
            </li>
          </ul>
          <Department department="Procesal" />
          <ul className="list-disc list-inside text-gray-700 pb-4 text-sm pl-2">
            <li>
              Misma funcionalidad que en RE para los documentos requeridos.
            </li>
          </ul>
          <Department department="Contabilidad" />
          <ul className="list-disc list-inside text-gray-700 pb-4 text-sm pl-2">
            <li>
              Ahora se diferencian los pagos con tarjeta de los de suscripción.
            </li>
            <li>
              Se muestran las 4 últimas cifras de la tarjeta en los pagos.
            </li>
          </ul>
        </BodySection>
      </ComplexSectionBloc>
    </>
  );
};

v101.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <VersionsLayout>{page}</VersionsLayout>
    </PortalLayout>
  );
};

export default v101;
