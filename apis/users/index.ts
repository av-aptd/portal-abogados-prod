export const getUsers = async (token: any, queryParams: any) => {
  const responseUser = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const users = await responseUser.json();
  return users;
};

export const getUserById = async (token: any, userId: any) => {
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
  const users = await responseUser.json();
  return users;
};

export const getListGroups = async (token: any) => {
  const responseGroups = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/groups`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const groups = await responseGroups.json();
  return groups;
};

export const getListRoles = async (token: any) => {
  const responseRoles = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/roles`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const roles = await responseRoles.json();
  return roles;
};

export const getUserGroups = async (token: any, userId: any) => {
  const responseUser = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${userId}/groups`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const userGroups = await responseUser.json();
  return userGroups;
};

export const createUser = async (token: any, body: any) => {
  const responseUser = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
  const users = await responseUser.json();
  return users;
};

export const editUser = async (token: any, body: any, userId: any) => {
  const responseUser = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
  const users = await responseUser.json();
  return users;
};

export const uploadAvatarUser = async (token: any, body: any) => {
  const responseAvatar = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/avatars`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    }
  );
  const url = await responseAvatar.json();
  return url;
};
