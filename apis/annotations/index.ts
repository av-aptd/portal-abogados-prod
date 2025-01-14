export const getUserAnnotations = async (token: any, processId: any) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/annotations`,
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
