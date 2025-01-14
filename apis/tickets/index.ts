export const getAllTickets = async (token: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
};

export const getTickets = async (token: any, queryParams: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/my-tickets?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
};

export const getTicketById = async (token: any, ticketId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/${ticketId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
};

export const addTicketAttachment = async (token: any, body: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/attachments/upload`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  return await res.json();
};

export const createTicket = async (token: any, body: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  return await res.json();
};

export const editTicketById = async (token: any, body: any, ticketId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/${ticketId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  return await res.json();
};

export const uploadAttachment = async (token: any, formData: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/attachments/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  return await res.json();
};

export const downloadAttachmentById = async (
  token: any,
  ticketId: any,
  attachmentId: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/${ticketId}/attachments/${attachmentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "access-control-expose-headers": "*",
      },
    }
  );
  const blob = await res.blob();

  return {
    data: blob,
    name: String(res.headers.get("name")),
  };
};

export const getTasksByTicket = async (token: any, ticketId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/${ticketId}/tasks`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
};

export const createTaskToTicket = async (
  token: any,
  ticketId: any,
  body: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/${ticketId}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  return res;
};

export const editTicketTask = async (
  token: any,
  body: any,
  ticketId: any,
  taskId: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/${ticketId}/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  return await res.json();
};

export const deleteTicketTask = async (
  token: any,
  ticketId: any,
  taskId: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/agile/tickets/${ticketId}/tasks/${taskId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
};
