import React, { Children, useEffect, useState } from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../../../../_app";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import { usePortalStore } from "store/portal";

import { useRouter } from "next/router";
import MemoriaRendered from "components/portal/docs/memoria/memoria.rendered";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import ClientInfoQuestions from "components/portal/info";
import { processesByUserId, setStatusDocument } from "apis/processes";
import { getDocumentsType, uploadGeneratedDocument } from "apis/docs";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
  Document,
  Paragraph,
  Packer,
  AlignmentType,
  SectionType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TextRun,
} from "docx";

import useLawyers from "hooks/procesal/useLawyers";
import useMemoria from "hooks/procesal/useMemoria";
import PortalHeader from "components/portal/layout/header";
import { formatDate, getPropertyValueMap } from "shared/helpers";

const Memoria: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);

  const client = usePortalStore((state) => state.client);
  const clientInfo = usePortalStore((state) => state.clientInfo);
  const router = useRouter();
  const [actividad3anos, setActividad3anos] = useState("");
  const [situacionDeudorExplicacion, setSituacionDeudorExplicacion] =
    useState("");
  const [situationArray, setSituationArray] = useState<any[]>([]);

  const {
    tipoPersona,
    provincia,
    ciudad,
    direccion,
    lugarNacimiento,
    fechaNacimiento,
    nacionalidad,
    estadoCivil,
    estadoLaboral,
    tipoIngresos,
    ingresos,
    gastos,
    tipoInsolvencia,
    datosVivienda,
    datosConyuge,
    datosPareja,
    fechaMatrimonio,
    regimenEconomico,
    dependenPersonas,
    personasDependientes,
    options,
  } = useMemoria(clientInfo);

  const lawyers = useLawyers(profile.token);

  const clientData: any = {
    tipoPersona,
    provincia,
    estadoCivil,
    estadoLaboral,
    lugarNacimiento,
    fechaNacimiento,
    nacionalidad,
    dni: client.dni,
    ciudad,
    direccion,
    tipoIngresos,
    ingresos,
    gastos,
    tipoInsolvencia,
    datosConyuge,
    datosPareja,
    fechaMatrimonio,
    regimenEconomico,
    dependenPersonas,
    datosVivienda,
    personasDependientes,
  };

  console.log(clientData);

  const { register, handleSubmit, watch } = useForm();
  const situation = watch("situacionDeudor");
  let table: any = [];

  const getSituationName = (value: string) => {
    switch (value) {
      case "sobreendeudamiento":
        return "Sobreendeudamiento";
      case "estafa":
        return "Estafa";
      case "desempleo":
        return "Desempleo";
      case "divorcio":
        return "Divorcio/Separación/Nulidad";
      case "perdidas":
        return "Pérdidas empresariales o profesionales";
      case "incapacidad":
        return "Incapacidad temporal laboral";
      case "familiares":
        return "Familiares enfermos";
      case "aumento-gastos":
        return "Aumento de los gastos de explotación";
      case "disminucion-ventas":
        return "Disminución de las ventas";
      case "aumento-costes":
        return "Aumento de los costes financieros";
      case "prestamos-acreedores":
        return "Préstamos de otros acreedores";
      case "abusividad-contenida":
        return "Abusividad contenida en los préstamos al consumo y créditos solicitados";
      case "covid":
        return "Covid";
      case "negocios":
        return "Negocios";
    }
  };

  const situations = [
    {
      id: 1,
      value: "sobreendeudamiento",
      content: `<p>${client.name} se vió abocado a solicitar financiaciones para cubrir financiaciones anteriores ante la imposibilidad de hacer frente a todas las cuotas mensuales. Uno de los principales motivos ha sido el devengo de comisiones e intereses, los cuáles convertían las deudas en interminables e inasumibles. De esta forma, ${client.name} en aras de cumplir con sus obligaciones crediticias solicitó auxilio financiero a otras entidades para ajustar las nuevas cuotas a su capacidad económica, hecho que no se ha dado por las repercusiones desconocidas de las cláusulas y prácticas habituales de los acreedores.</p>`,
    },
    {
      id: 2,
      value: "estafa",
      content: `<p>${client.name} sufrió una situación de engaño, fraudulenta, en la que en aras de contribuir a una mejor economía personal y laboral se vió abocado a un fracaso económico, fruto del engaño o falsas expectativas. Esta posible estafa generó una situación de insolvencia irrevocable a ${client.name}. La situación era del todo objetivamente creíble, por lo que el error inducido en mi cliente era irremediable.</p><br>
      <p>Esta situación ha conllevado la imposibilidad de hacer frente a las deudas hasta la fecha presente.</p>`,
    },
    {
      id: 3,
      value: "desempleo",
      content: `<p>${client.name} sufrió un desempleo por lo que sus ingresos han descendido notablemente y ha generado la imposibilidad de hacer frente al pago de todas sus obligaciones dinerarias y crediticias. La situación económica y laboral de forma particular y a nivel estatal no ha ayudado a que ${client.name} tuviera la oportunidad de ofrecer una cuota superior o el pago de las cuotas impagadas por la bajada de ingresos desde la fecha en la que estuvo en desempleo. Es por este motivo que mi representado se ve en la obligación de presentar la actual solicitud de concurso.</p>`,
    },
    {
      id: 4,
      value: "divorcio",
      content: `<p>El motivo principal de la misma se genera a raíz de una modificación sustancial y estructural de la situación familiar del deudor, habida cuenta que fruto del cambio del estado civil tuvo que realizar un esfuerzo económico extraordinario, tanto en términos de sostenimiento de las cargas familiares, como de acceso a la vivienda. Dicha situación se hace insostenible ante el aumento de gastos y la disminución de apoyo económico por parte de su anterior pareja.</p>`,
    },
    {
      id: 5,
      value: "perdidas",
      content: `<p>${client.name} ha apostado en todo momento por el esfuerzo empresarial y profesional pero la situación económica de dicha actividad ha devenido progresivamente en una situación real de pérdida económica. Es por este motivo que se produce una situación de insolvencia que genera la imposibilidad de hacer frente a las deudas. ${client.name} ha decidido finalmente en aras de cumplir con sus obligaciones, presentar la actual solicitud de concurso.</p>`,
    },
    {
      id: 6,
      value: "incapacidad",
      content: `<p>${client.name} sufrió una situación de incapacidad temporal laboral, fruto de la misma sus ingresos disminuyeron notablemente y no tuvo la oportunidad de aumentar los mismos por la incapacidad señalada. Ante esta disminución de ingresos y el mantenimiento de los gastos habituales para una vida digna, ${client.name} se vio abocado a una situación real de insolvencia y, por ello, la imposibilidad de hacer frente al pago de las deudas.</p>`,
    },
    {
      id: 7,
      value: "familiares",
      content: `<p>El motivo principal de la insolvencia se genera a raíz de la necesidad de tratamiento médico de su familiar , y su posterior ingreso, habida cuenta de las carencias de nuestro sistema asistencial que, en numerosas ocasiones no puede llegar a tiempo para solventar este tipo de necesidades.</p><br>
      <p>Ello supuso que mi representado no tuviere otro remedio que endeudarse a fin de cubrir el alto coste económico del tratamiento, y que, lo que en un primer momento pudiere resultar asequible, a largo plazo no fue posible de sostener.</p>`,
    },
    {
      id: 8,
      value: "aumento-gastos",
      content: `<p>${client.name} tuvo que hacer frente a un aumento considerable de los gastos de explotación, tales como rentas, suministros… sin embargo el nivel de ingresos y rentabilidad se ha ido manteniendo, incluso disminuyendo, por lo que esta situación ha conllevado una verdadera insolvencia de ${client.name} y por lo tanto la imposibilidad de poder hacer frente al pago de la totalidad de las deudas.</p>`,
    },
    {
      id: 9,
      value: "disminucion-ventas",
      content: `<p>Durante los últimos periodos mi cliente ha sufrido en su sector una disminución notable de las ventas, por lo que los ingresos y rentabilidad han disminuido de igual manera. Sin embargo los gastos han permanecido prácticamente estables durante todo este tiempo. Esta situación conlleva a una irremediable insolvencia económica y por lo tanto la imposibilidad de hacer frente al pago de las deudas.</p>`,
    },
    {
      id: 10,
      value: "aumento-costes",
      content: `<p>${client.name} solicitó financiación ante la expectativa de crecimiento económico, ya que dicha financiación apoyaría la inversión en recursos que generarían una mayor rentabilidad según el estudio realizado en el plan de futuro. Sin embargo, las circunstancias han devenido en un decrecimiento económico, sobre todo por la situación de crisis económica que ha afectado notablemente a mi representado.</p>`,
    },
    {
      id: 11,
      value: "prestamos-acreedores",
      content: `<p>${client.name} se fue endeudando paulatinamente a lo largo de los años intentando solventar las faltas de liquidez a las que no podía hacer frente. Al no contar con ayuda de familiares y o conocidos, no tuvo otra opción que intentar reunificar sus financiaciones, sin éxito, lo que lo llevó a una tensión de liquidez que finalmente le impedía realizar su actividad.</p>`,
    },
    {
      id: 12,
      value: "abusividad-contenida",
      content: `<p>${client.name} solicitó las deudas manifestadas en este procedimiento ante la necesidad económica, desconociendo en todo momento las repercusiones que podría tener en un futuro. Las comisiones, intereses y demás cláusulas establecidas en los contratos de préstamos y financiaciones han impactado negativamente en la economía de mi representado, sin haber tenido la posibilidad de comprender dichas cláusulas en ningún momento por falta absoluta de transparencia desde un primer momento. Esta situación ha generado la imposibilidad de hacer frente al pago real de las cuotas de las deudas contraídas.</p>`,
    },
    {
      id: 13,
      value: "covid",
      content:
        clientData.tipoPersona == "persona"
          ? `<p>Derivado de la crisis pandémica por la situación de la COVID-19, mi representado vio mermados sus ingresos, habida cuenta que fue incluido en un ERTE que mermó sus ingresos, así como la dificultad de cobro por parte del Servicio de Empleo Público Estatal, le causó problemas de liquidez que no le permitieron hacer frente a sus obligaciones recurrentes, pese a que intentó acogerse a todas las moratorias, éstas no fueron aceptadas por la totalidad de los acreedores, lo que le subsumió en una situación de sobreendeudamiento de la que, unido a la escasez de ingresos, no pudo reponerse.</p>`
          : `<p>Derivado de la crisis pandémica por la situación de la COVID-19, mi representado vio mermados sus ingresos, habida cuenta que la paralización del país debido a la crisis pandémica, mermó sus ingresos hasta el nivel de no poder hacer frente a sus obligaciones habituales, precisando de endeudamiento para poder seguir trabajando, teniendo esperanza puesta en que el mercado post pandémico mejoraría o se recuperaría tal y como los indicadores económicos preveían. Sin embargo, el resultado no ha sido el esperado y, a fecha de hoy, no ha sido posible la recuperación económica de la actividad en las mismas condiciones económicas que había venido desarrollando desde antaño.</p>`,
    },
    {
      id: 14,
      value: "negocios",
      content: `<p>${client.name} decidió iniciar un negocio, para ello se inició como autónomo, dándose de alta en SS y AEAT. No obstante, la actividad no fue como esperaba, en cuanto a ingresos de explotación que no fueron acordes con sus expectativas y el alto precio de la infraestructura que precisaba para llevarla a cabo (alquiler de local, coste de materiales, etc), lo que lo llevó a sobre endeudarse con la esperanza de poder reestructurar la actividad y hacerla rentable. Sin embargo, la falta de liquidez no le permitió reestructurar la actividad en aras a hacerla rentable, por lo que a mi representado no le quedó más remedio que presentar el concurso.</p>`,
    },
  ];

  const tiposEpi = [
    {
      id: 1,
      value: "ima",
      name: "Insuficiencia de Masa Activa",
    },
    {
      id: 2,
      value: "plan-pagos",
      name: "Plan de Pagos",
    },
    {
      id: 3,
      value: "liquidacion",
      name: "Liquidación",
    },
  ];

  const Epis = [
    {
      id: 1,
      value: "ima",
      name: "Insuficiencia de Masa Activa",
      content: `Nos encontramos con unos activos claramente insuficientes para hacer frente a las deudas, incluidos los créditos contra la masa, por lo que esta parte propone conforme al artículo 37 bis y ter del Texto Refundido de la Ley Concursal (en adelante, TRLC) en relación con el artículo 486 2º del mismo texto normativo, se acuerde la conclusión del concurso por insuficiencia de la masa activa en el mismo auto de declaración de concurso, pues no consideramos previsible el ejercicio de acción de reintegración, de impugnación o de responsabilidad de terceros concediéndose el derecho de exoneración del pasivo insatisfecho por ser deudor de buena fe y cumplir con los requisitos exigidos en los artículos 487 y siguientes del TRLCNos encontramos con unos activos claramente insuficientes para hacer frente a las deudas, incluidos los créditos contra la masa, por lo que esta parte propone conforme al artículo 37 bis y ter del Texto Refundido de la Ley Concursal (en adelante, TRLC) en relación con el artículo 486 2º del mismo texto normativo, se acuerde la declaración de concurso con insuficiencia de la masa activa, pues no consideramos previsible el ejercicio de acción de reintegración, de impugnación o de responsabilidad de terceros concediéndose el derecho de exoneración del pasivo insatisfecho por ser deudor de buena fe y cumplir con los requisitos exigidos en los artículos 487 y siguientes del TRLC.`,
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

  useEffect(() => {
    let text = "";
    if (situation?.length > 0) {
      situation?.map((situ: any) => {
        const value = situations?.find((s) => s.value == situ)?.content;
        text += value?.concat("<br>");
      });
      setSituacionDeudorExplicacion(text);
    } else {
      setSituacionDeudorExplicacion("");
    }
  }, [situation]);

  const textContext = (context: string) => {
    if (context?.includes("<br>")) {
      const contextArray = context.split("<br>");

      const bloques = contextArray.map((sentence: string, index: number) => {
        return new Paragraph({
          text: `${sentence.replace(/<p[^>]*>/g, "").replace(/<\/p>/g, "")}`,
          alignment: AlignmentType.JUSTIFIED,
          spacing: {
            after: 200,
          },
        });
      });

      return bloques;
    } else {
      const bloque = [
        new Paragraph({
          text: `${context.replace(/<p[^>]*>/g, "").replace(/<\/p>/g, "")}`,
          alignment: AlignmentType.JUSTIFIED,
          spacing: {
            after: 200,
          },
        }),
      ];

      return bloque;
    }
  };

  if (clientData?.personasDependientes.length > 0) {
    table = new Table({
      rows: clientData?.personasDependientes?.map((p: any, index: any) => {
        return new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph(
                  `${p.find((p: any) => p.propertyKey == "name").propertyValue}`
                ),
              ],
              width: {
                size: 3000,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                left: 50,
              },
            }),
            new TableCell({
              children: [
                new Paragraph(
                  `${
                    p.find((p: any) => p.propertyKey == "surname").propertyValue
                  }`
                ),
              ],
              margins: {
                top: 50,
                bottom: 50,
                left: 50,
              },
              width: {
                size: 3000,
                type: WidthType.DXA,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: `${
                    p.find((p: any) => p.propertyKey == "age").propertyValue
                  } años`,
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
              },
              width: {
                size: 2000,
                type: WidthType.DXA,
              },
            }),
          ],
        });
      }),
      width: {
        size: 8000,
        type: WidthType.DXA,
      },
    });
  }

  const onSubmit = async (data: any) => {
    const abogado = lawyers.data?.users.find((l: any) => l.id == data.abogado);
    const procurador = { name: "Victoria", surname: "Arias Cortés" };

    const fecha = new Date();
    const aptdInfo = data;

    const doc = new Document({
      sections: [
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            new Paragraph({
              text: "MEMORIA EXPRESIVA DE LA HISTORIA ECONÓMICA Y JURÍDICA",
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: `${aptdInfo.sexo == "hombre" ? "D." : "Dña."} ${
                client.name + " " + client.surname
              }`,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `ART. 7..1º TRLC. - ${
                clientData.tipoPersona == "persona"
                  ? "PERSONA FÍSICA"
                  : "AUTÓNOMO"
              }`,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 600,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "1. Consideración Previa.",
                  bold: true,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `El presente documento ha sido preparado exclusivamente para que surta los efectos previstos en la Real Decreto Legislativo, 1/2020, de 5 de mayo de 2020 por el que se aprueba el Texto Refundido de la Ley Concursal, modificado por la Ley 16/2022, de 5 de septiembre, en el procedimiento de concurso voluntario instado por esta representación procesal, que debe tramitarse ante los Juzgados de lo Mercantil de la Provincia del deudor, por lo que no debe utilizarse para ninguna otra finalidad, ni ser distribuido a “terceros”, entendiendo como tales, a personas distintas de aquéllas que sean parte de este procedimiento.`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `Asimismo, la información utilizada para confeccionar este informe ha sido la obtenida por esta representación hasta la fecha de su emisión, sin detrimento de que pudiese surgir con posterioridad información relevante que aclarase, modificase o alterase ciertos puntos tratados y analizados en los apartados subsiguientes.`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "2. Consideraciones generales.",
                  bold: true,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `Mediante formulario normalizado, la procuradora de los Tribunales ${
                procurador.name
              } ${procurador.surname}, en nombre y representación de ${
                aptdInfo.sexo == "hombre" ? "D." : "Dña."
              } ${
                client.name + " " + client.surname
              } y bajo la dirección letrada de ${abogado.name} ${
                abogado.surname
              }, quien presta sus servicios para el Despacho Abogados Para tus Deudas (CORMEUM GLOBAL, S.L.) presenta ante el Juzgado de lo Mercantil de ${
                clientData.provincia
              }, solicitud de concurso voluntario. A dicha solicitud debe acompañarse el presente documento, donde se ponen de manifiesto los hechos relevantes de los legalmente tasados, de la insolvencia ${
                clientData.tipoInsolvencia
              } ${aptdInfo.sexo == "hombre" ? "D." : "Dña."} ${
                client.name + " " + client.surname
              } aportando la documental correspondiente en la que basa su derecho conforme a lo establecido en los artículos 6 y 7 de la Ley Concursal.`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `Para el supuesto que el Juzgado observe algún defecto u omisión en la presente solicitud se solicita, al amparo del artículo 231 de la Ley de Enjuiciamiento Civil, que se conceda a esta parte un plazo para subsanarlo.`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "3. Historia jurídica y económica del deudor. Motivo de la insolvencia.",
                  bold: true,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
          ],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: textContext(situacionDeudorExplicacion),
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "3.1. Historia jurídica y económica del deudor",
                  bold: true,
                }),
              ],
              spacing: {
                before: 400,
                after: 200,
              },
            }),
          ],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            new Paragraph({
              text: `${aptdInfo.sexo == "hombre" ? "D." : "Dña."} ${
                client.name + " " + client.surname
              }, nacido/a en ${clientData.lugarNacimiento}, el día ${formatDate(
                clientData.fechaNacimiento,
                "medium",
                "es"
              )}, ${clientData.estadoCivil}, ${
                clientData.estadoLaboral
              }, de nacionalidad ${clientData.nacionalidad}, con domicilio en ${
                clientData.ciudad
              }, ${
                clientData.direccion
              }; con DNI/NIF, según se acredita, número ${clientData.dni}.`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 200,
              },
            }),
          ],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            clientData.estadoCivil == "casado"
              ? new Paragraph({
                  text: `${aptdInfo.sexo == "hombre" ? "D." : "Dña."} ${
                    client.name + " " + client.surname
                  }, casado con D/Dña. ${
                    clientData.datosConyuge.find(
                      (p: any) => p.propertyKey == "name"
                    ).propertyValue +
                    " " +
                    clientData.datosConyuge.find(
                      (p: any) => p.propertyKey == "surname"
                    ).propertyValue
                  } con DNI/NIE ${
                    clientData.datosConyuge.find(
                      (p: any) => p.propertyKey == "dni"
                    ).propertyValue
                  } el pasado ${formatDate(
                    clientData.fechaMatrimonio,
                    "medium",
                    "es"
                  )} en régimen de ${getPropertyValueMap(
                    clientData.regimenEconomico
                  ).toLowerCase()}.`,
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: {
                    after: 200,
                  },
                })
              : clientData.estadoCivil == "pareja"
              ? new Paragraph({
                  text: `${aptdInfo.sexo == "hombre" ? "D." : "Dña."} ${
                    client.name + " " + client.surname
                  }, pareja de hecho con D/Dña. ${
                    clientData.datosPareja.find(
                      (p: any) => p.propertyKey == "name"
                    ).propertyValue +
                    " " +
                    clientData.datosPareja.find(
                      (p: any) => p.propertyKey == "surname"
                    ).propertyValue
                  } con DNI/NIE ${
                    clientData.datosPareja.find(
                      (p: any) => p.propertyKey == "dni"
                    ).propertyValue
                  }.`,
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: {
                    after: 200,
                  },
                })
              : new Paragraph({ text: "" }),
          ],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            clientData.dependenPersonas == "1omas"
              ? new Paragraph({
                  text: `Asimismo, ${
                    aptdInfo.sexo == "hombre" ? "D." : "Dña."
                  } ${
                    client.name + " " + client.surname
                  }, tiene la siguiente descendencia / está a cargo de los siguientes ascendientes:`,
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: {
                    after: 200,
                  },
                })
              : new Paragraph({ text: "" }),
          ],
        },

        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: clientData.dependenPersonas == "1omas" ? [table] : [],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            clientData.tipoPersona == "persona"
              ? new Paragraph({
                  text: `${aptdInfo.sexo == "hombre" ? "D." : "Dña."} ${
                    client.name + " " + client.surname
                  } es ${
                    clientData.tipoIngresos == "nomina"
                      ? "empleado"
                      : clientData.tipoIngresos == "pension"
                      ? "pensionista"
                      : "desempleado"
                  }, percibiendo una remuneración aproximada de ${
                    clientData.ingresos
                  } euros. Su profesión es la de ${clientData.estadoLaboral}.`,
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: {
                    after: 200,
                  },
                })
              : new Paragraph({
                  text: `${aptdInfo.sexo == "hombre" ? "D." : "Dña."} ${
                    client.name + " " + client.surname
                  } desempeña actividad profesional económica propia (autónomo). Percibe en la actualidad unos ingresos por importe de ${
                    clientData.ingresos
                  } euros al mes, de los que deben detraerse el pago de la cuota de autónomos, así como otros necesarios para la llevanza de su actividad profesional.`,
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: {
                    after: 200,
                  },
                }),
          ],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            new Paragraph({
              text: `En la actualidad, mantiene su vivienda habitual en régimen de ${
                clientData.datosVivienda.find(
                  (p: any) => p.propertyKey == "tipoVivienda"
                ).propertyValue
              }, abonando la cantidad de ${
                clientData.datosVivienda.find(
                  (p: any) => p.propertyKey == "costeVivienda"
                ).propertyValue
              } euros al mes.`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `Su cónyuge/pareja de hecho/ hijos, conviven con el mismo contribuyendo/sin contribuir al sostenimiento de las cargas de la unidad familiar.`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `Los gastos aproximados en comida y suministros ascienden a ${clientData.gastos} euros, sin contabilizar las cuotas de los créditos que venía abonando, por lo que claramente se halla en una situación de insolvencia.`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "4. Actividades durante los 3 últimos años.",
                  bold: true,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
          ],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: textContext(actividad3anos),
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            new Paragraph({
              text: `${aptdInfo.sexo == "hombre" ? "D." : "Dña."} ${
                client.name + " " + client.surname
              } es empleado y percibe una remuneración aproximadamente de unos ${
                clientData.ingresos
              } euros. Estos son sus únicos ingresos, con los que intenta sostener la situación de endeudamiento en la que se ha visto inmerso.`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `Se aporta junto con la solicitud de concurso el informe de vida laboral de mi representado en el que se puede comprobar las actividades realizadas por éste en los últimos tres años, así como documentos acreditativos de los ingresos actuales.`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "5. Causas del estado en que se encuentra el deudor.",
                  bold: true,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `Tal y como se ha indicado en la historia económica las causas que han llevado a mi mandante a esta situación son las siguientes:`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 200,
              },
            }),
          ],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: data.situacionDeudor.map((situ: any) => {
            return new Paragraph({
              text: `${getSituationName(situ)}`,
              bullet: {
                level: 0,
              },
              spacing: {
                after: 50,
              },
            });
          }),
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "6. Valoraciones y propuestas sobre la viabilidad patrimonial.",
                  bold: true,
                }),
              ],
              spacing: {
                before: 400,
                after: 200,
              },
            }),
            new Paragraph({
              text: `${
                Epis.find((epi) => epi.value === data.tipoEpi)?.content
              }`,
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 600,
              },
            }),
            new Paragraph({
              text: `En ${clientData.provincia}, a ${formatDate(
                fecha,
                "medium",
                "es"
              )}.`,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `Fdo. ${abogado.name} ${abogado.surname}`,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `Colegiado ${abogado.collegiatenumber} en ${abogado.lawSchool}`,
              spacing: {
                after: 200,
              },
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `memoria-expresiva.docx`);
    });
  };

  return (
    <>
      <PortalHeader title={client.name + " " + client.surname} />

      <div className="p-4 mx-auto max-w-5xl grid gap-8 ">
        <SectionBloc
          title="Memoria expresiva de la Historia Económica y Jurídica"
          description="Rellena los siguientes campos para generar la memoria."
        >
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
                    <label
                      htmlFor="Procurador"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Procurador
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        disabled
                        type="text"
                        name="procurador"
                        id="procurador"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                        defaultValue="Victoria Arias Cortés"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="abogado"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Abogado
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <select
                        {...register("abogado", { required: true })}
                        id="abogado"
                        name="abogado"
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
                      >
                        <option value="">Selecciona un abogado</option>
                        {lawyers.isLoading ? (
                          <option>Cargando...</option>
                        ) : (
                          <>
                            {lawyers.data.users.map((lawyer: any) => (
                              <option value={lawyer.id} key={lawyer.id}>
                                {lawyer.name} {lawyer.surname}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <div>
                      <div
                        className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                        id="label-notifications"
                      >
                        Sexo cliente
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="max-w-lg">
                        <div className="space-y-2">
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                {...register("sexo", {
                                  required: true,
                                })}
                                value="hombre"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="comments"
                                className="text-gray-700"
                              >
                                Hombre
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                {...register("sexo", {
                                  required: true,
                                })}
                                value="mujer"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="comments"
                                className="text-gray-700"
                              >
                                Mujer
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="actividadUltimosAnos"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Actividad los últimos 3 años
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <ReactQuill
                        theme="snow"
                        value={actividad3anos}
                        onChange={setActividad3anos}
                        className="text-sm text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <div>
                      <div
                        className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                        id="label-email"
                      >
                        Situación deudor
                      </div>
                    </div>
                    <div className="mt-4 sm:col-span-2 sm:mt-0">
                      <div className="max-w-lg space-y-4">
                        {options?.map((option) => (
                          <div
                            className="relative flex items-start"
                            key={option.value}
                          >
                            <div className="flex h-5 items-center">
                              <input
                                {...register("situacionDeudor", {
                                  required: true,
                                })}
                                name="situacionDeudor"
                                id="situacionDeudor"
                                value={option.value}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="situacionDeudor"
                                className="text-gray-700"
                              >
                                {option.label}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="context"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Explicación situación deudor
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <ReactQuill
                        theme="snow"
                        value={situacionDeudorExplicacion}
                        onChange={setSituacionDeudorExplicacion}
                        className="text-sm text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="abogado"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Tipo de Epi
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <select
                        {...register("tipoEpi", { required: true })}
                        id="tipoEpi"
                        name="tipoEpi"
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
                      >
                        <option value="">Selecciona el tipo de Epi</option>
                        {lawyers.isLoading ? (
                          <option>Cargando...</option>
                        ) : (
                          <>
                            {tiposEpi.map((tipo: any) => (
                              <option value={tipo.value} key={tipo.id}>
                                {tipo.name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t mt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  Generar memoria
                </button>
              </div>
            </div>
          </form>
        </SectionBloc>
        <SectionBloc
          title="Información cliente"
          description="Información detallada de las respuestas del cliente."
        >
          <ClientInfoQuestions type="minimal" />
        </SectionBloc>
      </div>
    </>
  );
};

export default Memoria;

Memoria.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};
