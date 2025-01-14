import { QUESTION_PROPERTY_KEY } from "enums/questionClientPropertyKey.enum";

export class COLUMNS_DISPLAY {
  static DIRECCION_CLIENTE = [
    {
      title: "Dirección",
      key: QUESTION_PROPERTY_KEY.ADDRESS,
      valueType: "string",
    },
    {
      title: "Código postal",
      key: QUESTION_PROPERTY_KEY.ZIPCODE,
      valueType: "string",
    },
    {
      title: "Ciudad",
      key: QUESTION_PROPERTY_KEY.CITY,
      valueType: "string",
    },
    {
      title: "Provincia",
      key: QUESTION_PROPERTY_KEY.PROVINCE,
      valueType: "string",
    },
  ];
  static DNI_CLIENTE = [
    {
      title: "DNI",
      key: QUESTION_PROPERTY_KEY.DNI,
      valueType: "string",
    },
    {
      title: "Fecha expiración DNI",
      key: QUESTION_PROPERTY_KEY.DNI_EXPIRATION,
      valueType: "date",
    },
    {
      title: "Fecha de Nacimiento",
      key: QUESTION_PROPERTY_KEY.BIRTH_DATE,
      valueType: "date",
    },
    {
      title: "Lugar de Nacimiento",
      key: QUESTION_PROPERTY_KEY.PLACE_DATE,
      valueType: "string",
    },
    {
      title: "Nacionalidad",
      key: QUESTION_PROPERTY_KEY.NATIONALITY,
      valueType: "string",
    },
  ];
  static CAMBIO_EMPADRONAMIENTO = [
    {
      title: "",
      key: QUESTION_PROPERTY_KEY.CAMBIADO_EMPADRONAMIENTO,
      valueType: "string",
    },
  ];

  static CUOTAS_HIPOTECA_DIA = [
    {
      title: "",
      key: QUESTION_PROPERTY_KEY.CUOTAS_HIPOTECA_DIA,
      valueType: "string",
    },
  ];

