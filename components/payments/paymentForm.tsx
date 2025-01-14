import React, { StrictMode, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import clsx from "clsx";

// import { profileStore } from "../../stores/profileStore";
import { Check } from "../icons";
import { useEstudioStore } from "store/estudio";
import { useRouter } from "next/router";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const lead = useEstudioStore((state) => state.lead);
  const planId = useEstudioStore((state) => state.planId);

  const [isLoading, setIsLoading] = useState(false);
  //   const subscription = profileStore((state) => state.subscription);
  //   const profile = profileStore((state) => state.profile);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  //   const setPaymentIntent = profileStore((state) => state.setPaymentIntent);
  //   const paymentIntent = profileStore((state) => state.paymentIntent);
  const [paymentIntent, setPaymentIntent] = useState(false);
  let response: any = null;
  let response2: any = null;

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

    // response = await stripe.confirmCardSetup(lead.clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement)!,
    //     billing_details: {
    //       name: lead.name,
    //       email: lead.email,
    //     },
    //   },
    // });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/payment/create-subscription`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stripeCustomerId: lead.stripeCustomerId,
          planId: planId,
        }),
      }
    );

    const data = await res.json();

    if (data.clientSecret) {
      response2 = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement)!,
        },
        receipt_email: lead.email,
      });

      if (response2.paymentIntent?.status === "succeeded") {
        setPaymentIntent(true);
        router.push("/planes/finalizar");
      }
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
    <div>
      <div className="px-8">
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-4 rounded-lg border border-gray-300">
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
          </div>

          {!paymentIntent ? (
            <button
              type="submit"
              disabled={isLoading || !stripe || !elements}
              className="bg-primary py-2 px-8 text-white mt-8 rounded-lg text-sm"
            >
              {!isLoading ? "Hacer pago" : "Pagando..."}
            </button>
          ) : (
            <div className="pt-4 flex items-center space-x-3">
              <Check className="w-4 h-4 text-green-500" />
              <p className="text-green-500 text-sm">
                Tarjeta guardada correctamente
              </p>
            </div>
          )}
          {error && (
            <div id="payment-message" className="text-sm pt-4 text-red-400">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
