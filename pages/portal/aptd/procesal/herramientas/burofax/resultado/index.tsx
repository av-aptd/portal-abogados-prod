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
import useBurofaxStore from "store/procesal/burofaxStore";
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

const BurofaxResultado: NextPageWithLayout = () => {
  const burofaxes = useBurofaxStore((state) => state.burofaxes);
  const deleteAll = useBurofaxStore((state) => state.deleteAll);

  const descargar = async (burofax: any) => {
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
            <View>
              <Text style={tw("leading-5 text-[12px] text-gray-500 py-6")}>
                Expediente {burofax.Expediente}
              </Text>
              <View
                style={tw(
                  "leading-5 text-[12px] text-gray-500 text-right pb-6"
                )}
              >
                <Text>
                  A la atención de {burofax.CONTRARIO_Apellidos_Nombre}
                </Text>
                <Text>{burofax.CONTRARIO_Direccion}</Text>
                <Text>
                  {burofax.CONTRARIO_Codigo_Postal}
                  {burofax.CONTRARIO_e_Mail && ` ${burofax.CONTRARIO_e_Mail}`}
                </Text>
                <Text>{burofax.FechaCreacion}</Text>
              </View>
            </View>

            <View>
              <Text
                style={tw(
                  "leading-5 text-[12px] text-gray-500 text-justify pb-6"
                )}
              >
                CORMEUM GLOBAL SL con CIF B67209791 (en adelante ABOGADOS PARA
                TUS DEUDAS) en representación de Don {burofax.Cliente} , mayor
                de edad, con DNI/NIE/NIF {burofax.CLIENTE_Nif} y domicilio a
                efectos de notificaciones en Calle Rosselló 216, Planta 11 de
                Barcelona C.P. 08008.
              </Text>

              <Text style={tw("text-gray-800 font-semibold text-[14px] pb-6")}>
                ASUNTO:
              </Text>

              <Text
                style={tw(
                  "leading-5 text-[12px] text-gray-900 text-justify pb-6"
                )}
              >
                Reclamación de nulidad de cláusula por aplicación de interés
                usurario y/o declaración de abusividad.
              </Text>

              <Text
                style={tw(
                  "leading-5 text-[12px] text-gray-500 text-justify pb-6"
                )}
              >
                Muy Sres. Míos:
              </Text>

              <Text
                style={tw(
                  "leading-5 text-[12px] text-gray-500 text-justify pb-6"
                )}
              >
                Me dirijo a Uds. en cuanto entidad emisora y comercializadora de
                los productos financieros de crédito que mi representado
                contrató con ustedes.
              </Text>

              <Text
                style={tw(
                  "leading-5 text-[12px] text-gray-500 text-justify pb-6"
                )}
              >
                Considero que la contratación de dicho crédito adolece de vicios
                de nulidad, conforme a lo establecido en Código Civil y de
                acuerdo a la legislación especial aplicable. Vulnera mis
                derechos como consumidor y minorista por tratarse de un contrato
                de adhesión con condiciones generales no negociadas, y cláusulas
                abusivas que imponen la renuncia o limitación de derechos.
                También incumple los criterios del control de transparencia
                establecidos por Tribunal Supremo en diferentes sentencias, y
                además infringen lo dispuesto en la Ley de represión de la usura
                de 23 de Julio de 1908, ya que se aplican también intereses
                usurarios.
              </Text>

              <Text
                style={tw(
                  "leading-5 text-[12px] text-gray-500 text-justify pb-6"
                )}
              >
                El Tribunal Supremo se ha pronunciado al respecto estableciendo
                que basta para considerar usurario un préstamo/crédito, que se
                haya previsto o se prevea aplicar un tipo de interés
                notoriamente superior al normal del crédito y manifiestamente
                desproporcionado.
              </Text>

              <Text
                style={tw(
                  "leading-5 text-[12px] text-gray-500 text-justify pb-6"
                )}
              >
                Por ello, <Text style={tw("text-gray-900")}>les requiero</Text>{" "}
                para que desde la recepción de este escrito procedan a declarar
                <Text style={tw("text-gray-900")}>
                  nula la cláusula de intereses prevista en el contrato, con
                  devolución al reclamante de todos los intereses que se han
                  abonado de forma ilegal, mediante la herramienta de pagos
                  certificados de la abogacía española, que se enviará por parte
                  de este Despacho en función de su respuesta, junto con
                  documento de saldo y finiquito.
                </Text>
              </Text>

              <Text
                style={tw(
                  "leading-5 text-[12px] text-gray-500 text-justify pb-6"
                )}
              >
                Así mismo, les solicito toda la documental relativa al contrato
                referenciado que obre en su poder y que tengan obligación de
                conservar, en concreto, la que se especifica a continuación en
                aplicación del artículo 30.1 del Código Comercio:
              </Text>
            </View>

            <View>
              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-4")}>
                • Copia de los Contratos de Préstamo / crédito, y sus
                modificaciones.
              </Text>

              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-4")}>
                • Historial financiero o crediticio del cliente (totalidad de
                productos contratados con ustedes, número de contrato, etc).
              </Text>

              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-4")}>
                • Copia de los Recibos mensuales emitidos por la prestamista
                desde la firma del contrato hasta la actualidad.
              </Text>

              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-4")}>
                • Extracto de la cuenta del préstamo en el que se detalle:
              </Text>

              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-8")}>
                o Las utilizaciones y disposiciones de las tarjetas desde la
                firma del contrato hasta el día de hoy.
              </Text>

              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-8")}>
                o Las comisiones por disposición en efectivo realizadas desde el
                cajero desde la firma de los contratos hasta el día de hoy.
              </Text>

              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-8")}>
                o Las liquidaciones de intereses que se han girado desde la
                firma del contrato hasta el día de hoy, con detalle del tipo de
                interés aplicado.
              </Text>

              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-8")}>
                o Las primas de seguro satisfechas desde la firma del contrato
                hasta el día de hoy.
              </Text>

              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-8")}>
                o Las penalizaciones por mora satisfechas desde su firma hasta
                el día de hoy.
              </Text>

              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-8")}>
                o Las comisiones por reclamación de saldo deudor del contrato
                desde su firma hasta el día de hoy.
              </Text>

              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-8 pl-8")}>
                o Asimismo, se detalle un resumen donde conste el total de los
                conceptos mencionados en los puntos anteriores desde la firma
                del contrato hasta el día de hoy.
              </Text>
            </View>
            <View>
              <Text
                style={tw(
                  "leading-5 text-[12px] text-gray-500 text-justify pb-6"
                )}
              >
                Esta documentación me puede ser enviada al correo electrónico
                legal@abogadosparatusdeudas.es.
              </Text>
              <Text
                style={tw(
                  "leading-5 text-[12px] text-gray-800 text-justify pb-6"
                )}
              >
                Si transcurrido el plazo de 15 días desde la fecha de
                presentación de esta reclamación, no he recibido respuesta
                positiva, se considerará cumplido el trámite de tener por
                intentada reclamación previa a la vía judicial.
              </Text>
              <Text
                style={tw(
                  "leading-5 text-[12px] text-gray-500 text-justify pb-6"
                )}
              >
                Documentación que se adjunta:
              </Text>
              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-4")}>
                • Autorización para la representación y defensa de DON/DÑA{" "}
                {burofax.Cliente} como Documento Número Uno.
              </Text>
              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-4 pl-4")}>
                • DNI de DON {burofax.Cliente}
              </Text>
              <Text style={tw("text-gray-900 leading-5 text-[12px] pb-8 pl-4")}>
                • CARNET COLEGIADO DE Sandra Gustems Lou (colegiada ICABarcelona
                37961).
              </Text>{" "}
              Atentamente,
            </View>

            <View
              style={tw(
                "leading-5 text-[12px] text-gray-500 text-justify pb-6"
              )}
            >
              <Text>Fdo. Sandra Gustems Lou</Text>
              <Text>Abogado Col. ICAB 37961</Text>
            </View>
          </View>
        </Page>
      </Document>
    ).toBlob();

    if (burofax.CLIENTE_Nif != "") {
      saveAs(
        blob,
        `${burofax.CLIENTE_Nif + "-" + slugify(burofax.Cliente)}.pdf`
      );
    }
  };

  const downloadAll = async () => {
    function delay(ms: any) {
      return new Promise((resolve, reject) => setTimeout(resolve, ms));
    }
    async function test() {
      for (let i = 0; i < burofaxes.length; i++) {
        await delay(300);
        descargar(burofaxes[i]);
      }
    }
    test();
  };

  return (
    <div className="pt-6 mx-auto max-w-7xl">
      <ComplexSectionBloc>
        <HeaderSection title="Listado burofax" hasActions>
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

                        <th
                          scope="col"
                          className="pr-10 py-3.5 text-right text-sm font-semibold text-gray-900"
                        >
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {burofaxes.map((burofax, personIdx) => (
                        <tr
                          key={personIdx}
                          className={
                            personIdx % 2 === 0 ? undefined : "bg-gray-50"
                          }
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {burofax.CLIENTE_Nif}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {burofax.Cliente}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {burofax.CONTRARIO_Apellidos_Nombre}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {burofax.FechaCreacion}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pr-4 text-right text-sm font-medium">
                            <button
                              onClick={() => descargar(burofax)}
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

BurofaxResultado.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default BurofaxResultado;
