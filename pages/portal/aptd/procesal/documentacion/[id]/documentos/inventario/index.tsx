import React, { useEffect, useState } from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../../../../_app";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import { usePortalStore } from "store/portal";
import { useRouter } from "next/router";
import InventarioRendered from "components/portal/docs/inventario/inventario.rendered";
import {
  getPropertyValueMap,
  getPropertyValue,
  formatDate,
} from "shared/helpers";
import { getDocumentsType, uploadGeneratedDocument } from "apis/docs";
import { processesByUserId, setStatusDocument } from "apis/processes";
import useInventario from "hooks/procesal/useInventario";
import BienDescription from "components/portal/docs/inventario/bienDesc";
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
} from "docx";

const Inventario: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);

  const router = useRouter();
  const client = usePortalStore((state) => state.client);
  const clientInfo = usePortalStore((state) => state.clientInfo);

  const [totalAmountBank, setTotalAmountBank] = useState(0);
  const [totalAmountVA, setTotalAmountVA] = useState(0);
  const [totalAmountVM, setTotalAmountVM] = useState(0);

  const { ingresos, activos, cuentas } = useInventario(clientInfo);

  let tableBienes: any = [];
  let tableCuentas: any = [];

  useEffect(() => {
    defineTotalAmountBank();
    defineTotalAmountVA();
    defineTotalAmountVM();
  }, [totalAmountBank, totalAmountVA, totalAmountVM]);

  const naturalezaType = (activo: any) => {
    return getPropertyValueMap(
      getPropertyValue("naturaleza", activo.propertyValue),
      "naturaleza"
    );
  };

  const defineTotalAmountBank = () => {
    let total = 0;
    cuentas.forEach((item: any) => {
      const amount = item.find(
        (p: any) => p.propertyKey == "balance"
      ).propertyValue;
      total += parseFloat(amount);
    });

    setTotalAmountBank(total);
  };

  const defineTotalAmountVA = () => {
    let total = 0;

    activos.forEach((item: any) => {
      let amount = "";
      let amount2 = "";
      amount = getPropertyValueMap(
        getPropertyValue("valorCatastral", item[0].propertyValue),
        "valorCatastral"
      );
      amount2 = getPropertyValueMap(
        getPropertyValue("valorAdquisicion", item[0].propertyValue),
        "valorAdquisicion"
      );

      if (amount != "undefined") {
        total += Number(amount);
      }

      if (amount2 != "undefined") {
        total += Number(amount2);
      }
    });

    setTotalAmountVA(total);
  };

  const defineTotalAmountVM = () => {
    let total = 0;
    activos.forEach((item: any) => {
      const amount = getPropertyValueMap(
        getPropertyValue("valorMercado", item[0].propertyValue),
        "valorMercado"
      );
      total += parseFloat(amount);
    });
    setTotalAmountVM(total);
  };

  const clientData: any = {
    dni: client.dni,
    activos,
    cuentas,
    ingresos,
    totalAmountBank,
  };

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

  const tableIngresos = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(`Naturaleza`)],
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
          }),
          new TableCell({
            children: [new Paragraph(`Descripción`)],
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
            width: {
              size: 7000,
              type: WidthType.DXA,
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: `Importe`,
                alignment: AlignmentType.RIGHT,
              }),
            ],
            margins: {
              top: 50,
              bottom: 50,
              right: 50,
            },
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(`${ingresosName(clientData.ingresos.tipo)}`),
            ],
            width: {
              size: 1500,
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
                `Ingresos mensuales de ${ingresosName(
                  clientData.ingresos.tipo
                )}`
              ),
            ],
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
            width: {
              size: 7000,
              type: WidthType.DXA,
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: `${Number(clientData.ingresos.cantidad).toLocaleString(
                  "es-AR"
                )} €`,
                alignment: AlignmentType.RIGHT,
              }),
            ],
            margins: {
              top: 50,
              bottom: 50,
              right: 50,
            },
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
          }),
        ],
      }),
    ],
    width: {
      size: 10000,
      type: WidthType.DXA,
    },
  });

  const tableBienesHeader = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(`Naturaleza`)],
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
          }),
          new TableCell({
            children: [new Paragraph(`Descripción`)],
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
            width: {
              size: 4000,
              type: WidthType.DXA,
            },
          }),
          new TableCell({
            children: [new Paragraph(`Valor adquisición`)],
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
          }),
          new TableCell({
            children: [new Paragraph(`Valor mercado`)],
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: `Cargas`,
                alignment: AlignmentType.RIGHT,
              }),
            ],
            margins: {
              top: 50,
              bottom: 50,
              right: 50,
            },
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
          }),
        ],
      }),
    ],
    width: {
      size: 10000,
      type: WidthType.DXA,
    },
  });

  if (clientData.activos.length > 0) {
    tableBienes = new Table({
      rows: clientData.activos.map((p: any, index: any) => {
        return new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph(
                  `${getPropertyValueMap(
                    getPropertyValue("naturaleza", p[0].propertyValue),
                    "naturaleza"
                  )}`
                ),
              ],
              width: {
                size: 1500,
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
                getPropertyValueMap(
                  getPropertyValue("naturaleza", p[0].propertyValue),
                  "naturaleza"
                ) == "Bien Inmueble"
                  ? new Paragraph({
                      text: `${getPropertyValueMap(
                        getPropertyValue("tipoInmueble", p[0].propertyValue),
                        "tipoInmueble"
                      )} en ${getPropertyValueMap(
                        getPropertyValue("provincia", p[0].propertyValue),
                        "provincia"
                      )} inscrita en el Registro de la Propiedad nº ${getPropertyValueMap(
                        getPropertyValue("numInscripcion", p[0].propertyValue),
                        "numInscripcion"
                      )} de ${getPropertyValueMap(
                        getPropertyValue("provincia", p[0].propertyValue),
                        "provincia"
                      )}, libro ${getPropertyValueMap(
                        getPropertyValue("numLibro", p[0].propertyValue),
                        "numLibro"
                      )}, folio ${getPropertyValueMap(
                        getPropertyValue("folio", p[0].propertyValue),
                        "folio"
                      )}, tomo ${getPropertyValueMap(
                        getPropertyValue("tomo", p[0].propertyValue),
                        "tomo"
                      )} y nº de finca ${getPropertyValueMap(
                        getPropertyValue("numFinca", p[0].propertyValue),
                        "numFinca"
                      )}`,
                      alignment: AlignmentType.LEFT,
                    })
                  : new Paragraph({
                      text: `${getPropertyValueMap(
                        getPropertyValue("name", p[0].propertyValue),
                        "name"
                      )}, ${getPropertyValueMap(
                        getPropertyValue("brandVehicle", p[0].propertyValue),
                        "brandVehicle"
                      )}, ${getPropertyValueMap(
                        getPropertyValue("modelVehicle", p[0].propertyValue),
                        "modelVehicle"
                      )} con matrícula ${getPropertyValueMap(
                        getPropertyValue("licensePlate", p[0].propertyValue),
                        "licensePlate"
                      )} adquirido el ${formatDate(
                        getPropertyValueMap(
                          getPropertyValue(
                            "acquisitionDate",
                            p[0].propertyValue
                          ),
                          "acquisitionDate"
                        ),
                        "short",
                        "es"
                      )}, ${
                        getPropertyValueMap(
                          getPropertyValue(
                            "reservationTitle",
                            p[0].propertyValue
                          ),
                          "reservationTitle"
                        ) == "no"
                          ? "sin reserva de título."
                          : "con reserva de título."
                      }`,
                      alignment: AlignmentType.LEFT,
                    }),
              ],
              width: {
                size: 4000,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
                left: 50,
              },
            }),
            new TableCell({
              children: [
                getPropertyValueMap(
                  getPropertyValue("naturaleza", p[0].propertyValue),
                  "naturaleza"
                ) == "Bien Inmueble"
                  ? new Paragraph({
                      text: `${Number(
                        getPropertyValueMap(
                          getPropertyValue(
                            "valorCatastral",
                            p[0].propertyValue
                          ),
                          "valorCatastral"
                        )
                      ).toLocaleString("es-AR")} €`,
                      alignment: AlignmentType.RIGHT,
                    })
                  : new Paragraph({
                      text: `${Number(
                        getPropertyValueMap(
                          getPropertyValue(
                            "valorAdquisicion",
                            p[0].propertyValue
                          ),
                          "valorAdquisicion"
                        )
                      ).toLocaleString("es-AR")} €`,
                      alignment: AlignmentType.RIGHT,
                    }),
              ],
              width: {
                size: 1500,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: `${Number(
                    getPropertyValueMap(
                      getPropertyValue("valorMercado", p[0].propertyValue),
                      "valorMercado"
                    )
                  ).toLocaleString("es-AR")} €`,
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              width: {
                size: 1500,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: `No`,
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              width: {
                size: 1500,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
              },
            }),
          ],
        });
      }),
      width: {
        size: 10000,
        type: WidthType.DXA,
      },
    });
  } else {
    tableBienes = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`Inmueble`)],
              width: {
                size: 1500,
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
                new Paragraph({
                  text: `No es titular de bienes inmuebles`,
                  alignment: AlignmentType.LEFT,
                }),
              ],
              width: {
                size: 4000,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
                left: 50,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: `0 €`,
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              width: {
                size: 1500,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: `0 €`,
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              width: {
                size: 1500,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: ``,
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              width: {
                size: 1500,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
              },
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`Mueble`)],
              width: {
                size: 1500,
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
                new Paragraph({
                  text: `No es titular de bienes muebles`,
                  alignment: AlignmentType.LEFT,
                }),
              ],
              width: {
                size: 4000,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
                left: 50,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: `0 €`,
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              width: {
                size: 1500,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: `0 €`,
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              width: {
                size: 1500,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: ``,
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              width: {
                size: 1500,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
              },
            }),
          ],
        }),
      ],
      width: {
        size: 10000,
        type: WidthType.DXA,
      },
    });
  }

  const tableBienesFooter = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(`TOTAL`)],
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
          }),
          new TableCell({
            children: [new Paragraph(``)],
            width: {
              size: 4000,
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
              new Paragraph({
                text: `${totalAmountVA.toLocaleString("es-AR")} €`,
                alignment: AlignmentType.RIGHT,
              }),
            ],
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
            margins: {
              top: 50,
              bottom: 50,
              right: 50,
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: `${totalAmountVM.toLocaleString("es-AR")} €`,
                alignment: AlignmentType.RIGHT,
              }),
            ],
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
            margins: {
              top: 50,
              bottom: 50,
              right: 50,
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: ``,
                alignment: AlignmentType.RIGHT,
              }),
            ],
            margins: {
              top: 50,
              bottom: 50,
              right: 50,
            },
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
          }),
        ],
      }),
    ],
    width: {
      size: 10000,
      type: WidthType.DXA,
    },
  });

  const tableCuentasHeader = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(`Naturaleza`)],
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
          }),
          new TableCell({
            children: [new Paragraph(`Descripción`)],
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
          }),
          new TableCell({
            children: [new Paragraph(`Entidad`)],
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
          }),
          new TableCell({
            children: [new Paragraph(`Número de cuenta`)],
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
            width: {
              size: 4000,
              type: WidthType.DXA,
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: `Saldo`,
                alignment: AlignmentType.RIGHT,
              }),
            ],
            margins: {
              top: 50,
              bottom: 50,
              right: 50,
            },
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
          }),
        ],
      }),
    ],
    width: {
      size: 10000,
      type: WidthType.DXA,
    },
  });

  if (clientData.cuentas.length > 0) {
    tableCuentas = new Table({
      rows: clientData.cuentas.map((p: any, index: any) => {
        return new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`Tesorería`)],
              width: {
                size: 1500,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                left: 50,
              },
            }),
            new TableCell({
              children: [new Paragraph(`Cuenta bancaria`)],
              width: {
                size: 1500,
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
                  `${p.find((p: any) => p.propertyKey == "name").propertyValue}`
                ),
              ],
              width: {
                size: 1500,
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
                  `${p.find((p: any) => p.propertyKey == "iban").propertyValue}`
                ),
              ],
              width: {
                size: 4000,
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
                new Paragraph({
                  text: `${
                    p.find((p: any) => p.propertyKey == "balance").propertyValue
                  } €`,
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              width: {
                size: 1500,
                type: WidthType.DXA,
              },
              margins: {
                top: 50,
                bottom: 50,
                right: 50,
              },
            }),
          ],
        });
      }),
      width: {
        size: 10000,
        type: WidthType.DXA,
      },
    });
  }

  const tableCuentasFooter = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(`TOTAL`)],
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
          }),
          new TableCell({
            children: [new Paragraph(``)],
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
          }),
          new TableCell({
            children: [new Paragraph(``)],
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
            margins: {
              top: 50,
              bottom: 50,
              left: 50,
            },
          }),
          new TableCell({
            children: [new Paragraph(``)],
            width: {
              size: 4000,
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
              new Paragraph({
                text: `${Number(totalAmountBank).toLocaleString("es-AR")} €`,
                alignment: AlignmentType.RIGHT,
              }),
            ],
            margins: {
              top: 50,
              bottom: 50,
              right: 50,
            },
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
          }),
        ],
      }),
    ],
    width: {
      size: 10000,
      type: WidthType.DXA,
    },
  });

  const tableTotal = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(`TOTAL INVENTARIO DE BIENES Y DERECHOS`)],
            width: {
              size: 8500,
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
              new Paragraph({
                text: `${(
                  Number(totalAmountVM) +
                  Number(totalAmountBank) +
                  Number(clientData.ingresos.cantidad)
                ).toLocaleString("es-AR")} €`,
                alignment: AlignmentType.RIGHT,
              }),
            ],
            margins: {
              top: 50,
              bottom: 50,
              right: 50,
            },
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
          }),
        ],
      }),
    ],
    width: {
      size: 10000,
      type: WidthType.DXA,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const doc = new Document({
      sections: [
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            new Paragraph({
              text: `INVENTARIO DE BIENES Y DERECHOS DE ${
                client.name + " " + client.surname
              }`,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `En base al artículo 7. 2º del Texto Refundido de la Ley Concursal, se acompaña junto con la solicitud de declaración de concurso de D./Dña. ${
                client.name + " " + client.surname
              } con DNI/NIE ${
                clientData.dni
              } inventario de los bienes y derechos que integran su patrimonio.`,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 600,
              },
            }),
          ],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [tableIngresos],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [tableBienesHeader, tableBienes, tableBienesFooter],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [tableCuentasHeader, tableCuentas, tableCuentasFooter],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [tableTotal],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `inventario-bienes.docx`);
    });
  };
  return (
    <div className="p-4 mx-auto max-w-7xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8  bg-white p-4 rounded-lg border"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Inventario de bienes
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Confirma los siguientes campos para generar el invetario de
                bienes.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0 pb-10">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-2"
                >
                  Naturaleza
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Descripción
                </th>

                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-2"
                >
                  Importe
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-2">
                  <div className="text-gray-500">
                    {ingresosName(ingresos.tipo)}
                  </div>
                </td>

                <td className="py-4 px-3 text-sm max-w-sm text-gray-500">
                  Ingresos mensuales de{" "}
                  <span className="lowercase">
                    {ingresosName(ingresos.tipo)}
                  </span>
                </td>

                <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-2">
                  {Number(ingresos.cantidad).toLocaleString("es-AR")} €
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {activos.length > 0 && (
          <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0 pb-10">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-2"
                  >
                    Naturaleza
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Descripción
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Valor adquisición
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Valor mercado
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-2"
                  >
                    Cargas
                  </th>
                </tr>
              </thead>
              <tbody>
                {activos.map((activo: any, index: any) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-2">
                      <div className="text-gray-500">
                        {naturalezaType(activo[0])}
                      </div>
                    </td>

                    <td className="py-4 px-3 text-sm max-w-sm">
                      <BienDescription activo={activo[0]} />
                    </td>

                    <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                      {naturalezaType(activo[0]) == "Bien Inmueble" && (
                        <>
                          {Number(
                            getPropertyValueMap(
                              getPropertyValue(
                                "valorCatastral",
                                activo[0].propertyValue
                              ),
                              "valorCatastral"
                            )
                          ).toLocaleString("es-AR")}
                        </>
                      )}
                      {naturalezaType(activo[0]) == "Bien mueble" && (
                        <>
                          {Number(
                            getPropertyValueMap(
                              getPropertyValue(
                                "valorAdquisicion",
                                activo[0].propertyValue
                              ),
                              "valorAdquisicion"
                            )
                          ).toLocaleString("es-AR")}
                        </>
                      )}{" "}
                      {naturalezaType(activo[0]) == "Otro activo" && (
                        <>
                          {Number(
                            getPropertyValueMap(
                              getPropertyValue(
                                "estimatedValue",
                                activo[0].propertyValue
                              ),
                              "estimatedValue"
                            )
                          ).toLocaleString("es-AR")}
                        </>
                      )}{" "}
                      €
                    </td>
                    <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                      {Number(
                        getPropertyValueMap(
                          getPropertyValue(
                            "valorMercado",
                            activo[0].propertyValue
                          ),
                          "valorMercado"
                        )
                      ).toLocaleString("es-AR")}{" "}
                      €
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-2">
                      No
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <th
                    scope="row"
                    className="py-3.5 hidden pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:table-cell md:pl-2"
                  >
                    Total
                  </th>
                  <th
                    scope="row"
                    className="hidden py-3.5 pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:table-cell md:pl-2"
                  ></th>

                  <td className="pt-4  py-3.5 text-right text-sm font-semibold text-gray-900 px-3">
                    {totalAmountVA.toLocaleString("es")} €
                  </td>
                  <td className="pt-4 py-3.5 text-right text-sm font-semibold text-gray-900 px-3">
                    {totalAmountVM.toLocaleString("es")} €
                  </td>
                  <td className="pl-3 py-3.5 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {cuentas.length > 0 && (
          <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0 pb-10">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-2"
                  >
                    Naturaleza
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Descripción
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Entidad
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Número de cuenta
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-2"
                  >
                    Saldo
                  </th>
                </tr>
              </thead>
              <tbody>
                {cuentas.map((cuenta: any, index: any) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-2">
                      <div className="text-gray-500">Tesorería</div>
                      <div className="mt-0.5 text-gray-500 sm:hidden">
                        Cuenta bancaria
                      </div>
                    </td>
                    <td className="py-4 px-3 text-sm">
                      <div className="text-gray-500">Cuenta bancaria</div>
                      <div className="mt-0.5 text-gray-500 sm:hidden">
                        Cuenta bancaria
                      </div>
                    </td>
                    <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                      {
                        cuenta.find((p: any) => p.propertyKey == "name")
                          .propertyValue
                      }
                    </td>
                    <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                      {
                        cuenta.find((p: any) => p.propertyKey == "iban")
                          .propertyValue
                      }
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-2">
                      {cuenta
                        .find((p: any) => p.propertyKey == "balance")
                        .propertyValue.toLocaleString("es-AR")}
                      €
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <th
                    scope="row"
                    className="hidden py-3.5 pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:table-cell md:pl-2"
                  >
                    Total
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden py-3.5 pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-2"
                  ></th>
                  <th
                    scope="row"
                    className="pl-4 py-3.5 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                  >
                    Total
                  </th>
                  <td className="pl-3 py-3.5 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-2">
                    {totalAmountBank.toLocaleString("es-AR")} €
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        <div>
          <div className="mt-8 flex justify-between bg-gray-50 py-3 px-2 border">
            <p className="text-sm font-semibold text-gray-900">
              TOTAL INVENTARIO DE BIENES Y DERECHOS
            </p>
            <p className="text-right text-sm font-semibold text-gray-900">
              {(
                Number(totalAmountVM) +
                Number(totalAmountBank) +
                Number(ingresos.cantidad)
              ).toLocaleString("es-AR")}
              €
            </p>
          </div>
        </div>

        <div className="pt-5">
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
              Generar inventario
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Inventario;

Inventario.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};
