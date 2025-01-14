import { Page, Text, View, Document, Image, pdf } from "@react-pdf/renderer";
import { propertiesMap } from "shared/dictionaries/propertyDict";
import { formatDate, getPropertyValueMap } from "shared/helpers";

import createTw from "react-pdf-tailwind";

const TrabajadoresRendered = async (client: any, clientData: any) => {
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
          LISTADO DE TRABAJADORES DE {client.name + " " + client.surname}
        </Text>
        {/* <Text style={tw("pb-6 text-center")}>
          En base al artículo 7. 2º del Texto Refundido de la Ley Concursal, se
          acompaña junto con la solicitud de declaración de concurso de D./Dña.{" "}
          {client.name + " " + client.surname} con DNI/NIE {clientData.dni}{" "}
          inventario de los bienes y derechos que integran su patrimonio.
        </Text> */}

        <View
          style={tw(
            "flex flex-row justify-between bg-custom text-white p-2 text-xs"
          )}
        >
          <View style={tw("w-20")}>
            <Text>Nombre</Text>
          </View>
          <View style={tw("w-28")}>
            <Text>Apellido</Text>
          </View>
          <View style={tw("flex-1")}>
            <Text>Email</Text>
          </View>
          <View style={tw("w-24")}>
            <Text>Teléfono</Text>
          </View>
          <View style={tw("w-20 text-right")}>
            <Text>Salario</Text>
          </View>
        </View>
        {clientData.trabajadores.map((p: any, index: any) => (
          <View
            key={index}
            style={tw(
              "flex flex-row justify-between bg-gray-50 text-gray-500 p-2 text-xs items-center"
            )}
          >
            <Text style={tw("w-20")}>
              {p.find((p: any) => p.propertyKey == "name").propertyValue}
            </Text>
            <Text style={tw("w-28")}>
              {p.find((p: any) => p.propertyKey == "surname").propertyValue}
            </Text>
            <Text style={tw("flex-1")}>
              {p.find((p: any) => p.propertyKey == "email").propertyValue}
            </Text>
            <Text style={tw("w-24")}>
              {" "}
              {p.find((p: any) => p.propertyKey == "phone").propertyValue}
            </Text>
            <Text style={tw("w-20 text-right")}>
              {Number(
                p.find((p: any) => p.propertyKey == "salary").propertyValue
              ).toLocaleString("es-AR")}{" "}
              €
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  ).toBlob();

  return blob;
};

export default TrabajadoresRendered;
