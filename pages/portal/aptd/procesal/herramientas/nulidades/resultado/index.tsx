var slugify = require("slugify");
import PortalLayout from "components/layouts/portal";
import {
  Page,
  Text,
  View,
  Document,
  usePDF,
  Image,
  pdf,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import createTw from "react-pdf-tailwind";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../../../../../_app";

import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import useNulidadesStore from "store/procesal/nulidadesStore";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Inter"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

const BurofaxResultado: NextPageWithLayout = () => {
  const nulidades = useNulidadesStore((state) => state.nulidades);
  const deleteAll = useNulidadesStore((state) => state.deleteAll);

  const sendAll = async () => {
    // function delay(ms: any) {
    //   return new Promise((resolve, reject) => setTimeout(resolve, ms));
    // }
    // async function test() {
    //   for (let i = 0; i < nulidades.length; i++) {
    //     await delay(300);
    //     descargar(nulidades[i]);
    //   }
    // }
    // test();
  };

  const formatFirstName = (name: string) => {
    return name.split(",")[1];
  };

  const formatLastName = (name: string) => {
    return name.split(",")[0];
  };

  return (
    <div className="pt-6 mx-auto max-w-7xl">
      <ComplexSectionBloc>
        <HeaderSection title="Listado nulidad" hasActions>
          <div className="flex-shrink-0 flex space-x-2">
            <button
              type="button"
              onClick={deleteAll}
              className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 sm:w-auto"
            >
              Borrar
            </button>
            <button
              type="button"
              onClick={sendAll}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:w-auto"
            >
              Enviar
            </button>
          </div>
        </HeaderSection>
        <BodySection>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          DNI Cliente
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Nombre Cliente
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Datos entidad
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {nulidades.map((nulidad, personIdx) => (
                        <tr
                          key={personIdx}
                          className={
                            personIdx % 2 === 0 ? undefined : "bg-gray-50"
                          }
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {nulidad.CLIENTE_Nif}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatFirstName(nulidad.CLIENTE_Nombre)}{" "}
                            {formatLastName(nulidad.CLIENTE_Nombre)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {nulidad.FechaCreacion}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </BodySection>
      </ComplexSectionBloc>
    </div>
  );
};

BurofaxResultado.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default BurofaxResultado;
