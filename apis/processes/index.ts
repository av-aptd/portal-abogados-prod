import { getSettingsSecure } from "shared/helpers";

export const getInfoParticipants = async (token: any, queryParams: any) => {
  const processInfo = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/search?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).json();
  return processInfo;
};

export const getProcessById = async (token: any, processId: any) => {
  const response = await await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const processInfo = await response.json();
  return processInfo;
};

export const getProcessParticipants = async (token: any, processId: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/participants`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const processInfo = await response.json();
  return processInfo;
};

export const getProcessInfo = async (token: any, processId: any) => {
  const options = getSettingsSecure("GET", token);

  const processInfo = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/status`,
      options
    )
  ).json();
  return processInfo;
};

export const getProcessInstallments = async (token: any, processId: any) => {
  const options = getSettingsSecure("GET", token);

  const processInfo = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/installments`,
      options
    )
  ).json();
  return processInfo;
};

export const getDocsToValidate = async (token: any, processId: any) => {
  const options = getSettingsSecure("GET", token);

  const docsToValidate = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/documents`,
      options
    )
  ).json();
  return docsToValidate;
};

export const getBalance = async (token: any, userId: any) => {
  const options = getSettingsSecure("GET", token);
  const Balance = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${userId}/balance`,
      options
    )
  ).json();
  return Balance;
};

export const setStatusDocument = async (
  token: any,
  processId: any,
  documentId: any,
  body: any
) => {
  const options = getSettingsSecure("PUT", token, body);

  const setStatus = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/documents/${documentId}/status`,
      options
    )
  ).json();
  return setStatus;
};

export const deleteDocument = async (
  token: any,
  processId: any,
  documentId: any
) => {
  const options = getSettingsSecure("DELETE", token);

  await await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/documents/${documentId}`,
    options
  );
};

export const getDocumentDetails = async (
  token: any,
  processId: any,
  documentId: any
) => {
  const options = getSettingsSecure("GET", token);

  const docDetail = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/documents/${documentId}/info`,
      options
    )
  ).json();
  return docDetail;
};

export const processesByUserId = async (token: any, id: any) => {
  const docsToShow = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes?userId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).json();
  return docsToShow;
};

export const requiredDocsByProcessId = async (
  token: any,
  id: any,
  body: any
) => {
  const docsRequired = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${id}/required-documents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      }
    )
  ).json();
  return docsRequired;
};

export const getRequiredDocsByProcessId = async (token: any, id: any) => {
  const docs = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${id}/required-documents`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).json();
  return docs;
};

export const requiredDocsByProcessIdAsAdmin = async (
  token: any,
  processId: any
) => {
  const docsRequired = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/required-documents`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).json();
  return docsRequired;
};

export const statusRequiredDocsByProcessId = async (token: any, id: any) => {
  const status = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${id}/required-documents/status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).json();
  return status;
};

export const downloadDocById = async (
  token: any,
  processId: any,
  docId: any
) => {
  const docToDownload = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/documents/${docId}?token=${token}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "access-control-expose-headers": "*",
      },
    }
  );
  //get headers

  const blob = await docToDownload.blob();

  return {
    data: blob,
    name: String(docToDownload.headers.get("name")),
  };
};

export const uploadDocByProcessId = async (
  token: any,
  processId: any,
  body: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/files`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    }
  );
  return await res.json();
};

export const changePlan = async (token: any, processId: any, body: any) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/change-plan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
};

export const getAnnotationsByProcess = async (token: any, processId: any) => {
  const anotations = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).json();
  return anotations;
};

export const getAnnotationByProcessId = async (
  token: any,
  processId: any,
  commentId: any
) => {
  const anotations = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/comments/${commentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).json();
  return anotations;
};

export const addAnnotationToProcess = async (
  token: any,
  processId: any,
  body: any
) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
};

export const editAnnotationToProcess = async (
  token: any,
  processId: any,
  commentId: any,
  body: any
) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/comments/${commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
};
