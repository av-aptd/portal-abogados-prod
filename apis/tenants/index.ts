export const getTenants = async (token: any) => {
  const responseUser = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/tenants`,
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
