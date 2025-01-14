import { usePortalStore } from "store/portal";

export const getNotificationsUser = async (userId: any, token: any) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/web-notification?userId=${userId}`,
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

export const setReadNotification = async (notification: any, profile: any) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/web-notification/${notification.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
      body: JSON.stringify({
        userId: profile.id,
        message: notification.message,
        id: notification.id,
        isRead: true,
        notificationType: "WEB-NOTIFICATION",
      }),
    }
  );

  return await resp.json();
};

export const sendPushNotification = async (userId: any, payload: any) => {
  const profile = usePortalStore.getState().profile;

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/push-notification/users/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
      body: JSON.stringify({
        title: payload.title,
        message: payload.body,
        data: payload.data,
      }),
    }
  );

  return resp;
};

export const sendEmailNotification = async (
  user: any,
  owner: any,
  payload: any
) => {
  const profile = usePortalStore.getState().profile;

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/email-notification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
      body: JSON.stringify({
        templateAlias: "email-notification",
        templateModel: {
          subject: payload.title,
          name: user?.name,
          owner,
          message: payload.content,
        },
        From: "noreply@abogadosparatusdeudas.es",
        To: user?.emailaddress,
        messageStream: "outbound",
      }),
    }
  );

  return resp;
};

export const sendRejectEmailNotification = async (
  user: any,
  owner: any,
  payload: any
) => {
  const profile = usePortalStore.getState().profile;

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/email-notification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
      body: JSON.stringify({
        templateAlias: "reject-document",
        templateModel: {
          subject: payload.title,
          name: user?.name,
          owner,
          message: payload.content,
        },
        From: "noreply@abogadosparatusdeudas.es",
        To: user?.emailaddress,
        messageStream: "outbound",
      }),
    }
  );

  return resp;
};

export const sendAllPushNotification = async (payload: any) => {
  const profile = usePortalStore.getState().profile;

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/push-notification/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
      body: JSON.stringify({
        title: payload.title,
        message: payload.body,
        data: payload.data,
      }),
    }
  );

  return resp;
};

export const sendWebNotification = async (userId: any, payload: any) => {
  const profile = usePortalStore.getState().profile;

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/web-notification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
      body: JSON.stringify({
        userId: userId,
        message: payload.message,
        notificationType: "WEB-NOTIFICATION",
      }),
    }
  );

  return resp;
};
