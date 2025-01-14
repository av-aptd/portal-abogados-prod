export const logUser = async (infoUser: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: infoUser.email,
      password: infoUser.password,
    }),
  });
  return res;
};

export const getProfile = async (userId: any, token: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
};

export const changePassword = async (email: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/auth/request-change-password?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};

export const getVerificationCode = async (email: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/auth/request-change-password-with-code?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};

export const verifyPhoneCode = async (email: any, code: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/auth/verify-code?email=${email}&code=${code}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.status === 200;
};

export const changePasswordWithCode = async (
  email: any,
  password: any,
  code: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/auth/change-password-with-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code,
        password,
      }),
    }
  );
  return await res.json();
};

export const verifyIfEmailExists = async (email: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/auth/verify-code?email=${email}}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.status === 200;
};

export const loginImpersonate = async (userId: any, token: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/auth/impersonate/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return await res.json();
};
