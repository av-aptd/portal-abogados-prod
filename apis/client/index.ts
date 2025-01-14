export const getProfile = async (token: any, userId: any) => {
  const responseUser = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const user = await responseUser.json();
  return user;
};

export const getInfoUser = async (token: any, userId: any) => {
  const responsePropertyUser = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${userId}/properties-info`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const userProperties = await responsePropertyUser.json();
  return userProperties;
};

export const getUserProcesses = async (token: any, userId: any) => {
  const responseUser = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const user = await responseUser.json();
  return user;
};

export const getProfilesCompleted = async (token: any, queryParams: any) => {
  const responseUsersCompleted = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const profilesCompleted = await responseUsersCompleted.json();
  return profilesCompleted;
};

export const getUserCreditors = async (token: any, id: any) => {
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

export const getLeadEstudioEconomico = async (email: any) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/leads/recover-survey/LSO?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return resp;
};

export const getUserInitialQuestions = async (token: any, id: any) => {
  const responsePropertyUser = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${id}/properties-info`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await responsePropertyUser.json();
};

export const getParticipants = async (token: any, ProcessId: any) => {
  const responseParticipants = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${ProcessId}/participants`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await responseParticipants.json();
};

export const getClientAddress = async (token: any, clientId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${clientId}/addresses`,
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

export const addClientAddress = async (
  token: any,
  clientId: any,
  data: any
) => {
  const responseParticipants = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${clientId}/addresses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address: data.address,
        zip: data.zip,
        city: data.city,
        province: data.province,
      }),
    }
  );
  return await responseParticipants.json();
};

export const editClientAddress = async (
  token: any,
  clientId: any,
  addressId: any,
  data: any
) => {
  const responseParticipants = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${clientId}/addresses/${addressId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address: data.address,
        zip: data.zip,
        city: data.city,
        province: data.province,
      }),
    }
  );
  return await responseParticipants.json();
};

export const editClientData = async (token: any, clientId: any, body: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${clientId}`,
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

export const changeEmail = async (token: any, clientId: any, body: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/auth/${clientId}/change-email`,
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

export const setProfileCompleted = async (token: any, userId: any) => {
  const responseUser = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${userId}/profile`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isProfileCompleted: true }),
    }
  );
  const user = await responseUser.json();
  return user;
};
