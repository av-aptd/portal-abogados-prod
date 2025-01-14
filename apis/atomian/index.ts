export const getAtomianNotifications = async (token: any, status: any) => {
  const notificationsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/webhooks/atomian?status=${status}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await notificationsResponse.json();
};

export const processNotification = async (token: any, id: any) => {
  const notiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/webhooks/atomian/${id}/launch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return notiResponse;
};

export const getAtomianDocs = async (token: any, id: any) => {
  const docsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/webhooks/atomian/${id}/files`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await docsResponse.json();
};

export const getAtomianNotification = async (token: any, id: any) => {
  const docsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/webhooks/atomian/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await docsResponse.json();
};

export const selectAtomianFile = async (
  token: any,
  notificationId: any,
  fileId: any
) => {
  const docsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/webhooks/atomian/${notificationId}/files/${fileId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await docsResponse.blob();
};

export const retryAtomianNotification = async (
  token: any,
  notificationId: any,
  body: any
) => {
  const notiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/webhooks/atomian/${notificationId}/retry`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
  return notiResponse;
};
