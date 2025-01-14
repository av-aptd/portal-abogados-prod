export const getDocsPending = async (token: any, queryParams: any) => {
  const docsPending = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/admin/documents/status/pending?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).json();

  return docsPending;
};

export const getDocumentsType = async (token: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/documents/types`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const docsType = await response.json();
  return docsType;
};

export const uploadGeneratedDocument = async (
  token: any,
  processId: any,
  formData: any
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/files`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  return await response.json();
};

export const addRequiredDocument = async (
  token: any,
  processId: any,
  doctypeId: any
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/required-documents/${doctypeId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response;
};

export const deleteRequiredDocument = async (
  token: any,
  processId: any,
  doctypeId: any
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/required-documents/${doctypeId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response;
};

export const getBankflipSession = async (token: any, processId: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/documents/auto-request-documents/bankflip/session`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
};

export const syncBankflip = async (token: any, processId: any, dni: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/documents/auto-request-documents/bankflip/${dni}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
};
