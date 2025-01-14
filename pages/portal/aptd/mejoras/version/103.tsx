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

const v103: NextPageWithLayout = () => {
  return (
    <>
      <PortalHeader title="Versión v1.03" />

      <ComplexSectionBloc>
        <HeaderSection title="v1.03" hasActions>
          <p className="text-sm text-gray-500">29.08.2023</p>
        </HeaderSection>
        <BodySection>
          <div className="flex space-x-2">
            <Department department="Comercial" /> <Department department="RE" />{" "}
            <Department department="Procesal" />
          </div>
          <p className="text-gray-700 pb-4 text-sm">
            Se ha modificado el apartado de cliente por parte de APTD para poder
            visualizar los datos de los clientes por expediente y por entidad.
          </p>

          <img
            src="/changelog/v103/1.webp"
            alt="1.01"
            className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl border"
          />

          <p className="text-gray-700 py-4 text-sm">
            Ahora en el listado de clientes se muestra la entidad.
          </p>

          <img
            src="/changelog/v103/2.webp"
            alt="1.01"
            className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl border"
          />

          <p className="text-gray-700 py-4 text-sm">
            Una vez dentro del cliente, se puede ver el detalle del cliente en
            el apartado <span className="font-bold">Información</span> y si
            tiene un perfil de Unidad Familiar asociado.
          </p>

          <img
            src="/changelog/v103/3.webp"
            alt="1.01"
            className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl border"
          />

          <p className="text-gray-700 py-4 text-sm">
            En el apartado <span className="font-bold">Expedientes</span> se
            muestra un listado de todos los expedientes del cliente.
          </p>

          <img
            src="/changelog/v103/4.webp"
            alt="1.01"
            className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl border"
          />

          <p className="text-gray-700 py-4 text-sm">
            En el apartado <span className="font-bold">Acreedores</span> se
            muestra un listado de todos los acreedores del cliente.
          </p>

          <img
            src="/changelog/v103/5.webp"
            alt="1.01"
            className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl border"
          />

          <p className="text-gray-700 py-4 text-sm">
            En el apartado <span className="font-bold">Pagos</span> se muestra
            un listado de todos los pagos realizados por el cliente.
          </p>

          <img
            src="/changelog/v103/6.webp"
            alt="1.01"
            className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl border"
          />

          <p className="text-gray-700 py-4 text-sm">
            En el apartado <span className="font-bold">Preguntas</span> se
            muestran todas las preguntas realizadas por el cliente, tanto las
            del estudio económico como las de dentro del portal.
          </p>

          <img
            src="/changelog/v103/7.webp"
            alt="1.01"
            className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl border"
          />

          <p className="text-gray-700 py-4 text-sm">
            En el apartado <span className="font-bold">Notificaciones</span> se
            muestran todas las Notificaciones enviadas al cliente.
          </p>

          <img
            src="/changelog/v103/8.webp"
            alt="1.01"
            className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl border"
          />

          <p className="text-gray-700 py-4 text-sm">
            Dentro de un expediente, se puede ver el detalle del expediente y el
            estado, su contrato y los participantes del expediente.
          </p>

          <img
            src="/changelog/v103/9.webp"
            alt="1.01"
            className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl border"
          />

          <p className="text-gray-700 py-4 text-sm">
            En el apartado <span className="font-bold">Documentos</span> se
            muestran todas los documentos requeridos para ese expediente y los
            subidos por el cliente.
          </p>

          <img
            src="/changelog/v103/10.webp"
            alt="1.01"
            className="rounded-lg object-cover overflow-hidden mt-4 lg:max-w-xl border"
          />

          <p className="text-gray-700 py-4 text-sm">
            En el apartado <span className="font-bold">Anotaciones</span> se
            mostrarán las anotaciones del expediente. Ahora en construcción.
          </p>
        </BodySection>
      </ComplexSectionBloc>
    </>
  );
};

v103.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <VersionsLayout>{page}</VersionsLayout>
    </PortalLayout>
  );
};

export default v103;
