import { usePortalStore } from "store/portal";

export const getDebTypes = async () => {
  const profile = usePortalStore.getState().profile;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/debt-types`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.token}`,
    },
  });

  return await res.json();
};

export const getUserCreditors = async (id: any) => {
  const profile = usePortalStore.getState().profile;

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/creditors/client/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
    }
  );

  return await resp.json();
};

export const getCreditors = async () => {
  const profile = usePortalStore.getState().profile;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/creditors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.token}`,
    },
  });
  return await res.json();
};

export const addUserCreditor = async (body: any) => {
  const profile = usePortalStore.getState().profile;

  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/creditors/client/${profile.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
      body: JSON.stringify(body),
    }
  );
};

export const addUserAPTDCreditor = async (body: any) => {
  const profile = usePortalStore.getState().profile;

  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/creditors/client/${body.clientId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
      body: JSON.stringify(body),
    }
  );
};

export const deleteUserCreditor = async (creditorId: any) => {
  const profile = usePortalStore.getState().profile;

  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/creditors/client/${profile.id}/${creditorId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
    }
  );
};

export const addAptdCreditor = async (body: any) => {
  const profile = usePortalStore.getState().profile;

  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/creditors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.token}`,
    },
    body: JSON.stringify(body),
  });
};

export const deleteAptdCreditor = async (creditorId: any) => {
  const profile = usePortalStore.getState().profile;

  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/creditors/${creditorId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.token}`,
    },
  });
};
