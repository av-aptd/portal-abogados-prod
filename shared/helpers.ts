import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { QUESTION_PROPERTY_KEY } from "enums/questionClientPropertyKey.enum";
import { LEAD_QUESTION_PROPERTY_KEY } from "enums/questionLeadPropertyKey.enum";
import { LEAD_QUESTIONS_GROUP_KEY } from "enums/questionsLeadGroupKey.enum";
import { propertiesMap } from "./dictionaries/propertyDict";

export const getRoles = (links: any, roles: any) => {
  for (let i in links) {
    if (roles?.includes(links[i])) {
      return true;
    }
  }
};

export const chekRoles = (roles: any, role: any) => {
  if (roles?.includes(role)) {
    return true;
  }
};

export function formatDate(date: any, type: any, lang: any) {
  let options: any = {};

  if (type === "noYear") {
    options = {
      month: "long",
      day: "numeric",
      weekday: "long",
    };
  }

  if (type === "short") {
    options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
  }

  if (type === "medium") {
    options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  }

  if (type === "long") {
    options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  }
  return new Date(date).toLocaleDateString(lang, options);
}

export function formatDateShort(date: any, lang: any) {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(lang, options);
}

export function formatTime(date: any, lang: any) {
  const options: any = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleTimeString(lang, options);
}

export function getToken() {
  return window.localStorage.getItem("@UserToken");
}

export function getSettings(method: string, body?: any) {
  let settings = {
    method,
    headers: { "Content-Type": "application/json" },
    body,
  };
  return settings;
}

export function getSettingsSecure(method: string, token: any, body?: any) {
  let settings = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  };
  return settings;
}

export function getSettingsSecureDocument(
  method: string,
  token: any,
  body?: any
) {
  let settings = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  };
  return settings;
}

export enum QUESTION_OPERATORS {
  EQUALS = "EQUALS",
  NOT_EQUALS = "NOT_EQUALS",
  STARTS_WITH = "STARTS_WITH",
  GREATER_THAN = "GREATER_THAN",
  GREATER_THAN_OR_EQUALS = "GREATER_THAN_OR_EQUALS",
}

export function getQuestionClient(
  clientInfo: any,
  groupkey: QUESTIONS_GROUP_KEY | string,
  operator: QUESTION_OPERATORS = QUESTION_OPERATORS.EQUALS
) {
  try {
    switch (operator) {
      case QUESTION_OPERATORS.EQUALS:
        if (
          clientInfo.filter((item: any) => item.groupKey == groupkey).length > 0
        ) {
          return clientInfo.filter((item: any) => item.groupKey === groupkey);
        } else {
          return [];
        }
      case QUESTION_OPERATORS.STARTS_WITH:
        if (
          clientInfo.filter((item: any) =>
            String(item.groupKey).startsWith(groupkey)
          ).length > 0
        ) {
          return clientInfo.filter((item: any) =>
            String(item.groupKey).startsWith(groupkey)
          );
        } else {
          return [];
        }
      default:
        return [];
    }
  } catch {
    return [];
  }
}

export function getQuestionLead(
  questions: any,
  groupkey: LEAD_QUESTIONS_GROUP_KEY | string,
  operator: QUESTION_OPERATORS = QUESTION_OPERATORS.EQUALS
) {
  try {
    switch (operator) {
      case QUESTION_OPERATORS.EQUALS:
        if (
          questions.filter((item: any) => item.questionKey == groupkey).length >
          0
        ) {
          return questions.filter((item: any) => item.questionKey === groupkey);
        } else {
          return [];
        }
      case QUESTION_OPERATORS.STARTS_WITH:
        if (
          questions.filter((item: any) =>
            String(item.questionKey).startsWith(groupkey)
          ).length > 0
        ) {
          return questions.filter((item: any) =>
            String(item.questionKey).startsWith(groupkey)
          );
        } else {
          return [];
        }
      default:
        return [];
    }
  } catch {
    return [];
  }
}

export function getPropertiesQuestionClient(
  propertyKey: QUESTION_PROPERTY_KEY,
  questionProperties: any[] | any
) {
  if (!Array.isArray(questionProperties)) {
    questionProperties = Object.values(questionProperties);
  }

  try {
    return questionProperties.filter(
      (item: any) => item.propertyKey === propertyKey
    );
  } catch {
    return [];
  }
}

export function getPropertiesQuestionLead(
  propertyKey: LEAD_QUESTIONS_GROUP_KEY,
  questionProperties: any[]
) {
  console.log("propertyKey:", propertyKey);

  try {
    return questionProperties.filter(
      (item: any) => item.propertyKey === propertyKey
    );
  } catch {
    return [];
  }
}

export function getPropertyAnswerLead(
  propertyKey: LEAD_QUESTIONS_GROUP_KEY,
  answerProperties: any[] | any
) {
  if (!Array.isArray(answerProperties)) {
    answerProperties = Object.values(answerProperties);
  }
  let res: any = [];
  try {
    res = answerProperties.filter(
      (item: any) => item.propertyKey === propertyKey
    );
    if (res.length == 0) {
      res.push({
        propertyValue: answerProperties.find(
          (p: any) => p.propertyKey == "default"
        ).propertyValue,
      });
    }
  } catch {
    return [];
  }

  return res;
}

