import React, { useState } from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../../../../_app";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import { usePortalStore } from "store/portal";
import { useRouter } from "next/router";
import DemandaRendered from "components/portal/docs/demanda/demanda.rendered";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import ClientInfoQuestions from "components/portal/info";
import { useQuery } from "@tanstack/react-query";
import useLawyers from "hooks/procesal/useLawyers";
import { getUserCreditors } from "apis/client";
import useDemanda from "hooks/procesal/useDemanda";
import PortalHeader from "components/portal/layout/header";

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
  SymbolRun,
  LevelFormat,
  convertInchesToTwip,
  BorderStyle,
  CheckBox,
  HeadingLevel,
} from "docx";
import { formatDate } from "shared/helpers";

const Demanda: NextPageWithLayout = () => {
  const [pasivo, setPasivo] = useState(0);
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();
  const client = usePortalStore((state) => state.client);
  const clientInfo = usePortalStore((state) => state.clientInfo);

  const {
    provincia,
    dni,
    birthPlace,
    ciudad,
    direccion,
    tipoPersona,
    actividad,
    cambioEmprarodamiento,
    estadoCivil,
    tipoInsolvencia,
    regimen,
    tienesPersonas,
    trabajadores,
    conyuge,
    sumaCuentasBanco,
    tipoVivienda,
    sumaActivos,
    viviendaHabitual,
    copropietarios,
    coyugeConcurso,
  } = useDemanda(clientInfo);

  const optionsSolutions = [
    {
      label: "Convenio",
      value: "Convenio",
    },
    { label: "EPI plan pagos", value: "EPI plan pagos" },
    {
      label: "Liquidación",
      value: "Liquidación",
    },
    {
      label: "Insuficiencia masa activa",
      value: "Insuficiencia masa activa",
    },
  ];

  const options = [
    {
      label: "Sobreendeudamiento",
      value: "sobreendeudamiento",
    },
    { label: "Estafa", value: "estafa" },
    {
      label: "Desempleo",
      value: "desempleo",
    },
    {
      label: "Divorcio/Separación/Nulidad",
      value: "divorcio",
    },
    {
      label: "Pérdidas empresariales o profesionales",
      value: "perdidas",
    },
    {
      label: "Incapacidad temporal laboral",
      value: "incapacidad",
    },
    {
      label: "Familiares enfermos",
      value: "familiares",
    },
    {
      label: "Aumento de los gastos de explotación",
      value: "aumento-gastos",
    },
    {
      label: "Disminución de las ventas",
      value: "disminucion-ventas",
    },
    {
      label: "Aumento de los costes financieros",
      value: "aumento-costes",
    },
    {
      label: "Préstamos de otros acreedores",
      value: "prestamos-acreedores",
    },
    {
      label:
        "Abusividad contenida en los préstamos al consumo y créditos solicitados",
      value: "abusividad-contenida",
    },
    {
      label: "Covid",
      value: "covid",
    },
    {
      label: "Negocios",
      value: "negocios",
    },
  ];

  const documentacion = [
    {
      label: "Memoria económica y jurídica",
      value: "memoria",
    },
    {
      label: "Inventario de bienes y derechos",
      value: "inventario",
    },
    {
      label: "Relación de acreedores",
      value: "acreedores",
    },
    {
      label: "Plantilla de trabajadores",
      value: "trabajadores",
    },
    {
      label: "Plan de pagos sujeto a la EPI",
      value: "epi",
    },
    {
      label: "Otros documentos",
      value: "otros",
    },
  ];

  const userCreditors = useQuery(
    ["userCreditors", profile.token, client.id],
    () => getUserCreditors(profile.token, client.id),
    {
      onSuccess(data) {
        setPasivo(
          data.reduce((a: any, b: any) => a + Number(b.contractAmount), 0)
        );
      },
    }
  );

  const clientData: any = {
    provincia,
    dni,
    birthPlace,
    direccion,
    actividad,
    ciudad,
    tipoPersona,
    cambioEmprarodamiento,
    estadoCivil,
    tipoInsolvencia,
    tienesPersonas,
    tipoVivienda,
    conyuge,
    regimen,
    copropietarios,
    coyugeConcurso,
    trabajadores,
    acreedores: userCreditors?.data?.length,
    pasivo,
    sumaCuentasBanco,
    sumaActivos,
    viviendaHabitual,
  };

  console.log("clientData", clientData);

  const lawyers = useLawyers(profile.token);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const docAdjunta = watch("documentacionAdjunta");

  const onSubmit = async (data: any) => {
    const abogado = lawyers.data?.users.find((l: any) => l.id == data.abogado);
    const procurador = { name: "Victoria", surname: "Arias Cortés" };
    const fecha = new Date();
    const aptdInfo = data;
    // const blob = await DemandaRendered(
    //   fecha,
    //   client,
    //   clientData,
    //   aptdInfo,
    //   abogado,
    //   procurador
    // );
    // saveAs(blob, `solicitud-concurso-consecutivo.pdf`);

    const situacion = new Paragraph({
      children: aptdInfo.situacionDeudor.map((s: any) => {
        return new TextRun({
          text: `${options.find((option) => option.value == s)?.label}`,
          break: 1,
        });
      }),
      indent: {
        left: 720,
      },
      spacing: {
        after: 100,
      },
    });

    const observaciones1 = [
      new Paragraph({
        text: `OBSERVACIONES`,
        heading: HeadingLevel.HEADING_2,
        spacing: {
          after: 400,
        },
      }),
      new Paragraph({
        text: `PRIMERA.- En todos aquellos defectos advertidos por el Juzgado esta parte solicita expresamente plazo para la eventual subsanación de los mismos.`,
        spacing: {
          after: 100,
        },
      }),
      new Paragraph({
        text: `SEGUNDA.- Esta parte manifiesta que mi representado no ha sido condenado por delito alguno que pudiere afectar a la concesión de la exoneración del pasivo insatisfecho. Por ende, se autoriza expresamente al Juzgado a la obtención y consulta de las bases de datos y registros de penados de la Administración de Justicia.`,
        spacing: {
          after: 100,
        },
      }),
      new Paragraph({
        text: `TERCERA.- Esta parte autoriza cualesquiera consulta al Punto Neutro Judicial por si pudieren aparecer cualesquiera otros activos o pasivos existentes de los que esta representación no haya podido obtener conocimiento, tales como cuentas bancarias, vehículos, bienes muebles o inmuebles.`,
        spacing: {
          after: 100,
        },
      }),
      new Paragraph({
        text: `CUARTA.- Se solicita se acuerde como medida cautelar la suspensión de cualesquiera ejecuciones así como procedimientos declarativos instados contra mi representado, en aras a facilitar la protección del patrimonio de mi representado, tales como nóminas, saldos en cuentas bancarias fijados para alimentos, etc.`,
        spacing: {
          after: 100,
        },
      }),
      new Paragraph({
        text: `QUINTA.- Se solicita se haga expreso pronunciamiento en el Auto de declaración de concurso de la imposibilidad a las entidades bancarias de bloqueo de cuentas en tanto que no se haya aceptado el cargo por el Administrador Concursal en el caso de que se designe, habida cuenta que ello imposibilita la continuación de la subsistencia del deudor (tales como compras en supermercados, pagos correspondientes a la vivienda -alquiler-, pagos de pensiones de alimentos en favor de hijos, etc).`,
        spacing: {
          after: 100,
        },
      }),
    ];

    const observaciones2 = [
      aptdInfo.solucionConcurso == "Insuficiencia masa activa"
        ? new Paragraph({
            text: `SEXTA.- Se solicita concurso sin masa en virtud de lo establecido en el art. 37 de la TRLC: Concurso sin masa.`,
            spacing: {
              after: 100,
            },
          })
        : new Paragraph({}),
      aptdInfo.solucionConcurso == "Insuficiencia masa activa"
        ? new Paragraph({
            text: `Se considera que existe concurso sin masa cuando concurran los supuestos siguientes por este orden:`,
            spacing: {
              after: 100,
            },
          })
        : new Paragraph({}),
      aptdInfo.solucionConcurso == "Insuficiencia masa activa"
        ? new Paragraph({
            text: `a) El concursado carezca de bienes y derechos que sean legalmente embargables.`,
            spacing: {
              after: 100,
            },
          })
        : new Paragraph({}),
      aptdInfo.solucionConcurso == "Insuficiencia masa activa"
        ? new Paragraph({
            text: `b) El coste de realización de los bienes y derechos del concursado fuera manifiestamente desproporcionado respecto al previsible valor venal.`,
            spacing: {
              after: 100,
            },
          })
        : new Paragraph({}),
      aptdInfo.solucionConcurso == "Insuficiencia masa activa"
        ? new Paragraph({
            text: `c) Los bienes y derechos del concursado libres de cargas fueran de valor inferior al previsible coste del procedimiento.`,
            spacing: {
              after: 100,
            },
          })
        : new Paragraph({}),
      aptdInfo.solucionConcurso == "Insuficiencia masa activa"
        ? new Paragraph({
            text: `d) Los gravámenes y las cargas existentes sobre los bienes y derechos del concursado lo sean por importe superior al valor de mercado de esos bienes y derechos`,
            spacing: {
              after: 100,
            },
          })
        : new Paragraph({}),
    ];

    const observaciones3 = [
      new Paragraph({
        text: `SÉPTIMA.- Se aporta como documento número 6, documentación personal acreditativa de la insolvencia.`,
        spacing: {
          after: 100,
        },
      }),
    ];

    const observaciones4 = [
      new Paragraph({
        text: `SEXTA.- Se aporta como documento número 6, documentación personal acreditativa de la insolvencia.`,
        spacing: {
          after: 100,
        },
      }),
    ];

    const doc = new Document({
      numbering: {
        config: [
          {
            reference: "order-list-numbered",
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL,
                text: "%1.",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.3),
                      hanging: convertInchesToTwip(0.18),
                    },
                  },
                },
              },
              {
                level: 1,
                format: LevelFormat.DECIMAL,
                text: "%2.",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.18),
                    },
                  },
                },
              },
              {
                level: 2,
                format: LevelFormat.LOWER_LETTER,
                text: "%3)",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(1.5),
                      hanging: convertInchesToTwip(1.18),
                    },
                  },
                },
              },
              {
                level: 3,
                format: LevelFormat.UPPER_LETTER,
                text: "%4)",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: { left: 2880, hanging: 2420 },
                  },
                },
              },
            ],
          },
        ],
      },
      sections: [
        {
          properties: {
            type: SectionType.NEXT_PAGE,
          },
          children: [
            new Paragraph({
              text: "FORMULARIO PARA LA SOLICITUD DE CONCURSO",
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `AL JUZGADO MERCANTIL DE ${clientData.provincia}`,
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              text: `DATOS DEL DEUDOR`,
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Nombre y apellidos: ${client.name + " " + client.surname}`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `NIF/NIE: ${clientData.dni}`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Datos del Registro Civil: ${clientData.birthPlace}`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `¿Tiene la condición de empresario, autónomo o asimilados?`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked: clientData.tipoPersona == "persona" ? true : false,
                }),
                new TextRun(" No"),
                new TextRun("     "),
                new CheckBox({
                  checked: clientData.tipoPersona == "autonomo" ? true : false,
                }),

                new TextRun(
                  ` Sí. Indique la actividad: ${
                    clientData.tipoPersona == "autonomo" && clientData.actividad
                  }`
                ),
              ],
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),

            new Paragraph({
              text: `Lugar de residencia o domicilio profesional, si es distinto del anterior:`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Datos del Registro Civil: ${
                clientData.direccion + ", " + clientData.ciudad
              }`,
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Modificación del domicilio en los últimos seis meses:`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked:
                    clientData.cambioEmprarodamiento == "yes" ? true : false,
                }),
                new TextRun(" No"),
                new TextRun("     "),
                new CheckBox({
                  checked:
                    clientData.cambioEmprarodamiento == "no" ? true : false,
                }),
                new TextRun(" Sí"),
              ],
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Estado civil y régimen económico matrimonial:`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked: clientData.estadoCivil == "soltero" ? true : false,
                }),
                new TextRun({ text: " Soltero/a" }),
                new TextRun({ break: 1 }),
                new CheckBox({
                  checked: clientData.estadoCivil == "pareja" ? true : false,
                }),
                new TextRun({ text: " Pareja de hecho" }),
                new TextRun({ break: 1 }),
                new CheckBox({
                  checked: clientData.estadoCivil == "casado" ? true : false,
                }),
                new TextRun({ text: " Casado/a, en régimen de:" }),
                new TextRun({
                  text: ` ${
                    clientData.estadoCivil == "casado" ? clientData.regimen : ""
                  }`,
                }),
                new TextRun({ break: 1 }),
                new CheckBox({
                  checked:
                    clientData.estadoCivil == "divorciado" ? true : false,
                }),
                new TextRun({
                  text: " Divorciado/a - Separado, ¿existen medidas reguladoras económicas?    ",
                }),
                new CheckBox({ checked: false }),
                new TextRun({ text: " Sí" }),
                new TextRun("     "),
                new CheckBox({ checked: false }),
                new TextRun({ text: " No" }),
              ],
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Datos del cónyuge (si el régimen económico matrimonial implica comunidad de bienes):`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Nombre y apellidos: ${
                clientData.estadoCivil == "casado"
                  ? clientData.conyuge.nombre +
                    " " +
                    clientData.conyuge.apellido
                  : ""
              }`,
              numbering: {
                reference: "order-list-numbered",
                level: 1,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `NIF/NIE: ${
                clientData.estadoCivil == "casado" ? clientData.conyuge.dni : ""
              }`,
              numbering: {
                reference: "order-list-numbered",
                level: 1,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Lugar de residencia (si es distinto del otro cónyuge):`,
              numbering: {
                reference: "order-list-numbered",
                level: 1,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "¿Ha solicitado el cónyuge el concurso?    ",
                }),
                new CheckBox({
                  checked: clientData.coyugeConcurso == "yes" ? true : false,
                }),
                new TextRun({ text: " Sí" }),
                new TextRun("     "),
                new CheckBox({
                  checked: clientData.coyugeConcurso == "no" ? true : false,
                }),
                new TextRun({ text: " No" }),
              ],
              numbering: {
                reference: "order-list-numbered",
                level: 1,
              },
              spacing: {
                after: 60,
              },
            }),
            new Paragraph({
              text: `En caso afirmativo, indicar: `,
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `¿Son copropietarios de la vivienda habitual?`,
              numbering: {
                reference: "order-list-numbered",
                level: 1,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked: clientData.copropietarios == "yes" ? true : false,
                }),
                new TextRun({ text: " Sí" }),
                new TextRun("     "),
                new CheckBox({
                  checked: clientData.copropietarios == "no" ? true : false,
                }),
                new TextRun({ text: " No" }),
              ],
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
          ],
        },
        {
          properties: {
            type: SectionType.NEXT_PAGE,
          },
          children: [
            new Paragraph({
              text: `DATOS DE LA PARTE SOLICITANTE`,
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked: true,
                }),
                new TextRun({ text: " Con procurador" }),
              ],
              indent: {
                left: 360,
              },
              spacing: {
                after: 60,
              },
            }),
            new Paragraph({
              text: `Identificación: Arias Cortés, Victoria`,
              indent: {
                left: 720,
              },
              spacing: {
                after: 60,
              },
            }),
            new Paragraph({
              text: `Apoderamiento:`,
              indent: {
                left: 720,
              },
              spacing: {
                after: 60,
              },
            }),
            new Paragraph({
              text: `Solicita el otorgamiento apud acta al amparo del artículo 24 de la Ley Enjuiciamiento Civil`,
              indent: {
                left: 720,
              },
              spacing: {
                after: 60,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked: false,
                }),
                new TextRun({ text: " Justicia gratuita:" }),
                new TextRun("     "),
                new CheckBox({
                  checked: false,
                }),
                new TextRun({ text: " Sí" }),
                new TextRun("     "),
                new CheckBox({
                  checked: true,
                }),
                new TextRun({ text: " No" }),
              ],
              indent: {
                left: 360,
              },
              spacing: {
                after: 800,
              },
            }),
            new Paragraph({
              text: `DATOS DE LA INSOLVENCIA`,
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Clase de insolvencia    ",
                }),
                new CheckBox({
                  checked:
                    clientData.tipoInsolvencia != "inminente" ? true : false,
                }),
                new TextRun({ text: " Actual" }),
                new TextRun("     "),
                new CheckBox({
                  checked:
                    clientData.tipoInsolvencia == "inminente" ? true : false,
                }),
                new TextRun({ text: " Inminente" }),
              ],
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 60,
              },
            }),
            new Paragraph({
              text: `Hecho/s de los que deriva la situación de insolvencia (breve referencia a desarrollar en la Memoria):`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            situacion,
            new Paragraph({
              children: [
                new TextRun({
                  text: "¿Tiene trabajadores a cargo?    ",
                }),
                new CheckBox({
                  checked: clientData.trabajadores > 0 ? true : false,
                }),
                new TextRun({ text: " Sí" }),
                new TextRun("     "),
                new CheckBox({
                  checked: clientData.trabajadores > 0 ? false : true,
                }),
                new TextRun({ text: " No" }),
              ],
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },

              spacing: {
                before: 100,
                after: 100,
              },
            }),
            new Paragraph({
              text: `Número de trabajadores: ${
                clientData.trabajadores > 0 ? clientData.trabajadores : 0
              } Completar ANEXO I, si hay representantes legales de los trabajadores.`,
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Valoración del activo: ${clientData.sumaActivos.toLocaleString(
                "es-AR"
              )} euros. Completar ANEXO II, si hay bienes y derechos susceptibles de inscripción.`,
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Cuantía del pasivo: ${clientData.pasivo.toLocaleString(
                "es-AR"
              )} euros.`,
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Número de acreedores:  ${clientData.acreedores}. Completar ANEXO III, si hay procedimientos judiciales y/o administrativos pendientes.`,
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
          ],
        },
        {
          properties: {
            type: SectionType.NEXT_PAGE,
          },
          children: [
            new Paragraph({
              text: `Vivienda habitual:`,
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `¿Es propietario de su vivienda habitual?`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked: clientData.viviendaHabitual != null ? true : false,
                }),
                new TextRun(" Sí"),
                new TextRun("     "),
                new CheckBox({
                  checked: clientData.viviendaHabitual == null ? true : false,
                }),
                new TextRun(" No"),
              ],
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `En caso afirmativo, responda a las siguientes preguntas:`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `¿Está gravada con hipoteca?`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked:
                    clientData.tipoVivienda == "hipoteca" &&
                    clientData.viviendaHabitual &&
                    clientData.viviendaHabitual.gravadaHipoteca == "yes"
                      ? true
                      : false,
                }),
                new TextRun(" Sí"),
                new TextRun("     "),
                new CheckBox({
                  checked:
                    clientData.tipoVivienda == "hipoteca" &&
                    clientData.viviendaHabitual &&
                    clientData.viviendaHabitual.gravadaHipoteca == "no"
                      ? true
                      : false,
                }),
                new TextRun(" No"),
              ],
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `En caso afirmativo, ¿con qué entidad financiera? ${
                clientData.viviendaHabitual != null
                  ? clientData.viviendaHabitual.entidadFinanciera
                  : ""
              }  `,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `¿Está al corriente en el pago de las cuotas hipotecarias? `,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked:
                    clientData.tipoVivienda == "hipoteca" &&
                    clientData.viviendaHabitual &&
                    clientData.viviendaHabitual.gravadaHipoteca == "yes"
                      ? true
                      : false,
                }),
                new TextRun(" Sí"),
                new TextRun("     "),
                new CheckBox({
                  checked:
                    clientData.tipoVivienda == "hipoteca" &&
                    clientData.viviendaHabitual &&
                    clientData.viviendaHabitual.gravadaHipoteca == "no"
                      ? true
                      : false,
                }),
                new TextRun(" No"),
              ],
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Importe de la cuota hipotecaria mensual: euros`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Límite de la responsabilidad hipotecaria: euros`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `Capital pendiente: euros`,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `¿Está al corriente en el pago de las cuotas de comunidad? `,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked:
                    clientData.tipoVivienda == "hipoteca" &&
                    clientData.viviendaHabitual &&
                    clientData.viviendaHabitual.corrientePagoComunidad == "yes"
                      ? true
                      : false,
                }),
                new TextRun(" Sí"),
                new TextRun("     "),
                new CheckBox({
                  checked:
                    clientData.tipoVivienda == "hipoteca" &&
                    clientData.viviendaHabitual &&
                    clientData.viviendaHabitual.corrientePagoComunidad == "no"
                      ? true
                      : false,
                }),
                new TextRun(" No"),
              ],
              indent: {
                left: 720,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              text: `¿Está al corriente de pago en los impuestos que gravan la vivienda? `,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked:
                    clientData.tipoVivienda == "hipoteca" &&
                    clientData.viviendaHabitual &&
                    clientData.viviendaHabitual.corrienteImpuestosVivienda ==
                      "yes"
                      ? true
                      : false,
                }),
                new TextRun(" Sí"),
                new TextRun("     "),
                new CheckBox({
                  checked:
                    clientData.tipoVivienda == "hipoteca" &&
                    clientData.viviendaHabitual &&
                    clientData.viviendaHabitual.corrienteImpuestosVivienda ==
                      "no"
                      ? true
                      : false,
                }),
                new TextRun(" No"),
              ],
              indent: {
                left: 720,
              },
              spacing: {
                after: 800,
              },
            }),
            new Paragraph({
              text: `SOLUCION DEL CONCURSO`,
              heading: HeadingLevel.HEADING_2,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked:
                    aptdInfo.solucionConcurso == "Convenio" ? true : false,
                }),
                new TextRun({ text: " CONVENIO" }),
                new TextRun({ break: 1 }),
                new CheckBox({
                  checked:
                    aptdInfo.solucionConcurso == "EPI plan pagos"
                      ? true
                      : false,
                }),
                new TextRun({ text: " EPI PLAN PAGOS" }),
                new TextRun({ break: 1 }),
                new CheckBox({
                  checked:
                    aptdInfo.solucionConcurso == "Liquidación" ? true : false,
                }),
                new TextRun({ text: " LIQUIDACION" }),
                new TextRun({ break: 1 }),
                new CheckBox({
                  checked:
                    aptdInfo.solucionConcurso == "Insuficiencia masa activa"
                      ? true
                      : false,
                }),
                new TextRun({
                  text: " INSUFICIENCIA MASA ACTIVA (Artículo 37 bis Ley 16/2022 de 5 de septiembre)",
                }),
              ],
              indent: {
                left: 720,
              },
              spacing: {
                after: 800,
              },
            }),
            new Paragraph({
              text: `DOCUMENTACIÓN QUE ACOMPAÑA A LA SOLICITUD`,
              heading: HeadingLevel.HEADING_2,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new CheckBox({
                  checked: aptdInfo.documentacionAdjunta.includes("memoria")
                    ? true
                    : false,
                }),
                new TextRun({ text: " Documento núm. 1          " }),
                new TextRun({ text: "Memoria económica y jurídica" }),
                new TextRun({ break: 1 }),
                new CheckBox({
                  checked: aptdInfo.documentacionAdjunta.includes("inventario")
                    ? true
                    : false,
                }),
                new TextRun({ text: " Documento núm. 2          " }),
                new TextRun({ text: "Inventario de bienes y derechos" }),
                new TextRun({ break: 1 }),
                new CheckBox({
                  checked: aptdInfo.documentacionAdjunta.includes("acreedores")
                    ? true
                    : false,
                }),
                new TextRun({ text: " Documento núm. 3          " }),
                new TextRun({ text: "Relación de acreedores" }),
                new TextRun({ break: 1 }),
                new CheckBox({
                  checked: aptdInfo.documentacionAdjunta.includes(
                    "trabajadores"
                  )
                    ? true
                    : false,
                }),
                new TextRun({ text: " Documento núm. 4          " }),
                new TextRun({ text: "Plantilla de trabajadores" }),
                new TextRun({ break: 1 }),
                new CheckBox({
                  checked: aptdInfo.documentacionAdjunta.includes("epi")
                    ? true
                    : false,
                }),
                new TextRun({ text: " Documento núm. 5          " }),
                new TextRun({
                  text: "Plan de pagos sujeto a la Exoneración del Pasivo Insatisfecho (EPI)",
                }),
                new TextRun({ break: 1 }),
                new CheckBox({
                  checked: aptdInfo.documentacionAdjunta.includes("otros")
                    ? true
                    : false,
                }),
                new TextRun({ text: " Documento núm. 6          " }),
                new TextRun({
                  text: "Otros documentos (acreditativos de la insolvencia)",
                }),
                new TextRun({ break: 1 }),
              ],
              indent: {
                left: 720,
              },
              spacing: {
                after: 800,
              },
            }),
            new Paragraph({
              text: `Marcar la casilla de verificación de los documentos presentados. En caso de no aportar alguno de los documentos exigidos por la Ley Concursal, informar de los motivos en al apartado F) OBSERVACIONES.
              `,
              numbering: {
                reference: "order-list-numbered",
                level: 0,
              },
              spacing: {
                after: 100,
              },
            }),
          ],
        },
        {
          properties: {
            type: SectionType.NEXT_PAGE,
          },
          children: observaciones1,
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children:
            aptdInfo.solucionConcurso == "Insuficiencia masa activa"
              ? observaciones2
              : [],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children:
            aptdInfo.solucionConcurso == "Insuficiencia masa activa"
              ? observaciones3
              : observaciones4,
        },
        {
          properties: {
            type: SectionType.NEXT_PAGE,
          },
          children: [
            new Paragraph({
              text: `PROCESOS JUDICIALES ABIERTOS`,
              heading: HeadingLevel.HEADING_2,
              spacing: {
                after: 1200,
              },
            }),

            new Paragraph({
              text: `En ${clientData.provincia}, a ${formatDate(
                fecha,
                "medium",
                "es"
              )} `,
              spacing: {
                after: 800,
              },
            }),
            new Table({
              borders: {
                top: {
                  style: BorderStyle.NONE,
                },
                bottom: {
                  style: BorderStyle.NONE,
                },
                left: {
                  style: BorderStyle.NONE,
                },
                right: {
                  style: BorderStyle.NONE,
                },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: `Firma Abogado: LTDA. ${abogado.collegiatenumber} ${abogado.surname}, ${abogado.name} `,
                          spacing: {
                            after: 100,
                          },
                        }),
                        new Paragraph({
                          text: `Cormeum Global SL`,
                        }),
                      ],
                      width: {
                        size: 50,
                        type: WidthType.PERCENTAGE,
                      },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: `Firma Procurador: ${procurador.name} ${procurador.surname}`,
                          alignment: AlignmentType.RIGHT,
                        }),
                      ],
                      width: {
                        size: 50,
                        type: WidthType.PERCENTAGE,
                      },
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `formulario-solicitud-concurso.docx`);
    });

    // const docTypes = await getDocumentsType(profile.token);
    // const docTypeId = docTypes.find((d: any) => d.code == "SCC").id;

    // const processes = await processesByUserId(profile.token, client.id);
    // const processId = processes[0].id;

    // const formData = new FormData();
    // formData.append("file", blob);
    // formData.append("fileName", "solicitud-concuros-consecutivo.pdf");
    // formData.append("fileTypeId", docTypeId);
    // formData.append("processId", processId);
    // formData.append("clientId", client.id);

    // const doc = await uploadGeneratedDocument(
    //   profile.token,
    //   processId,
    //   formData
    // );
    // await setStatusDocument(
    //   profile.token,
    //   processId,
    //   doc.id,
    //   JSON.stringify({ status: 1 })
    // );
  };

  return (
    <>
      <PortalHeader title="Solicitud de concurso consecutivo" />

      <div className="p-4 mx-auto max-w-7xl grid lg:grid-cols-2 gap-8">
        <SectionBloc
          title="Solicitud de concurso consecutivo"
          description="   Rellena los siguientes campos para generar la demanda."
        >
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5"></div>
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
                    // {...register("procurador", { required: true })}
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
                <div>
                  <div
                    className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                    id="label-notifications"
                  >
                    Solución del concurso
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="max-w-lg">
                    <div className="space-y-2">
                      {optionsSolutions?.map((option) => (
                        <div
                          className="relative flex items-start"
                          key={option.value}
                        >
                          <div className="flex h-5 items-center">
                            <input
                              {...register("solucionConcurso", {
                                required: true,
                              })}
                              name="solucionConcurso"
                              id="solucionConcurso"
                              value={option.value}
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="comments" className="text-gray-700">
                              {option.label}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <div>
                  <div
                    className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                    id="label-email"
                  >
                    Documentación
                  </div>
                </div>
                <div className="mt-4 sm:col-span-2 sm:mt-0">
                  <div className="max-w-lg space-y-4">
                    {documentacion?.map((option) => (
                      <div
                        className="relative flex items-start"
                        key={option.value}
                      >
                        <div className="flex h-5 items-center">
                          <input
                            {...register("documentacionAdjunta", {
                              required: true,
                            })}
                            name="documentacionAdjunta"
                            id="documentacionAdjunta"
                            value={option.value}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="documentacionAdjunta"
                            className="text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    {docAdjunta && docAdjunta?.includes("otros") && (
                      <div className="mt-4">
                        <input
                          {...register("otraDocumentacion")}
                          type="text"
                          name="otraDocumentacion"
                          id="otraDocumentacion"
                          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                        />
                      </div>
                    )}
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
                  Generar demanda
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

export default Demanda;

Demanda.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};
