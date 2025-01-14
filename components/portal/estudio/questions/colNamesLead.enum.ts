import { LEAD_QUESTION_PROPERTY_KEY } from "enums/questionLeadPropertyKey.enum";

export class LEAD_COLUMNS_DISPLAY {
  static DATOS_INICIALES = [
    {
      title: "Nombre",
      key: LEAD_QUESTION_PROPERTY_KEY.NAME,
    },
    {
      title: "Apellido",
      key: LEAD_QUESTION_PROPERTY_KEY.SURNAME,
    },
    {
      title: "Email",
      key: LEAD_QUESTION_PROPERTY_KEY.EMAIL,
    },
    {
      title: "Teléfono",
      key: LEAD_QUESTION_PROPERTY_KEY.PHONE,
    },
  ];
  static DOS_O_MAS_DEUDAS = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.DOS_O_MAS_DEUDAS,
    },
  ];
  static CORRIENTE_PAGO = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.CORRIENTE_PAGOS,
    },
  ];
  static PODRAS_PAGARLAS = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.PODRAS_PAGARLAS,
    },
  ];
  static DESTINO_DEUDAS = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.PODRAS_PAGARLAS,
    },
  ];
  static DESDE_CUANDO_NO_PAGAS = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.DESDE_CUANDO_NO_PAGAS,
    },
  ];
  static TIENES_ANTECEDENTES = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.TIENES_ANTECEDENTES,
    },
  ];
  static HAS_CUMPLIDO_LA_PENA = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.HAS_CUMPLIDO_LA_PENA,
    },
  ];
  static TIENES_INFRACCIONES = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.TIENES_INFRACCIONES,
    },
  ];
  static TIENES_ESTUDIOS = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.TIENES_ESTUDIOS,
    },
  ];
  static IMPORTE_GLOBAL_DEUDAS = [
    {
      key: LEAD_QUESTION_PROPERTY_KEY.IMPORTE_GLOBAL_DEUDAS,
      suffix: "€",
    },
  ];
  static COMPARTES_TUS_DEUDAS = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.COMPARTES_TUS_DEUDAS,
    },
  ];
  static INGRESOS_PAREJA = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.INGRESOS_PAREJA,
    },
  ];
  static CUANTAS_PERSONAS = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.CUANTAS_PERSONAS,
    },
  ];
  static HIPOTECA_O_ALQUILER = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.HIPOTECA_O_ALQUILER,
    },
  ];
  static CUANTO_PAGAS_ALQUILER = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.CUANTO_PAGAS_ALQUILER,
    },
  ];
  static CUANTO_PAGAS_HIPOTECA = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.CUANTO_PAGAS_HIPOTECA,
    },
  ];
  static CUANTO_TE_FALTA_POR_PAGAR = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.CUANTO_TE_FALTA_POR_PAGAR,
    },
  ];
  static CUOTAS_HIPOTECA_AL_DIA = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.CUOTAS_HIPOTECA_AL_DIA,
    },
  ];
  static GASTOS_TOTALES = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.GASTOS_TOTALES,
    },
  ];
  static CUANTO_DE_CUOTAS = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.CUANTO_DE_CUOTAS,
    },
  ];
  static CUANTO_VALE_VIVIENDA = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.CUANTO_VALE_VIVIENDA,
    },
  ];
  static TIENES_OTROS_BIENES = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.TIENES_OTROS_BIENES,
    },
  ];
  static VALOR_OTROS_BIENES = [
    {
      title: "",
      key: LEAD_QUESTION_PROPERTY_KEY.VALOR_OTROS_BIENES,
    },
  ];
}
//   static CAMBIO_EMPADRONAMIENTO = [
//     {
//       title: "",
//       key: LEAD_QUESTION_PROPERTY_KEY.CAMBIADO_EMPADRONAMIENTO,
//     },
//   ];
//   static INGRESOS_MENSUALES = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.INGRESOS_MENSUALES,
//       suffix: "€",
//     },
//   ];
//   static TIPO_INGRESO = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.TIPO_INGRESO,
//     },
//   ];
//   static GASTOS_VIVIENDA = [
//     {
//       title: "tipo vivienda",
//       key: LEAD_QUESTION_PROPERTY_KEY.TIPO_VIVIENDA,
//     },
//     {
//       title: "Coste vivienda",
//       key: LEAD_QUESTION_PROPERTY_KEY.COSTE_VIVIENDA,
//       suffix: "€",
//     },
//   ];
//   static GASTOS_MENSUALES = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.GASTOS_MENSUALES,
//       suffix: "€",
//     },
//   ];
//   static TIPO_GASTOS = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.TIPO_GASTOS,
//     },
//   ];
//   static TIPO_ACTIVIDAD = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.TIPO_ACTIVIDAD,
//     },
//   ];
//   static ACTIVIDAD_ULTIMOS = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.ACTIVIDAD_ULTIMOS,
//     },
//   ];
//   static TIPO_INSOLVENCIA = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.TIPO_INSOLVENCIA,
//     },
//   ];
//   static MOTIVO_INSOLVENCIA = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.MOTIVO_INSOLVENCIA,
//     },
//   ];
//   static ESTADO_CIVIL = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.ESTADO_CIVIL,
//     },
//   ];
//   static DATOS_CONYUGE = [
//     {
//       title: "Nombre",
//       key: LEAD_QUESTION_PROPERTY_KEY.NAME,
//     },
//     {
//       title: "Apellido",
//       key: LEAD_QUESTION_PROPERTY_KEY.SURNAME,
//     },
//     {
//       title: "DNI",
//       key: LEAD_QUESTION_PROPERTY_KEY.DNI,
//     },
//     {
//       title: "Email",
//       key: LEAD_QUESTION_PROPERTY_KEY.EMAIL,
//     },
//     {
//       title: "Teléfono",
//       key: LEAD_QUESTION_PROPERTY_KEY.PHONE,
//     },
//   ];
//   static FECHA_MATRIMONIO = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.FECHA_MATRIMONIO,
//     },
//   ];
//   static REGIMEN_ECONOMICO = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.REGIMEN_ECONOMICO,
//     },
//   ];
//   static MEDIDAS_REGULADORAS = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.MEDIDAS_REGULADORAS,
//     },
//   ];
//   static DATOS_PAREJA = [
//     {
//       title: "Nombre",
//       key: LEAD_QUESTION_PROPERTY_KEY.NAME,
//     },
//     {
//       title: "Apellido",
//       key: LEAD_QUESTION_PROPERTY_KEY.SURNAME,
//     },
//     {
//       title: "Email",
//       key: LEAD_QUESTION_PROPERTY_KEY.EMAIL,
//     },
//     {
//       title: "Teléfono",
//       key: LEAD_QUESTION_PROPERTY_KEY.PHONE,
//     },
//     {
//       title: "DNI",
//       key: LEAD_QUESTION_PROPERTY_KEY.DNI,
//     },
//   ];
//   static INSCRITA_PAREJA_REGISTRO_CIVIL = [
//     {
//       title: "",
//       key: LEAD_QUESTION_PROPERTY_KEY.INSCRITA_PAREJA_REGISTRO_CIVIL,
//     },
//   ];
//   static FECHA_INSCRIPCION = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.FECHA_INSCRIPCION,
//     },
//   ];
//   static CUANTAS_PERSONAS_DEPENDEN_DE_TI = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.CUANTAS_PERSONAS_DEPENDEN_DE_TI,
//     },
//   ];
//   static PERSONAS_DEPENDIENTES = [
//     {
//       title: "Nombre",
//       key: LEAD_QUESTION_PROPERTY_KEY.NAME,
//     },
//     {
//       title: "Apellido",
//       key: LEAD_QUESTION_PROPERTY_KEY.SURNAME,
//     },
//     {
//       title: "Edad",
//       key: LEAD_QUESTION_PROPERTY_KEY.AGE,
//       suffix: " años",
//     },
//   ];
//   static PLANTILLA_TRABAJADORES = [
//     {
//       title: "Nombre",
//       key: LEAD_QUESTION_PROPERTY_KEY.NAME,
//       sufix: "",
//     },
//     {
//       title: "Apellido",
//       key: LEAD_QUESTION_PROPERTY_KEY.SURNAME,
//       sufix: "",
//     },
//     {
//       title: "Email",
//       key: LEAD_QUESTION_PROPERTY_KEY.EMAIL,
//       sufix: "",
//     },
//     {
//       title: "Teléfono",
//       key: LEAD_QUESTION_PROPERTY_KEY.PHONE,
//       sufix: "",
//     },
//     {
//       title: "Salario",
//       key: LEAD_QUESTION_PROPERTY_KEY.SALARY,
//       suffix: "€",
//     },
//   ];
//   static COPROPIETARIOS_VIVIENDA_HABITUAL = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.COPROPIETARIOS_VIVIENDA_HABITUAL,
//     },
//   ];
//   static AUTONOMO_O_PERSONA_FISICA = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.AUTONOMO_O_PERSONA_FISICA,
//     },
//   ];
//   static HAS_CESADO_ACTIVIDAD = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.HAS_CESADO_ACTIVIDAD,
//     },
//   ];
//   static TIENES_TRABAJADORES = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.TIENES_TRABAJADORES,
//     },
//   ];
//   static TIENES_BIENES_ACTIVOS = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.TIENES_BIENES_ACTIVOS,
//     },
//   ];
//   static LISTADO_BIENES_ACTIVOS = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.LISTADO_BIENES_ACTIVOS,
//     },
//   ];
//   static TITULAR_CUENTAS_BANCARIAS = [
//     {
//       key: LEAD_QUESTION_PROPERTY_KEY.TITULAR_CUENTAS_BANCARIAS,
//     },
//   ];
//   static NUMEROS_CUENTAS_SALDO = [
//     {
//       title: "Banco",
//       key: LEAD_QUESTION_PROPERTY_KEY.NAME,
//     },
//     {
//       title: "IBAN",
//       key: LEAD_QUESTION_PROPERTY_KEY.IBAN,
//     },
//     {
//       title: "Saldo",
//       key: LEAD_QUESTION_PROPERTY_KEY.BALANCE,
//       suffix: "€",
//     },
//   ];
