import { Page, Text, View, Document, Image, pdf } from "@react-pdf/renderer";
import { propertiesMap } from "shared/dictionaries/propertyDict";
import { formatDate, getPropertyValueMap } from "shared/helpers";

import createTw from "react-pdf-tailwind";
import TipoInsolvencia from "components/portal/info/10-tipo-insolvencia";

const MemoriaRendered = async ({
  fecha,
  client,
  clientData,
  context,
  context2,
  context3,
  aptdInfo,
  abogado,
  procurador,
  tipoEpi,
}: any) => {
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

  const textContext = (context: string) => {
    if (context.includes("<br>")) {
      const contextArray = context.split("<br>");
      return contextArray.map((sentence: string, index: number) => {
        return (
          <Text key={index} style={tw("pb-6")}>
            {sentence.replace(/<p[^>]*>/g, "").replace(/<\/p>/g, "")}
          </Text>
        );
      });
    } else {
      return (
        <Text style={tw("pb-6")}>
          {context.replace(/<p[^>]*>/g, "").replace(/<\/p>/g, "")}
        </Text>
      );
    }
  };

  const Epis = [
    {
      id: 1,
      value: "ima",
      name: "Insuficiencia de Masa Activa",
      content: `Nos encontramos con unos activos claramente insuficientes para hacer frente a las deudas, incluidos los créditos contra la masa, por lo que esta parte propone conforme al artículo 37 bis y ter del Texto Refundido de la Ley Concursal (en adelante, TRLC) en relación con el artículo 486 2º del mismo texto normativo, se acuerde la declaración de concurso con insuficiencia de la masa activa, pues no consideramos previsible el ejercicio de acción de reintegración, de impugnación o de responsabilidad de terceros concediéndose el derecho de exoneración del pasivo insatisfecho por ser deudor de buena fe y cumplir con los requisitos exigidos en los artículos 487 y siguientes del TRLC. En Barcelona, a 7 de octubre de 2024.
`,
    },
    {
      id: 2,
      value: "plan-pagos",
      name: "Plan de Pagos",
      content: `Nos encontramos ante una solicitud de plan de pagos para hacer frente de forma fraccionada a las deudas exonerables, todo ello con el ánimo de salvaguardar los bienes de mi mandante. Este plan de pagos se acompaña a la presente demanda y será reiterado junto a la solicitud de exoneración en el momento procesal oportuno. Es por ello que esta parte solicita se nombre Administrador Concursal sin que se abra la fase de liquidación en la declaración del concurso para poder presentar en tiempo y forma la solicitud de exoneración mediante plan de pagos.`,
    },
    {
      id: 3,
      value: "liquidacion",
      name: "Liquidación",
      content: `Nos encontramos en una situación de insolvencia pero con activos liquidables, es por ello que esta parte solicita se aperture el concurso ordinario nombrando Administrador Concursal para realizar la liquidación correspondiente.`,
    },
  ];

  // const isSituation = (value: string) => {
  //   return aptdInfo.situacionDeudor.includes(value);
  // };

  // const nameSituacion = (value: string) => {
  //   let name = "";
  //   switch (value) {
  //     case "sobreendeudamiento":
  //       name = "Sobreendeudamiento";
  //       break;
  //     case "estafa":
  //       name = "Estafa";
  //       break;
  //     case "desempleo":
  //       name = "Desempleo";
  //       break;
  //     case "divorcio":
  //       name = "Divorcio/Separación/Nulidad";
  //       break;
  //     case "perdidas":
  //       name = "Pérdidas empresariales o profesionales";
  //       break;
  //     case "incapacidad":
  //       name = "Incapacidad temporal laboral";
  //       break;
  //     case "familiares":
  //       name = "Familiares enfermos";
  //       break;
  //     case "aumento-gastos":
  //       name = "Aumento de los gastos de explotación";
  //       break;
  //     case "disminucion-ventas":
  //       name = "Disminución de las ventas";
  //       break;
  //     case "aumento-costes":
  //       name = "Aumento de los costes financieros";
  //       break;
  //     case "prestamos-acreedores":
  //       name = "Préstamos de otros acreedores";
  //       break;
  //     case "abusividad-contenida":
  //       name =
  //         "Abusividad contenida en los préstamos al consumo y créditos solicitados";
  //       break;
  //     case "covid":
  //       name = "Covid";
  //       break;
  //     case "negocios":
  //       name = "Negocios";
  //       break;
  //   }
  //   return name;
  // };

  const blob = await pdf(
    <Document>
      <Page
        size="A4"
        style={tw("p-12 leading-7 text-[12px] text-gray-500 text-justify")}
      >
        <View style={tw("flex justify-start")}>
          <Image
            src="./../../../../../../Logo-aptd.png"
            style={tw("h-14 w-40 object-contain")}
          />
        </View>
        <Text
          style={tw(
            "font-semibold text-[14px] leading-5 text-gray-800 text-center pt-6"
          )}
        >
          MEMORIA EXPRESIVA DE LA HISTORIA ECONÓMICA Y JURÍDICA{" "}
        </Text>
        <Text
          style={tw(
            "font-semibold text-[14px] leading-5 text-gray-800 text-center pt-2 pb-6"
          )}
        >
          {aptdInfo.sexo == "hombre" ? "DON" : "DOÑA"}{" "}
          {client.name + " " + client.surname}
        </Text>
        <Text
          style={tw(
            "font-semibold text-[14px] leading-5 text-gray-800 text-center pb-12"
          )}
        >
          ART. 7..1º TRLC. -{" "}
          {clientData.tipoPersona == "persona" ? "PERSONA FÍSICA" : "AUTÓNOMO"}
        </Text>

        {/* 1. Consideración Previa. */}
        <Text style={tw("pb-2 font-bold text-gray-800 text-[14px]")}>
          1. Consideración Previa.
        </Text>
        <Text style={tw("pb-6")}>
          El presente documento ha sido preparado exclusivamente para que surta
          los efectos previstos en la Real Decreto Legislativo, 1/2020, de 5 de
          mayo de 2020 por el que se aprueba el Texto Refundido de la Ley
          Concursal, modificado por la Ley 16/2022, de 5 de septiembre, en el
          procedimiento de concurso voluntario instado por esta representación
          procesal, que debe tramitarse ante los Juzgados de lo Mercantil de la
          Provincia del deudor, por lo que no debe utilizarse para ninguna otra
          finalidad, ni ser distribuido a “terceros”, entendiendo como tales, a
          personas distintas de aquéllas que sean parte de este procedimiento.
        </Text>
        <Text style={tw("pb-6")}>
          Asimismo, la información utilizada para confeccionar este informe ha
          sido la obtenida por esta representación hasta la fecha de su emisión,
          sin detrimento de que pudiese surgir con posterioridad información
          relevante que aclarase, modificase o alterase ciertos puntos tratados
          y analizados en los apartados subsiguientes.
        </Text>

        {/* 2. Consideraciones generales. */}
        <Text style={tw("pb-2 font-bold text-gray-800 text-[14px]")}>
          2. Consideraciones generales.
        </Text>
        <Text style={tw("pb-6")}>
          Mediante formulario normalizado, la procuradora de los Tribunales{" "}
          {procurador.name} {procurador.surname}, en nombre y representación de{" "}
          {aptdInfo.sexo == "hombre" ? "Don" : "Doña"}{" "}
          {client.name + " " + client.surname} y bajo la dirección letrada de{" "}
          {abogado.name} {abogado.surname}, quien presta sus servicios para el
          Despacho Abogados Para tus Deudas (CORMEUM GLOBAL, S.L.) presenta ante
          el Juzgado de lo Mercantil de {clientData.provincia}, solicitud de
          concurso voluntario. A dicha solicitud debe acompañarse el presente
          documento, donde se ponen de manifiesto los hechos relevantes de los
          legalmente tasados, de la insolvencia {clientData.tipoInsolvencia}{" "}
          {aptdInfo.sexo == "hombre" ? "Don" : "Doña"}{" "}
          {client.name + " " + client.surname} aportando la documental
          correspondiente en la que basa su derecho conforme a lo establecido en
          los artículos 6 y 7 de la Ley Concursal.
        </Text>
        <Text style={tw("pb-6")}>
          Para el supuesto que el Juzgado observe algún defecto u omisión en la
          presente solicitud se solicita, al amparo del artículo 231 de la Ley
          de Enjuiciamiento Civil, que se conceda a esta parte un plazo para
          subsanarlo.
        </Text>
      </Page>
      {/* 3. Historia Económica y Causas de la Situación Actual. */}
      {/* <Page
        size="A4"
        style={tw("p-12 leading-7 text-[12px] text-gray-500 text-justify")}
      >
        <Text style={tw("pb-2 font-bold text-gray-800 text-[14px]")}>
          2. Historia Económica y Causas de la Situación Actual.
        </Text>
        <Text style={tw("pb-6")}>
          El presente documento ha sido preparado exclusivamente para que surta
          los efectos previstos en la Real Decreto Legislativo, 1/2020, de 5 de
          mayo de 2020 por el que se aprueba el Texto Refundido de la Ley
          Concursal, modificado por la Ley 16/2022, de 5 de septiembre, en el
          procedimiento de concurso voluntario instado por esta representación
          procesal, que debe tramitarse ante los Juzgados de lo Mercantil de la
          Provincia del Deudor, por lo que no debe utilizarse para ninguna otra
          finalidad, ni ser distribuido a “terceros”, entendiendo como tales, a
          personas distintas de aquéllas que sean parte de este procedimiento.
        </Text>
        <Text style={tw("pb-6")}>
          Es ánimo de esta representación subsanar cuantas deficiencias se
          incurran en el presente documento, así como en la demanda o a lo largo
          del procedimiento.
        </Text>
        <Text style={tw("pb-6")}>
          {aptdInfo.sexo == "hombre" ? "DON" : "DOÑA"}{" "}
          {client.name + " " + client.surname}, es empleado por TIPO DE
          ACTIVIDAD con la mercantil NOMBRE EMPRESA.
        </Text>

        {textContext(context)}
      </Page> */}
      {/* 3. Historia jurídica y económica del deudor. Motivo de la insolvencia. */}
      <Page
        size="A4"
        style={tw("p-12 leading-7 text-[12px] text-gray-500 text-justify")}
      >
        <Text style={tw("pb-2 font-bold text-gray-800 text-[14px]")}>
          3. Historia jurídica y económica del deudor. Motivo de la insolvencia.
        </Text>
        <Text style={tw("pb-2 font-bold text-gray-800 text-[14px]")}>
          3.1. Historia jurídica y económica del deudor
        </Text>
        <Text style={tw("pb-6")}>
          {aptdInfo.sexo == "hombre" ? "DON" : "DOÑA"}{" "}
          {client.name + " " + client.surname}, nacido/a en{" "}
          {clientData.lugarNacimiento}, el día{" "}
          {formatDate(clientData.fechaNacimiento, "medium", "es")},{" "}
          {clientData.estadoCivil}, {clientData.estadoLaboral}, de nacionalidad{" "}
          {clientData.nacionalidad}, con domicilio en {clientData.ciudad},{" "}
          {clientData.direccion}; con DNI/NIF, según se acredita, número{" "}
          {clientData.dni}.
        </Text>
        {clientData.estadoCivil == "casado" && (
          <Text style={tw("pb-6")}>
            {aptdInfo.sexo == "hombre" ? "DON" : "DOÑA"}{" "}
            {client.name + " " + client.surname}, casado con D/Dña.{" "}
            {clientData.datosConyuge.find((p: any) => p.propertyKey == "name")
              .propertyValue +
              " " +
              clientData.datosConyuge.find(
                (p: any) => p.propertyKey == "surname"
              ).propertyValue}{" "}
            con DNI/NIE{" "}
            {
              clientData.datosConyuge.find((p: any) => p.propertyKey == "dni")
                .propertyValue
            }{" "}
            el pasado {formatDate(clientData.fechaMatrimonio, "medium", "es")}{" "}
            en régimen de{" "}
            {getPropertyValueMap(clientData.regimenEconomico).toLowerCase()}.
          </Text>
        )}
        {clientData.estadoCivil == "pareja" && (
          <Text style={tw("pb-6")}>
            {aptdInfo.sexo == "hombre" ? "DON" : "DOÑA"}{" "}
            {client.name + " " + client.surname}, casado con D/Dña.{" "}
            {clientData.datosPareja.find((p: any) => p.propertyKey == "name")
              .propertyValue +
              " " +
              clientData.datosPareja.find(
                (p: any) => p.propertyKey == "surname"
              ).propertyValue}{" "}
            con DNI/NIE{" "}
            {
              clientData.datosPareja.find((p: any) => p.propertyKey == "dni")
                .propertyValue
            }{" "}
          </Text>
        )}
        {clientData.dependenPersonas == "1omas" && (
          <>
            <Text style={tw("pb-4")}>
              Asimismo, {aptdInfo.sexo == "hombre" ? "DON" : "DOÑA"}{" "}
              {client.name + " " + client.surname}, tiene la siguiente
              descendencia / está a cargo de los siguientes ascendientes:
            </Text>
            {clientData.personasDependientes.map((p: any, index: any) => (
              <Text style={tw("pb-0")} key={p.propertyKey + index}>
                {p.find((p: any) => p.propertyKey == "name").propertyValue}{" "}
                {p.find((p: any) => p.propertyKey == "surname").propertyValue}{" "}
                {p.find((p: any) => p.propertyKey == "age").propertyValue} años
              </Text>
            ))}
          </>
        )}
        {clientData.tipoPersona == "persona" && (
          <>
            <Text style={tw("pb-6")}>
              {aptdInfo.sexo == "hombre" ? "DON" : "DOÑA"}{" "}
              {client.name + " " + client.surname} es{" "}
              {clientData.tipoIngresos == "nomina"
                ? "empleado"
                : clientData.tipoIngresos == "pension"
                ? "pensionista"
                : "desempleado"}
              , percibiendo una remuneración aproximada de {clientData.ingresos}{" "}
              euros. Su profesión es la de {clientData.estadoLaboral}.
            </Text>
          </>
        )}
        {clientData.tipoPersona == "autonomo" && (
          <>
            <Text style={tw("py-6")}>
              {aptdInfo.sexo == "hombre" ? "DON" : "DOÑA"}{" "}
              {client.name + " " + client.surname} desempeña actividad
              profesional económica propia (autónomo). Percibe en la actualidad
              unos ingresos por importe de {clientData.ingresos} euros al mes,
              de los que deben detraerse el pago de la cuota de autónomos, así
              como otros necesarios para la llevanza de su actividad
              profesional.
            </Text>
            {/* <Text style={tw("pb-6")}>
              Ello le otorga una liquidez de{" "}
              {clientData.ingresos - clientData.gastos} euros al mes (s.e.u.o),
              de los que sus costes para la vida son según se indica a
              continuación {clientData.gastos} euros.
            </Text> */}
          </>
        )}
        <Text style={tw("pb-6")}>
          En la actualidad, mantiene su vivienda habitual en régimen de{" "}
          {
            clientData.datosVivienda.find(
              (p: any) => p.propertyKey == "tipoVivienda"
            ).propertyValue
          }
          , abonando la cantidad de{" "}
          {
            clientData.datosVivienda.find(
              (p: any) => p.propertyKey == "costeVivienda"
            ).propertyValue
          }{" "}
          euros al mes.
        </Text>
        <Text style={tw("pb-6")}>
          Su cónyuge/pareja de hecho/ hijos, conviven con el mismo
          contribuyendo/sin contribuir al sostenimiento de las cargas de la
          unidad familiar.
        </Text>
        <Text style={tw("pb-6")}>
          Los gastos aproximados en comida y suministros ascienden a{" "}
          {clientData.gastos} euros, sin contabilizar las cuotas de los créditos
          que venía abonando, por lo que claramente se halla en una situación de
          insolvencia.
        </Text>
        {textContext(context)}
      </Page>
      {/* 4. Actividades durante los 3 últimos años.  */}
      <Page
        size="A4"
        style={tw("p-12 leading-7 text-[12px] text-gray-500 text-justify")}
      >
        <Text style={tw("pb-2 font-bold text-gray-800 text-[14px]")}>
          4. Actividades durante los 3 últimos años.
        </Text>
        <Text style={tw("pb-6")}>
          {aptdInfo.sexo == "hombre" ? "DON" : "DOÑA"}{" "}
          {client.name + " " + client.surname} es empleado y percibe una
          remuneración aproximadamente de unos {clientData.ingresos} euros.
          Estos son sus únicos ingresos, con los que intenta sostener la
          situación de endeudamiento en la que se ha visto inmerso.
        </Text>
        {textContext(context2)}
        <Text style={tw("pb-6")}>
          Se aporta junto con la solicitud de concurso el informe de vida
          laboral de mi representado en el que se puede comprobar las
          actividades realizadas por éste en los últimos tres años, así como
          documentos acreditativos de los ingresos actuales.
        </Text>
      </Page>
      {/* 5. Valoraciones y propuestas sobre la viabilidad patrimonial. */}
      <Page
        size="A4"
        style={tw("p-12 leading-7 text-[12px] text-gray-500 text-justify")}
      >
        <Text style={tw("pb-2 font-bold text-gray-800 text-[14px]")}>
          5. Causas del estado en que se encuentra el deudor.
        </Text>
        <Text style={tw("pb-6")}>
          Tal y como se ha indicado en la historia económica las causas que han
          llevado a mi mandante a esta situación son las siguientes:
        </Text>
        {textContext(context3)}
      </Page>
      {/* 6.- Valoraciones y propuestas sobre la viabilidad patrimonial. */}
      <Page
        size="A4"
        style={tw("p-12 leading-7 text-[12px] text-gray-500 text-justify")}
      >
        <Text style={tw("pb-2 font-bold text-gray-800 text-[14px]")}>
          6. Valoraciones y propuestas sobre la viabilidad patrimonial.
        </Text>
        <Text style={tw("pb-6")}>
          {Epis.find((epi) => epi.value === tipoEpi)?.content}
        </Text>
        <Text style={tw("pb-6")}>
          En {clientData.provincia}, a {formatDate(fecha, "medium", "es")}.
        </Text>
        <Text style={tw("pb-0")}>
          Fdo. {abogado.name} {abogado.surname}
        </Text>
        <Text style={tw("pb-6")}>
          Colegiado {abogado.collegiatenumber} en {abogado.lawSchool}
        </Text>
      </Page>
    </Document>
  ).toBlob();

  return blob;
};

export default MemoriaRendered;