  static INGRESOS_MENSUALES = [
    {
      key: QUESTION_PROPERTY_KEY.INGRESOS_MENSUALES,
      suffix: "€",
      valueType: "number",
    },
  ];
  static TIPO_INGRESO = [
    {
      key: QUESTION_PROPERTY_KEY.TIPO_INGRESO,
      valueType: "string",
    },
  ];
  static GASTOS_VIVIENDA = [
    {
      title: "tipo vivienda",
      key: QUESTION_PROPERTY_KEY.TIPO_VIVIENDA,
      valueType: "string",
    },
    {
      title: "Coste vivienda",
      key: QUESTION_PROPERTY_KEY.COSTE_VIVIENDA,
      suffix: "€",
      valueType: "number",
    },
  ];
  static GASTOS_MENSUALES = [
    {
      key: QUESTION_PROPERTY_KEY.GASTOS_MENSUALES,
      suffix: "€",
      valueType: "number",
    },
  ];
  static TIPO_GASTOS = [
    {
      key: QUESTION_PROPERTY_KEY.TIPO_GASTOS,
      valueType: "string",
    },
  ];
  static TIPO_ACTIVIDAD = [
    {
      key: QUESTION_PROPERTY_KEY.TIPO_ACTIVIDAD,
      valueType: "string",
    },
  ];
  static ACTIVIDAD_ULTIMOS = [
    {
      key: QUESTION_PROPERTY_KEY.ACTIVIDAD_ULTIMOS,
      valueType: "string",
    },
  ];
  static TIPO_INSOLVENCIA = [
    {
      key: QUESTION_PROPERTY_KEY.TIPO_INSOLVENCIA,
      valueType: "string",
    },
  ];
  static MOTIVO_INSOLVENCIA = [
    {
      key: QUESTION_PROPERTY_KEY.MOTIVO_INSOLVENCIA,
      valueType: "string",
    },
  ];
  static ESTADO_CIVIL = [
    {
      key: QUESTION_PROPERTY_KEY.ESTADO_CIVIL,
      valueType: "string",
    },
  ];
  static DATOS_CONYUGE = [
    {
      title: "Nombre",
      key: QUESTION_PROPERTY_KEY.NAME,
      valueType: "string",
    },
    {
      title: "Apellido",
      key: QUESTION_PROPERTY_KEY.SURNAME,
      valueType: "string",
    },
    {
      title: "DNI",
      key: QUESTION_PROPERTY_KEY.DNI,
      valueType: "string",
    },
    {
      title: "Email",
      key: QUESTION_PROPERTY_KEY.EMAIL,
      valueType: "string",
    },
    {
      title: "Teléfono",
      key: QUESTION_PROPERTY_KEY.PHONE,
      valueType: "string",
    },
  ];
  static FECHA_MATRIMONIO = [
    {
      key: QUESTION_PROPERTY_KEY.FECHA_MATRIMONIO,
      valueType: "date",
    },
  ];
  static REGIMEN_ECONOMICO = [
    {
      key: QUESTION_PROPERTY_KEY.REGIMEN_ECONOMICO,
      valueType: "string",
    },
  ];
  static MEDIDAS_REGULADORAS = [
    {
      key: QUESTION_PROPERTY_KEY.MEDIDAS_REGULADORAS,
      valueType: "string",
    },
  ];
  static DATOS_PAREJA = [
    {
      title: "Nombre",
      key: QUESTION_PROPERTY_KEY.NAME,
      valueType: "string",
    },
    {
      title: "Apellido",
      key: QUESTION_PROPERTY_KEY.SURNAME,
      valueType: "string",
    },
    {
      title: "Email",
      key: QUESTION_PROPERTY_KEY.EMAIL,
      valueType: "string",
    },
    {
      title: "Teléfono",
      key: QUESTION_PROPERTY_KEY.PHONE,
      valueType: "string",
    },
    {
      title: "DNI",
      key: QUESTION_PROPERTY_KEY.DNI,
      valueType: "string",
    },
  ];
  static INSCRITA_PAREJA_REGISTRO_CIVIL = [
    {
      title: "",
      key: QUESTION_PROPERTY_KEY.INSCRITA_PAREJA_REGISTRO_CIVIL,
      valueType: "string",
    },
  ];
  static FECHA_INSCRIPCION = [
    {
      key: QUESTION_PROPERTY_KEY.FECHA_INSCRIPCION,
      valueType: "date",
    },
  ];
  static CUANTAS_PERSONAS_DEPENDEN_DE_TI = [
    {
      key: QUESTION_PROPERTY_KEY.CUANTAS_PERSONAS_DEPENDEN_DE_TI,
      valueType: "string",
    },
  ];
  static PERSONAS_DEPENDIENTES = [
    {
      title: "Nombre",
      key: QUESTION_PROPERTY_KEY.NAME,
      valueType: "string",
    },
    {
      title: "Apellido",
      key: QUESTION_PROPERTY_KEY.SURNAME,
      valueType: "string",
    },
    {
      title: "Edad",
      key: QUESTION_PROPERTY_KEY.AGE,
      suffix: " años",
      valueType: "number",
    },
  ];
  static PLANTILLA_TRABAJADORES = [
    {
      title: "Nombre",
      key: QUESTION_PROPERTY_KEY.NAME,
      sufix: "",
      valueType: "string",
    },
    {
      title: "Apellido",
      key: QUESTION_PROPERTY_KEY.SURNAME,
      sufix: "",
      valueType: "string",
    },
    {
      title: "Email",
      key: QUESTION_PROPERTY_KEY.EMAIL,
      sufix: "",
      valueType: "string",
    },
    {
      title: "Teléfono",
      key: QUESTION_PROPERTY_KEY.PHONE,
      sufix: "",
      valueType: "string",
    },
    {
      title: "Salario",
      key: QUESTION_PROPERTY_KEY.SALARY,
      suffix: "€",
      valueType: "number",
    },
  ];
  static COPROPIETARIOS_VIVIENDA_HABITUAL = [
    {
      key: QUESTION_PROPERTY_KEY.COPROPIETARIOS_VIVIENDA_HABITUAL,
      valueType: "string",
    },
  ];
  static AUTONOMO_O_PERSONA_FISICA = [
    {
      key: QUESTION_PROPERTY_KEY.AUTONOMO_O_PERSONA_FISICA,
      valueType: "string",
    },
  ];
  static HAS_CESADO_ACTIVIDAD = [
    {
      key: QUESTION_PROPERTY_KEY.HAS_CESADO_ACTIVIDAD,
      valueType: "string",
    },
  ];
  static TIENES_TRABAJADORES = [
    {
      key: QUESTION_PROPERTY_KEY.TIENES_TRABAJADORES,
      valueType: "string",
    },
  ];
  static TIENES_BIENES_ACTIVOS = [
    {
      key: QUESTION_PROPERTY_KEY.TIENES_BIENES_ACTIVOS,
      valueType: "string",
    },
  ];
  static LISTADO_BIENES_ACTIVOS = [
    {
      key: QUESTION_PROPERTY_KEY.LISTADO_BIENES_ACTIVOS,
      valueType: "string",
    },
  ];
  static TITULAR_CUENTAS_BANCARIAS = [
    {
      key: QUESTION_PROPERTY_KEY.TITULAR_CUENTAS_BANCARIAS,
      valueType: "string",
    },
  ];
  static NUMEROS_CUENTAS_SALDO = [
    {
      title: "Banco",
      key: QUESTION_PROPERTY_KEY.NAME,
      valueType: "string",
    },
    {
      title: "IBAN",
      key: QUESTION_PROPERTY_KEY.IBAN,
      valueType: "string",
    },
    {
      title: "Saldo",
      key: QUESTION_PROPERTY_KEY.BALANCE,
      suffix: "€",
      valueType: "number",
    },
  ];
}
