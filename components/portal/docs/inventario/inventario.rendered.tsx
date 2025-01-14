import { Page, Text, View, Document, Image, pdf } from "@react-pdf/renderer";
import { propertiesMap } from "shared/dictionaries/propertyDict";
import { formatDate, getPropertyValueMap } from "shared/helpers";

import createTw from "react-pdf-tailwind";

const InventarioRendered = async (
  client: any,
  clientData: any,
  totalAmountBank: any,
  totalAmountVA: any,
  totalAmountVM: any
) => {
  const tw = createTw({
    theme: {
      fontFamily: {
        sans: ["Inter"],
      },
      extend: {
        colors: {
          custom: "#1AABE3",
        },
      },
    },
  });

  const ingresosName = (tipo: string) => {
    let name = "";
    switch (tipo) {
      case "nomina":
        name = "Nómina";
        break;
      case "pension":
        name = "Pensión";
        break;
      case "rentas":
        name = "Rentas";
        break;
      case "ayudas":
        name = "Ayudas";
        break;
    }
    return name;
  };

  const getPropertyValue = (propertyKey: string, json: string): string => {
    return JSON.parse(json)[propertyKey];
  };

  const blob = await pdf(
    <Document>
      <Page
        size="A4"
        style={tw("px-16 py-8 leading-7 text-[12px] text-gray-500")}
      >
        <View style={tw("flex justify-start")}>
          <Image
            src="./../../../../Logo-aptd.png"
            style={tw("h-14 w-40 object-contain")}
          />
        </View>

        <Text
          style={tw(
            "font-semibold text-[14px] leading-5 text-gray-800 text-center pb-12 pt-6 uppercase"
          )}
        >
          INVENTARIO DE BIENES Y DERECHOS DE{" "}
          {client.name + " " + client.surname}
        </Text>
        <Text style={tw("pb-6 text-center")}>
          En base al artículo 7. 2º del Texto Refundido de la Ley Concursal, se
          acompaña junto con la solicitud de declaración de concurso de D./Dña.{" "}
          {client.name + " " + client.surname} con DNI/NIE {clientData.dni}{" "}
          inventario de los bienes y derechos que integran su patrimonio.
        </Text>

        <View
          style={tw(
            "flex flex-row justify-between bg-custom text-white p-2 text-xs mt-8"
          )}
        >
          <View style={tw("w-20")}>
            <Text>Naturaleza</Text>
          </View>
          <View style={tw("flex-1")}>
            <Text>Descripción</Text>
          </View>
          <View>
            <Text>Importe</Text>
          </View>
        </View>

        <View
          style={tw(
            "flex flex-row justify-between bg-gray-50 text-gray-500 p-2 text-xs"
          )}
        >
          <Text style={tw("w-20")}>
            {ingresosName(clientData.ingresos.tipo)}
          </Text>
          <View style={tw("flex-1")}>
            <Text>
              Ingresos mensuales de {ingresosName(clientData.ingresos.tipo)}
            </Text>
          </View>

          <Text style={tw("pb-0")}>
            {Number(clientData.ingresos.cantidad).toLocaleString("es-AR")} €
          </Text>
        </View>

        {clientData.activos.length > 0 && (
          <>
            <View
              style={tw(
                "flex flex-row justify-between bg-custom text-white p-2 text-xs"
              )}
            >
              <View style={tw("w-20")}>
                <Text>Naturaleza</Text>
              </View>
              <View style={tw("flex-1")}>
                <Text>Descripción</Text>
              </View>
              <View style={tw("w-28 text-right")}>
                <Text>Valor adquisición</Text>
              </View>
              <View style={tw("w-24 text-right")}>
                <Text>Valor mercado</Text>
              </View>
              <View style={tw("w-20 text-right")}>
                <Text>Cargas</Text>
              </View>
            </View>
            {clientData.activos.map((p: any, index: any) => (
              <View
                key={p.propertyKey + index}
                style={tw(
                  "flex flex-row justify-between bg-gray-50 text-gray-500 p-2 text-xs items-center"
                )}
              >
                <Text style={tw("w-24")}>
                  {getPropertyValueMap(
                    getPropertyValue("naturaleza", p[0].propertyValue),
                    "naturaleza"
                  )}
                </Text>

                {getPropertyValueMap(
                  getPropertyValue("naturaleza", p[0].propertyValue),
                  "naturaleza"
                ) == "Bien Inmueble" ? (
                  <Text style={tw("flex-1 leading-6")}>
                    {getPropertyValueMap(
                      getPropertyValue("tipoInmueble", p[0].propertyValue),
                      "tipoInmueble"
                    )}{" "}
                    en{" "}
                    {getPropertyValueMap(
                      getPropertyValue("provincia", p[0].propertyValue),
                      "provincia"
                    )}{" "}
                    inscrita en el Registro de la Propiedad nº{" "}
                    {getPropertyValueMap(
                      getPropertyValue("numInscripcion", p[0].propertyValue),
                      "numInscripcion"
                    )}{" "}
                    de{" "}
                    {getPropertyValueMap(
                      getPropertyValue("provincia", p[0].propertyValue),
                      "provincia"
                    )}{" "}
                    , libro{" "}
                    {getPropertyValueMap(
                      getPropertyValue("numLibro", p[0].propertyValue),
                      "numLibro"
                    )}
                    , folio{" "}
                    {getPropertyValueMap(
                      getPropertyValue("folio", p[0].propertyValue),
                      "folio"
                    )}
                    , tomo{" "}
                    {getPropertyValueMap(
                      getPropertyValue("tomo", p[0].propertyValue),
                      "tomo"
                    )}{" "}
                    y nº de finca{" "}
                    {getPropertyValueMap(
                      getPropertyValue("numFinca", p[0].propertyValue),
                      "numFinca"
                    )}
                  </Text>
                ) : (
                  <Text>
                    {getPropertyValueMap(
                      getPropertyValue("name", p[0].propertyValue),
                      "name"
                    )}
                    ,{" "}
                    {getPropertyValueMap(
                      getPropertyValue("brandVehicle", p[0].propertyValue),
                      "brandVehicle"
                    )}
                    ,
                    {getPropertyValueMap(
                      getPropertyValue("modelVehicle", p[0].propertyValue),
                      "modelVehicle"
                    )}{" "}
                    con matrícula{" "}
                    {getPropertyValueMap(
                      getPropertyValue("licensePlate", p[0].propertyValue),
                      "licensePlate"
                    )}
                  </Text>
                )}

                {getPropertyValueMap(
                  getPropertyValue("naturaleza", p[0].propertyValue),
                  "naturaleza"
                ) == "Bien Inmueble" ? (
                  <Text style={tw("w-28 text-right")}>
                    {Number(
                      getPropertyValueMap(
                        getPropertyValue("valorCatastral", p[0].propertyValue),
                        "valorCatastral"
                      )
                    ).toLocaleString("es-AR")}
                    €
                  </Text>
                ) : (
                  <Text style={tw("w-28 text-right")}>
                    {Number(
                      getPropertyValueMap(
                        getPropertyValue(
                          "valorAdquisicion",
                          p[0].propertyValue
                        ),
                        "valorAdquisicion"
                      )
                    ).toLocaleString("es-AR")}
                    €
                  </Text>
                )}

                <Text style={tw("w-24 text-right")}>
                  {Number(
                    getPropertyValueMap(
                      getPropertyValue("valorMercado", p[0].propertyValue),
                      "valorMercado"
                    )
                  ).toLocaleString("es-AR")}
                  €
                </Text>
                <Text style={tw("w-20 text-right")}>no</Text>
              </View>
            ))}

            <View
              style={tw(
                "flex flex-row justify-between bg-[#ccc] text-white p-2 text-xs text-gray-700"
              )}
            >
              <View style={tw("w-24")}>
                <Text>TOTAL</Text>
              </View>
              <View style={tw("flex-1")}>
                <Text></Text>
              </View>
              <View style={tw("w-28 text-right")}>
                <Text> {totalAmountVA.toLocaleString("es")} €</Text>
              </View>
              <View style={tw("w-24 text-right")}>
                <Text> {totalAmountVM.toLocaleString("es")} €</Text>
              </View>
              <View style={tw("w-20 text-right")}>
                <Text></Text>
              </View>
            </View>
          </>
        )}

        {clientData.cuentas.length > 0 && (
          <>
            <View
              style={tw(
                "flex flex-row justify-between bg-custom text-white p-2 text-xs mt-8"
              )}
            >
              <View style={tw("w-20")}>
                <Text>Naturaleza</Text>
              </View>
              <View style={tw("w-32")}>
                <Text>Descripción</Text>
              </View>
              <View style={tw("w-32")}>
                <Text>Entidad</Text>
              </View>
              <View style={tw("flex-1")}>
                <Text>Número de cuenta</Text>
              </View>
              <View>
                <Text>Saldo</Text>
              </View>
            </View>
            {clientData.cuentas.map((p: any, index: any) => (
              <View
                key={p.propertyKey + index}
                style={tw(
                  "flex flex-row justify-between bg-gray-50 text-gray-500 p-2 text-xs"
                )}
              >
                <Text style={tw("w-20")}>Tesorería</Text>
                <Text style={tw("w-32")}>Cuenta bancaria</Text>
                <Text style={tw("w-32")}>
                  {p.find((p: any) => p.propertyKey == "name").propertyValue}{" "}
                </Text>
                <Text style={tw("flex-1")}>
                  {p.find((p: any) => p.propertyKey == "iban").propertyValue}{" "}
                </Text>
                <Text style={tw("pb-0")}>
                  {p.find((p: any) => p.propertyKey == "balance").propertyValue}{" "}
                  €
                </Text>
              </View>
            ))}
            <View
              style={tw(
                "flex flex-row justify-between bg-[#ccc] py-2 px-2.5 text-xs text-gray-700"
              )}
            >
              <Text>TOTAL</Text>
              <Text>{Number(totalAmountBank).toLocaleString("es-AR")}€</Text>
            </View>
          </>
        )}

        <View
          style={tw(
            "flex flex-row justify-between bg-[#999] text-white p-2 text-xs mt-8"
          )}
        >
          <Text>TOTAL INVENTARIO DE BIENES Y DERECHOS</Text>
          <Text>
            {(
              Number(totalAmountVM) +
              Number(totalAmountBank) +
              Number(clientData.ingresos.cantidad)
            ).toLocaleString("es-AR")}
            €
          </Text>
        </View>
      </Page>
    </Document>
  ).toBlob();

  return blob;
};

export default InventarioRendered;
