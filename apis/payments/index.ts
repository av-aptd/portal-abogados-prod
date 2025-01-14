import { usePortalStore } from "store/portal";

export const setPayments = async (payload: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/plan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return res.status;
};

export const getUserPayments = async (token: any, userId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/list?userId=${userId}`,
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

export const addPayment = async (payload: any, customerId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/customers/${customerId}/card-payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return await res.json();
};

export const addPaymentLink = async (payload: any, customerId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/customers/${customerId}/link-payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return await res.json();
};

export const addManualPayment = async (token: any, body: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};

export const getPaymentsSituation = async (token: any, queryParams: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/reports/payments-situation?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const users = await res.json();
  return users;
};

export const getPaymentMethods = async (token: any, customerId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/customers/${customerId}/payment-methods `,
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

export const addCreditCard = async (
  token: any,
  customerId: any,
  payload: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/customers/${customerId}/payment-methods `,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  return await res.json();
};

export const deleteCreditCard = async (
  token: any,
  customerId: any,
  paymentMethodId: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/customers/${customerId}/payment-methods/${paymentMethodId} `,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
};

export const setDefaultPaymentCreditCard = async (
  token: any,
  customerId: any,
  paymentMethodId: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/customers/${customerId}/payment-methods/${paymentMethodId} `,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        paymentMethodId,
        default: true,
      }),
    }
  );

  return await res.json();
};

export const clientCreationByPayment = async (
  customerId: any,
  payload: any,
  paymentMethod: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/customers/${customerId}/payment-methods/${paymentMethod}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return await res.json();
};

export const createPaymentLink = async (token: any, payload: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment-links`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  return await res.json();
};

export const sendPaymentLink = async (token: any, paymentLinkId: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment-links/${paymentLinkId}/send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
};

export const refundPayment = async ({ paymentId }: any) => {
  const profile = usePortalStore.getState().profile;

  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/refund/${paymentId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
    }
  );
};

export const cancelSubscription = async ({ stripeCustomerId }: any) => {
  const profile = usePortalStore.getState().profile;

  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/customers/${stripeCustomerId}/subscriptions`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
    }
  );
};

export const getPayCometCards = async () => {
  const profile = usePortalStore.getState().profile;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/paycomet/get-cards/${profile.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await res.json();
};

export const payCometCard = async (payload: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/paycomet/execute-payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return await res.json();
};

export const addCometCard = async (payload: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/paycomet/add-card`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return await res.json();
};

export const deleteCometCard = async (payload: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/paycomet/delete-card`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return res.status > 200 && res.status < 300;
};

export const getPaymentLinkPayComet = async (paymentLink: any) => {
  console.log("paymentLink:", paymentLink);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/payment/paycomet/execute-payment-link/${paymentLink}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await res.json();
};
