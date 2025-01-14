var slugify = require("slugify");
import PortalLayout from "components/layouts/portal";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  usePDF,
  pdf,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import createTw from "react-pdf-tailwind";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../../../../../_app";
import useAutorizacionStore from "store/procesal/autorizacionStore";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";

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

const AutorizacionResultado: NextPageWithLayout = () => {
  const autorizaciones = useAutorizacionStore((state) => state.autorizaciones);
  const deleteAll = useAutorizacionStore((state) => state.deleteAll);

  const descargar = async (autorizacion: any) => {
    const blob = await pdf(
      <Document>
        <Page size="A4" style={tw("px-16 py-8")}>
          <View>
            <View style={tw("flex justify-start")}>
              <Image
                src="./../../../../Logo-aptd.png"
                style={tw("h-14 w-40 object-contain")}
              />
            </View>

            <Text
              style={tw("leading-5 text-[12px] text-gray-500 text-right pb-6")}
            >
              En Barcelona, a 9 de noviembre de 2022.
            </Text>

            <Text
              style={tw(
                "font-semibold text-[14px] text-gray-800 text-center pb-6"
              )}
            >
              AUTORIZACIÓN
            </Text>
            <Text
              style={tw(
                "leading-5 text-[12px] text-gray-500 text-justify pb-6"
              )}
            >
              <Text style={tw("text-gray-900")}>
                Don {autorizacion.Cliente}, con DNI/NIE{" "}
                {autorizacion.CLIENTE_Nif}
              </Text>
              , AUTORIZA al despacho profesional{" "}
              <Text style={tw("text-gray-900")}>CORMEUM GLOBAL, S.L.</Text>{" "}
              (comercialmente, ABOGADOS PARA TUS DEUDAS), así como a los
              abogados y asesores jurídicos que a continuación se enumerarán
              para que en mi nombre, indistintamente, procedan a recabar
              información personal, historial crediticio, solicitar copias de
              documentación, actos y contratos suscritos por mi persona en
              cualquier soporte, tramitar reclamaciones, iniciar negociaciones,
              transmitir o recabar información de las diferentes entidades
              bancarias, financieras y/o administraciones públicas en mi nombre,
              así como, ante las mismas: instar, seguir y tramitar, como actor,
              demandado o en cualquiera otro concepto, toda clase de
              expedientes, juicios y procedimientos civiles, criminales,
              administrativos, económico-administrativos, de trabajo,
              gubernativos, notariales, hipotecarios, de Hacienda, de
              jurisdicción voluntaria y de cualquier otra clase.
            </Text>

            <Text
              style={tw(
                "leading-5 text-[12px] text-gray-500 text-justify pb-6"
              )}
            >
              En todos estos casos dirigir, recibir y contestar requerimientos y
              notificaciones. Interponer recursos de alzada y cualquier otro
              acto previo al proceso. Celebrar actos de conciliación, con
              avenencia o sin ella en cuanto impliquen actos dispositivos.
              Renunciar o reconocer derechos, allanarse, renunciar a la acción
              de derecho discutida o a la acción procesal, o desistir de ellas;
              aceptar y rechazar las proposiciones del deudor o contraparte, así
              como realizar manifestaciones que puedan comportar sobreseimiento
              del proceso por satisfacción extraprocesal o carencia sobrevenida
              de objeto. Percibir cantidades indemnizatorias o no, resultantes
              de decisiones judiciales o extrajudiciales favorables a la parte
              poderdante, ya figuren en nombre de poderdante o apoderado.
            </Text>

            <Text style={tw("leading-5 text-[12px] text-gray-900 pb-6")}>
              Abogados y Asesores:
            </Text>
          </View>
          <View style={tw("leading-5 text-[12px] text-gray-500 pb-6")}>
            <Text>
              <Text style={tw("leading-5 text-[12px] text-gray-900")}>
                Doña Josefa Salazar Salazar
              </Text>{" "}
              Colegiada 4587 ICACordoba.
            </Text>
            <Text>
              <Text style={tw("leading-5 text-[12px] text-gray-900")}>
                Doña Elisabet De Vargas Capella{" "}
              </Text>{" "}
              Colegiada 42455 ICABarcelona.
            </Text>
            <Text>
              <Text style={tw("leading-5 text-[12px] text-gray-900")}>
                Doña María García García{" "}
              </Text>{" "}
              Colegiada 44675 ICABarcelona.
            </Text>
            <Text>
              <Text style={tw("leading-5 text-[12px] text-gray-900")}>
                Don Adrián Ugarte Angulo{" "}
              </Text>{" "}
              Colegiada 9156ICABilbao.
            </Text>
            <Text>
              <Text style={tw("leading-5 text-[12px] text-gray-900")}>
                Doña Marta García Castro{" "}
              </Text>{" "}
              Colegiada 46750 ICABarcelona.
            </Text>
            <Text>
              <Text style={tw("leading-5 text-[12px] text-gray-900")}>
                Don Rafael Guerrero Barrios{" "}
              </Text>{" "}
              Colegiado 5336 ICACádiz.
            </Text>
            <Text>
              <Text style={tw("leading-5 text-[12px] text-gray-900")}>
                Doña Sandra Gustems Lou{" "}
              </Text>{" "}
              Colegiada 37.961 ICABarcelona.
            </Text>
            <Text>
              <Text style={tw("leading-5 text-[12px] text-gray-900")}>
                Don Cristian Tanase{" "}
              </Text>{" "}
              con NIE nº Y4855937F.
            </Text>
            <Text>
              <Text style={tw("leading-5 text-[12px] text-gray-900")}>
                Don Gabriel González Borrego{" "}
              </Text>{" "}
              con DNI 51130156Y.
            </Text>
            <Text>
              <Text style={tw("leading-5 text-[12px] text-gray-900")}>
                Doña Milagros Zarate{" "}
              </Text>{" "}
              con NIE X5656099P.
            </Text>
            <Text>
              <Text style={tw("leading-5 text-[12px] text-gray-900")}>
                Doña Laura Yelo Munuera{" "}
              </Text>{" "}
              con DNI 48618580F.
            </Text>
          </View>
          <View>
            <Text
              style={tw(
                "leading-5 text-[12px] text-gray-500 pb-6 text-justify"
              )}
            >
              Es autorización expresa la que libro por medio de la presente, y
              para que así conste firmo la presenta a través del empleo de una
              firma electrónica, equivalente a la firma manuscrita del presente
              Documento.
            </Text>
          </View>
          <View style={tw("leading-5 text-[12px] text-gray-900")}>
            <Text>D/Dña: {autorizacion.Cliente}</Text>
            <Text>DNI/NIE: {autorizacion.CLIENTE_Nif}</Text>
          </View>
        </Page>
      </Document>
    ).toBlob();

    if (autorizacion.CLIENTE_Nif != "") {
      saveAs(
        blob,
        `${autorizacion.CLIENTE_Nif + "-" + slugify(autorizacion.Cliente)}.pdf`
      );
    }
  };

  const downloadAll = async () => {
    function delay(ms: any) {
      return new Promise((resolve, reject) => setTimeout(resolve, ms));
    }
    async function test() {
      for (let i = 0; i < autorizaciones.length; i++) {
        await delay(300);
        descargar(autorizaciones[i]);
      }
    }
    test();
  };

  return (
    <div className="pt-6 mx-auto max-w-7xl">
      <ComplexSectionBloc>
        <HeaderSection title="Listado autorizaciones" hasActions>
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
              onClick={downloadAll}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:w-auto"
            >
              Descargar todos
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
                          className="pr-10 py-3.5 text-right text-sm font-semibold text-gray-900"
                        >
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {autorizaciones.map((autorizacion, personIdx) => (
                        <tr
                          key={autorizacion.CLIENTE_Nif}
                          className={
                            personIdx % 2 === 0 ? undefined : "bg-gray-50"
                          }
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {autorizacion.CLIENTE_Nif}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {autorizacion.Cliente}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pr-4 text-right text-sm font-medium">
                            <button
                              onClick={() => descargar(autorizacion)}
                              className="text-secondary hover:text-blue-700"
                            >
                              Descargar
                            </button>
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

AutorizacionResultado.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default AutorizacionResultado;
