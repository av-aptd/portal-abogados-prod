export const getPlans = async (token: any, queryParams: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/pricing/admin/list?${queryParams}`,
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

export const getPlanById = async (token: any, planId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/pricing/${planId}`,
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

export const getPrincingsPlan = async (type: any, debtValue: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/pricing?category=${type}&debt=${debtValue}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await res.json();
};

export const addPlan = async (token: any, payload: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/pricing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const editPlan = async (token: any, payload: any, pricingId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/pricing/${pricingId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );
};
