import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { usePortalStore } from "store/portal";

export const AddPaymentForm = (clientSecret: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const setPaymentComplete = usePortalStore(
    (state) => state.setPaymentComplete
  );

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  let response: any = null;

  console.log("clientSecret", clientSecret);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    response = await stripe.confirmCardPayment(clientSecret.clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement)!,
      },
    });

    if (response.paymentIntent?.status === "succeeded") {
      queryClient.invalidateQueries({
        queryKey: ["payments", "processes", "paymentInfo"],
      });
      setPaymentComplete();
    }

    setIsLoading(false);
  };

  const handleChange = async (event: any) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-4 rounded-lg border border-gray-300">
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="bg-secondary py-2 px-8 text-white mt-8 rounded-lg text-sm"
      >
        {!isLoading ? "Hacer pago" : "Pagando..."}
      </button>

      {error && (
        <div id="payment-message" className="text-sm pt-4 text-red-400">
          {error}
        </div>
      )}
    </form>
  );
};
