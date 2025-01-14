import { getQuestionClient, QUESTION_OPERATORS } from "shared/helpers";
import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";

const useInventario = (clientInfo: any) => {
  console.log("clientInfo", clientInfo);

  let activos: any = [];
  let listadoActivos: any[] = [];
  let listadoCuentas: any[] = [];
  let cuentas: any[] = [];

  let tipoIngresos: any = "";
  let cantidadIngresos: any = {};

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
      activos.push(item.properties);
    });
  }

  if (
    getQuestionClient(clientInfo, QUESTIONS_GROUP_KEY.TIPO_INGRESOS)[0] !=
    undefined
  ) {
    tipoIngresos = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.TIPO_INGRESOS
    )[0].properties.filter((item: any) => item.propertyKey == "tipoIngreso")[0]
      .propertyValue;
  }

  if (
    getQuestionClient(clientInfo, QUESTIONS_GROUP_KEY.INGRESOS_MENSUALES)[0] !=
    undefined
  ) {
    cantidadIngresos = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.INGRESOS_MENSUALES
    )[0].properties.filter(
      (item: any) => item.propertyKey == "ingresosMensuales"
    )[0].propertyValue;
  }

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
      activos.push(item.properties);
    });
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

    listadoCuentas.forEach((item: any) => {
      cuentas.push(item.properties);
    });
  }

  let ingresos = { tipo: tipoIngresos, cantidad: cantidadIngresos };

  return {
    activos,
    cuentas,
    ingresos,
  };
};

export default useInventario;
