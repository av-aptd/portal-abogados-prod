export const getSubscriptionsByProcess = async (token: any, processId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processId}/subscriptions`,
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

export const getSubscriptions = async (token: any, category: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/pricing/${category}/subscriptions`,
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

export const createSubscription = async ({
  token,
  processId,
  customerStripeId,
  planId,
}: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/customers/${customerStripeId}/payment-methods/subscription/${processId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        customerStripeId,
        planId,
      }),
    }
  );

  return await res.json();
};
