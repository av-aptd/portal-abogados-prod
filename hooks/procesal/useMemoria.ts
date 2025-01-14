import { getQuestionClient, QUESTION_OPERATORS } from "shared/helpers";
import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";

const useMemoria = (clientInfo: any) => {
  let personasDependientes: any[] = [];
  let datosConyuge: any[] = [];
  let datosPareja: any[] = [];
  let fechaMatrimonio: any = "";
  let regimenEconomico: any = "";
  let dependenPersonas: any = "";
  let numPersonas: any[] = [];

  const tipoPersona = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.AUTONOMO_O_PERSONA_FISICA
  )[0].properties.filter((item: any) => item.propertyKey == "tipoCliente")[0]
    .propertyValue;

  const provincia = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOSRESIDENCIA
  )[0].properties.filter((item: any) => item.propertyKey == "province")[0]
    .propertyValue;

  const ciudad = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOSRESIDENCIA
  )[0].properties.filter((item: any) => item.propertyKey == "city")[0]
    .propertyValue;

  const direccion = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOSRESIDENCIA
  )[0].properties.filter((item: any) => item.propertyKey == "address")[0]
    .propertyValue;

  const lugarNacimiento = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOSDNI
  )[0].properties.filter((item: any) => item.propertyKey == "birthPlace")[0]
    .propertyValue;

  const fechaNacimiento = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOSDNI
  )[0].properties.filter((item: any) => item.propertyKey == "birthDate")[0]
    .propertyValue;

  const nacionalidad = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOSDNI
  )[0].properties.filter((item: any) => item.propertyKey == "nationality")[0]
    .propertyValue;

  const estadoCivil = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.ESTADO_CIVIL
  )[0].properties.filter((item: any) => item.propertyKey == "estadoCivil")[0]
    .propertyValue;

  const estadoLaboral = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.TIPO_ACTIVIDAD
  )[0].properties.filter(
    (item: any) => item.propertyKey == "cualEsTuActividad"
  )[0].propertyValue;

  const tipoIngresos = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.TIPO_INGRESOS
  )[0].properties.filter((item: any) => item.propertyKey == "tipoIngreso")[0]
    .propertyValue;

  const ingresos = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.INGRESOS_MENSUALES
  )[0].properties.filter(
    (item: any) => item.propertyKey == "ingresosMensuales"
  )[0].propertyValue;

  const gastos = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.GASTOS_MENSUALES
  )[0].properties.filter(
    (item: any) => item.propertyKey == "gastosMensuales"
  )[0].propertyValue;

  const tipoInsolvencia = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.TIPO_INSOLVENCIA
  )[0].properties.filter(
    (item: any) => item.propertyKey == "tipoInsolvencia"
  )[0].propertyValue;

  const datosVivienda = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.GASTOS_VIVIENDA
  )[0].properties;

  if (
    getQuestionClient(clientInfo, QUESTIONS_GROUP_KEY.DATOS_PAREJA)[0] !=
    undefined
  ) {
    datosPareja = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.DATOS_PAREJA
    )[0].properties;
  }

  if (
    getQuestionClient(clientInfo, QUESTIONS_GROUP_KEY.DATOS_CONYUGE)[0] !=
    undefined
  ) {
    datosConyuge = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.DATOS_CONYUGE
    )[0].properties;
  }

  if (
    getQuestionClient(clientInfo, QUESTIONS_GROUP_KEY.FECHA_MATRIMONIO)[0] !=
    undefined
  ) {
    fechaMatrimonio = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.FECHA_MATRIMONIO
    )[0].properties.filter((item: any) => item.propertyKey == "marriageDate")[0]
      .propertyValue;
  }

  if (
    getQuestionClient(clientInfo, QUESTIONS_GROUP_KEY.REGIMEN_ECONOMICO)[0] !=
    undefined
  ) {
    regimenEconomico = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.REGIMEN_ECONOMICO
    )[0].properties.filter(
      (item: any) => item.propertyKey == "regimenEconomico"
    )[0].propertyValue;
  }

  if (
    getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.CUANTAS_PERSONAS_DEPENDEN_DE_TI
    )[0] != undefined
  ) {
    dependenPersonas = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.CUANTAS_PERSONAS_DEPENDEN_DE_TI
    )[0].properties.filter(
      (item: any) => item.propertyKey == "personasDependientes"
    )[0].propertyValue;

    numPersonas = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.PERSONAS_DEPENDIENTES,
      QUESTION_OPERATORS.STARTS_WITH
    );

    numPersonas.forEach((item: any) => {
      personasDependientes.push(item.properties);
    });
  }

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

  return {
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
  };
};

export default useMemoria;
