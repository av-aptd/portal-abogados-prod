var slugify = require("slugify");
import PortalLayout from "components/layouts/portal";
import {
  Page,
  Text,
  View,
  Document,
  usePDF,
  pdf,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import useVeniaStore from "store/procesal/veniaStore";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../../../../../_app";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";

const styles = StyleSheet.create({
  page: { paddingHorizontal: 48, paddingTop: 48 },
  sectionLeft: {
    color: "#333",
    textAlign: "left",
    paddingBottom: 20,
    fontSize: 12,
  },
  sectionRight: {
    color: "#333",
    textAlign: "right",
    paddingVertical: 20,
    fontSize: 12,
  },
});

const VeniasResultado: NextPageWithLayout = () => {
  const abogadoActual = useVeniaStore((state) => state.abogadoActual);
  const colegiadoActual = useVeniaStore((state) => state.colegiadoActual);
  const venias = useVeniaStore((state) => state.venias);
  const deleteAll = useVeniaStore((state) => state.deleteAll);

  const descargar = async (venia: any) => {
    const blob = await pdf(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.sectionLeft}>
            <Text>A/A {venia.AbogadoQueAsumeVenia}</Text>
            <Text>Colegiado número {venia.Colegiado}</Text>{" "}
            <Text>CORMEUM GLOBAL, S.L.</Text>
            <Text>Expediente {venia.Expediente}</Text>
          </View>
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionRight}>
              En Barcelona, a 7 de noviembre de 2022.
            </Text>
            <Text style={styles.sectionLeft}>Apreciado compañero: </Text>
            <Text style={styles.sectionLeft}>
              Acuso recibo de tu solicitud de venia para la defensa de los
              intereses en la tramitación de los asuntos de D/Dña.{" "}
              {venia.NombreApellidosCliente}, encontrándose su expediente en la
              Base de Datos del Despacho CORMEUM GLOBAL, S.L., y por medio de la
              presente te CONCEDO LA VENIA para que puedas gestionar la
              dirección letrada del procedimiento en cuestión, con exención
              plena desde este momento de mi responsabilidad sobre el asunto
              asumido.
            </Text>
            <Text style={styles.sectionLeft}>
              Quedo a tu disposición para cualquier consulta sobre el particular
              con el fin de poder proteger los derechos del cliente.
            </Text>
            <Text>Atentamente,</Text>
          </View>

          <View style={styles.sectionLeft}>
            <Text>{abogadoActual}</Text>
            <Text>Colegiado {colegiadoActual}</Text>
          </View>
          <View style={styles.sectionLeft}>
            <Text>Recibí y conforme,</Text>
          </View>
          <View style={styles.sectionLeft}>
            <Text>{venia.AbogadoQueAsumeVenia}</Text>
            <Text>Colegiado número {venia.Colegiado}</Text>
          </View>
        </Page>
      </Document>
    ).toBlob();
    saveAs(
      blob,
      `${venia.Expediente + "-" + slugify(venia.NombreApellidosCliente)}.pdf`
    );
  };

  const downloadAll = async () => {
    function delay(ms: any) {
      return new Promise((resolve, reject) => setTimeout(resolve, ms));
    }
    async function test() {
      for (let i = 0; i < venias.length; i++) {
        await delay(300);
        descargar(venias[i]);
      }
    }
    test();
  };

  return (
    <div className="pt-6 mx-auto max-w-7xl">
      <ComplexSectionBloc>
        <HeaderSection
          title="Listado clientes"
          description={`A continuación se muestra un listado de todos los clientes que llevaba ${abogadoActual}, colegiado ${colegiadoActual}`}
          hasActions
        >
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
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Cliente
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Abogado anterior
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Colegiado anterior
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Abogado actual
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Colegiado actual
                        </th>
                        <th
                          scope="col"
                          className="text-right pr-10 py-3.5 text-sm font-semibold text-gray-900"
                        >
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {venias.map((venia, personIdx) => (
                        <tr
                          key={venia.email}
                          className={
                            personIdx % 2 === 0 ? undefined : "bg-gray-50"
                          }
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {venia.NombreApellidosCliente}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {abogadoActual}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {colegiadoActual}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {venia.AbogadoQueAsumeVenia}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {venia.Colegiado}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pr-4 text-right text-sm font-medium">
                            <button
                              onClick={() => descargar(venia)}
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

VeniasResultado.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default VeniasResultado;
