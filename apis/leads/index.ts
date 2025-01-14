import { usePortalStore } from "store/portal";

export const getLeads = async (queryParams: any) => {
  const token = usePortalStore.getState().profile.token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/leads?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const leads = await res.json();
  return leads;
};

export const getTranscription = async (idCall: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/qa/calls/${idCall}/transcript`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
  const data = await res.json();
  return data;
};

export const uploadDocumentLead = async (formData: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/leads/documents/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  return response;
};

export const recoverLeadSurvey = async (type: string, email: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/leads/recover-survey/${type}?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

export const sendEmailToLead = async (body: any, token: any) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/email-notification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        templateAlias: "seleccionar-plan",
        templateModel: {
          subject: "Finaliza tu contrato ahora",
          message: body.message,
        },
        From: "noreply@abogadosparatusdeudas.es",
        To: body.email,
        messageStream: "outbound",
      }),
    }
  );

  return resp;
};

export const sendHojaEncargoToLead = async (body: any, token: any) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/email-notification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        templateAlias: "firmar-hoja-encargo",
        templateModel: {
          subject: "Firmar la hoja de encargo",
          message: body.message,
        },
        From: "noreply@abogadosparatusdeudas.es",
        To: body.email,
        messageStream: "outbound",
      }),
    }
  );

  return resp;
};

export const getStripeCustomerId = async (body: any, userId: any) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/customers?userId=${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return await resp.json();
};

export const getClientSecret = async (
  client: any,
  planId: any,
  authId: any,
  paymentMethod: any = "card"
) => {
  const resp2 = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/customers/${client.stripeCustomerId}/payment-methods/${paymentMethod}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerStripeId: client.stripeCustomerId,
        planId: planId,
        comercialId: authId,
      }),
    }
  );

  return await resp2.json();
};

export const getLeadbyId = async (id: any, token: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/leads/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getLeadSurvey = async (email: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/leads/recover-survey/LSO?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
};

export const validateLeadByEmail = async (email: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/leads/validation/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
};

export const setInitialLead = async (body: any) => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  return await resp.json();
};

export const createStripeCustomerId = async (lead: any) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/customers/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: lead.email,
        dni: lead.dni,
        address: {
          street: "",
          city: "",
          state: "",
          zip: "",
        },
      }),
    }
  );

  return await resp.json();
};

export const editLead = async (body: any, leadId: any) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/leads/${leadId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return await resp.json();
};

export const deleteLead = async ({ surveyId }: any) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/leads/delete-survey/${surveyId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await resp.json();
};
