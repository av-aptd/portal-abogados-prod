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
const v102: NextPageWithLayout = () => {
  return (
    <>
      <PortalHeader title="Versión v1.02" />
      <ComplexSectionBloc>
        <HeaderSection title="v1.02" hasActions>
          <p className="text-sm text-gray-500">05.07.2023</p>
        </HeaderSection>
        <BodySection>
          <div className="flex space-x-2">
            <Department department="Comercial" /> <Department department="RE" />
          </div>

          <ul className="list-disc list-inside text-gray-700 pb-4 text-sm pl-2">
            <li>Ya se pueden crear links de pago para los clientes.</li>
          </ul>

          <ul className="list-disc list-inside text-gray-700 pb-4 text-sm pl-2">
            <li className="pb-4">
              En la sección pagos de la página de clientes, añadir cantidad y
              hacer click en <span className="font-bold">Enviar link</span>.
              <img
                src="/changelog/v102/1.webp"
                alt="1.01"
                className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl"
              />
            </li>
            <li className="pb-4">
              El cliente recibe un email personalizado con el link de pago.
              <img
                src="/changelog/v102/2.webp"
                alt="1.01"
                className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl"
              />
            </li>
            <li className="pb-4">
              El link de pago es una página con un formulario de pago.
              <img
                src="/changelog/v102/3.webp"
                alt="1.01"
                className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl"
              />
            </li>
            <li className="pb-4">
              Una vez pagado, el cliente es redirigido a una página de
              confirmación.
              <img
                src="/changelog/v102/4.webp"
                alt="1.01"
                className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl"
              />
            </li>
          </ul>
        </BodySection>
      </ComplexSectionBloc>
    </>
  );
};

v102.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <VersionsLayout>{page}</VersionsLayout>
    </PortalLayout>
  );
};

export default v102;
