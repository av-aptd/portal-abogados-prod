import {
  getQuestionClient,
  QUESTION_OPERATORS,
  getPropertyValueMap,
} from "shared/helpers";
import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";

const useDemanda = (clientInfo: any) => {
  let tienesPersonas = "";
  let conyuge = { nombre: "", apellido: "", dni: "", email: "", telefono: "" };
  let regimen = "";
  let copropietarios = "";
  let coyugeConcurso = "";
  let numTrabajadores = "";
  let listadoCuentas = [];
  let listadoActivos = [];
  let sumaCuentasBanco = 0;
  let sumaActivos = 0;
  let viviendaHabitual = null;

  const getPropertyValue = (propertyKey: string, json: string): string => {
    return JSON.parse(json)[propertyKey];
  };

  const provincia = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOSRESIDENCIA
  )[0].properties.filter((item: any) => item.propertyKey == "province")[0]
    .propertyValue;

  const dni = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOSDNI
  )[0].properties.filter((item: any) => item.propertyKey == "dni")[0]
    .propertyValue;

  const birthPlace = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOSDNI
  )[0].properties.filter((item: any) => item.propertyKey == "birthPlace")[0]
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

  const tipoPersona = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.AUTONOMO_O_PERSONA_FISICA
  )[0].properties.filter((item: any) => item.propertyKey == "tipoCliente")[0]
    .propertyValue;

  const actividad = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.TIPO_ACTIVIDAD
  )[0].properties.filter(
    (item: any) => item.propertyKey == "cualEsTuActividad"
  )[0].propertyValue;

  const cambioEmprarodamiento = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.CAMBIADO_EMPADRONAMIENTO
  )[0].properties.filter(
    (item: any) => item.propertyKey == "cambioEmprarodamiento6meses"
  )[0].propertyValue;

  const estadoCivil = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.ESTADO_CIVIL
  )[0].properties.filter((item: any) => item.propertyKey == "estadoCivil")[0]
    .propertyValue;

  const tipoInsolvencia = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.TIPO_INSOLVENCIA
  )[0].properties.filter(
    (item: any) => item.propertyKey == "tipoInsolvencia"
  )[0].propertyValue;

  if (estadoCivil == "casado") {
    regimen = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.REGIMEN_ECONOMICO
    )[0].properties.filter(
      (item: any) => item.propertyKey == "regimenEconomico"
    )[0].propertyValue;
  }

  if (estadoCivil == "casado") {
    copropietarios = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.COPROPIETARIOS_VIVIENDA_HABITUAL
    )[0].properties.filter(
      (item: any) => item.propertyKey == "copropietariosViviendaHabitual"
    )[0].propertyValue;
  }

  if (estadoCivil == "casado") {
    coyugeConcurso = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.CONYUGE_CONCURSO
    )[0].properties.filter(
      (item: any) => item.propertyKey == "haSolicitadoConyugeConcurso"
    )[0].propertyValue;
  }

  if (
    getQuestionClient(clientInfo, QUESTIONS_GROUP_KEY.TIENES_TRABAJADORES)[0] !=
    undefined
  ) {
    tienesPersonas = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.TIENES_TRABAJADORES
    )[0].properties.filter(
      (item: any) => item.propertyKey == "tienesTrabajadores"
    )[0].propertyValue;
  }

  if (
    getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.TIENES_TRABAJADORES,
      QUESTION_OPERATORS.STARTS_WITH
    )[0] != undefined
  ) {
    numTrabajadores = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.PLANTILLA_TRABAJADORES,
      QUESTION_OPERATORS.STARTS_WITH
    );
  }

  if (
    getQuestionClient(clientInfo, QUESTIONS_GROUP_KEY.DATOS_CONYUGE)[0] !=
    undefined
  ) {
    conyuge.nombre = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.DATOS_CONYUGE
    )[0].properties.filter(
      (item: any) => item.propertyKey == "name"
    )[0].propertyValue;
    conyuge.apellido = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.DATOS_CONYUGE
    )[0].properties.filter(
      (item: any) => item.propertyKey == "surname"
    )[0].propertyValue;
    conyuge.dni = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.DATOS_CONYUGE
    )[0].properties.filter(
      (item: any) => item.propertyKey == "dni"
    )[0].propertyValue;
  }

  if (
    getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.NUMEROS_CUENTAS_SALDO,
      QUESTION_OPERATORS.STARTS_WITH
    )[0] != undefined
  ) {
    listadoCuentas = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.NUMEROS_CUENTAS_SALDO,
      QUESTION_OPERATORS.STARTS_WITH
    );

    sumaCuentasBanco = listadoCuentas.reduce(
      (a: any, b: any) =>
        a +
        Number(
          b.properties.filter((item: any) => item.propertyKey == "balance")[0]
            .propertyValue
        ),
      0
    );
  }

  const tipoVivienda = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.GASTOS_VIVIENDA
  )[0].properties.filter((item: any) => item.propertyKey == "tipoVivienda")[0]
    .propertyValue;

  if (
    getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.ACTIVOS_QUE_POSEES,
      QUESTION_OPERATORS.STARTS_WITH
    )[0] != undefined
  ) {
    listadoActivos = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.ACTIVOS_QUE_POSEES,
      QUESTION_OPERATORS.STARTS_WITH
    );

    listadoActivos.forEach((item: any) => {
      const amount = getPropertyValueMap(
        getPropertyValue("valorMercado", item.properties[0].propertyValue),
        "valorMercado"
      );
      sumaActivos += parseFloat(amount);
    });

    const vivienda = listadoActivos.filter(
      (item: any) =>
        getPropertyValue("name", item.properties[0].propertyValue) ==
        "Vivienda habitual"
    );

    viviendaHabitual = JSON.parse(vivienda[0].properties[0].propertyValue);
  }

  return {
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
    trabajadores: numTrabajadores.length,
    conyuge,
    sumaCuentasBanco,
    tipoVivienda,
    sumaActivos,
    viviendaHabitual,
    copropietarios,
    coyugeConcurso,
  };
};

export default useDemanda;