export function getPropertyValueMap(
  propertyValue: string,
  groupKey: string = "",
  dict: any[] = []
) {
  if (dict.length == 0) {
    dict = propertiesMap;
  }

  if (groupKey != "") {
    propertyValue = groupKey + "_" + propertyValue;
  }
  const property = dict.find((item) => item.propertyValue === propertyValue);
  if (property?.propertyLabel === undefined) {
    propertyValue = propertyValue.replace(groupKey + "_", "");
  }

  return property?.propertyLabel || propertyValue;
}

const getUserCreditors = async (token: any, id: any) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/creditors/client/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await resp.json();
};

export async function infoForDocuments(clientInfo: any, token: any, id: any) {
  let documentsToUpload: any = [];
  let documentsToUploadObj: any = {};

  const tipoVivienda = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.GASTOS_VIVIENDA
  )[0].properties.filter((item: any) => item.propertyKey == "tipoVivienda")[0]
    .propertyValue;

  const tipoIngreso = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.TIPO_INGRESOS
  )[0].properties.filter((item: any) => item.propertyKey == "tipoIngreso")[0]
    .propertyValue;

  documentsToUpload.push({
    tipoIngreso: tipoIngreso,
  });

  if (tipoVivienda == "hipoteca") {
    documentsToUpload.push({
      hasMorgage: true,
    });
  }

  const tengoCuentas = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.TITULAR_CUENTAS_BANCARIAS
  )[0].properties.filter(
    (item: any) => item.propertyKey == "eresTitularDeCuentasBancarias"
  )[0].propertyValue;

  if (tengoCuentas == "yes") {
    documentsToUpload.push({
      hasBankAccounts: true,
    });
  }

  const creditors = await getUserCreditors(token, id);

  if (creditors.length > 0) {
    if (
      creditors.some((item: any) => item.debtStatus == "Deuda judicializada")
    ) {
      documentsToUpload.push({
        hasLawsuits: true,
      });
    }
  }

  const getPropertiesValues = (value: any) => {
    const obj = JSON.parse(value);
    let propertiesValues: any[] = [];

    Object.keys(obj).map((key) => {
      propertiesValues.push({ propertyKey: key, propertyValue: obj[key] });
    });

    return propertiesValues;
  };

  const tengoBienes = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.TIENES_BIENES_ACTIVOS
  )[0].properties.filter(
    (item: any) => item.propertyKey == "tienesBienesActivos"
  )[0].propertyValue;

  let tieneInmueble = false;

  if (tengoBienes == "yes") {
    const listadoActivos = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.ACTIVOS_QUE_POSEES,
      QUESTION_OPERATORS.STARTS_WITH
    );

    let tieneCoche = false;

    listadoActivos.forEach((item: any) => {
      const propertiesValues = getPropertiesValues(
        item.properties[0].propertyValue
      );

      if (propertiesValues.some((item: any) => item.propertyValue == "Coche")) {
        tieneCoche = true;
      }

      if (
        propertiesValues.some(
          (item: any) =>
            item.propertyValue == "Vivienda habitual" ||
            item.propertyValue == "Segunda vivienda" ||
            item.propertyValue == "Local" ||
            item.propertyValue == "Suelo" ||
            item.propertyValue == "Parking"
        )
      ) {
        console.log("entro que no tengo");
        tieneInmueble = false;
      }
    });

    if (tieneCoche) {
      documentsToUpload.push({
        hasVehicle: true,
      });
    }

    if (tieneInmueble) {
      documentsToUpload.push({
        hasInmuebles: true,
      });
    } else {
      documentsToUpload.push({
        hasInmuebles: false,
      });
    }
  }

  console.log("documentsToUpload:", documentsToUpload);

  documentsToUpload.forEach((element: any) => {
    Object.keys(element).forEach((key: any) => {
      if (element[key] == true) {
        documentsToUploadObj[key] = true;
      }
    });
  });

  console.log("documentsToUploadObj:", documentsToUploadObj);

  return documentsToUploadObj;
}

export const getPropertyValue = (propertyKey: string, json: string): string => {
  return JSON.parse(json)[propertyKey];
};

export const typeTicket = [
  {
    id: 1,
    name: "Fallo portal",
  },
  {
    id: 2,
    name: "Mejora portal",
  },
  {
    id: 3,
    name: "Incidencia expediente",
  },
];
export const ticketStates = [
  "open",
  "closed",
  "in progress",
  "rejected",
  "resolved",
];
export const nameTicketState = (state: string) => {
  switch (state) {
    case "open":
      return "Abierto";
    case "in progress":
      return "En revisión";
    case "closed":
      return "Cerrado";
    case "resolved":
      return "Resuelto";
    case "rejected":
      return "Rechazado";
  }
};

export const showImpersonate = (profile: any) => {
  if (profile.email) {
    return process.env.NEXT_PUBLIC_ALLOW_IMPERSONATE_EMAILS?.toLowerCase().includes(
      profile.email.toLowerCase()
    );
  }
  return false;
};

export const isAPTDTenant = (tenants: any) => {
  tenants = tenants.filter(
    (tenant: any) => tenant.name == "Abogados para tus deudas"
  );

  if (tenants.length > 0) {
    return true;
  }

  return false;
};

export const getTenantName = ({ tenantId, tenants }: any) => {
  const tenant = tenants.find((tenant: any) => tenant.id === tenantId);
  return tenant.name;
};
