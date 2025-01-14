import SectionBloc from "components/layouts/components/section/sectionBloc";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";

import React, { useEffect, useState } from "react";
import LoadingContainer from "../loading";
import { useForm } from "react-hook-form";
import { formatDate } from "shared/helpers";
import { useMutation } from "@tanstack/react-query";
import { createPaymentLink, sendPaymentLink } from "apis/payments";
import { usePortalStore } from "store/portal";
import { Ring } from "@uiball/loaders";
import { useUIStore } from "store/ui";
import PaymentSlideOver from "../payments/paymentSlide";
import { tenant_has_permission } from "vars/portal/vars";

const PaymentBloc = ({ userPaymentsQuery, clientId }: any) => {
  const token = usePortalStore((state) => state.profile.token);
  const showNewPayment: any = useUIStore((state) => state.showNewPayment);
  const [total, setTotal] = useState(0);
  const dataProfile = usePortalStore((state) => state.dataProfile);

  const mutation = useMutation({
    mutationFn: (body: any) => createPaymentLink(token, body),
    onSuccess: async (data) => {
      const res = await sendPaymentLink(token, data.id);
      reset();
    },
  });

  useEffect(() => {
    if (userPaymentsQuery.data) {
      let total = 0;
      userPaymentsQuery.data.payments.map((payment: any) => {
        total += payment.amount;
      });
      setTotal(total);
    }
  }, [userPaymentsQuery.data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const body = {
      customerId: clientId,
      amount: data.amount,
    };

    mutation.mutate(body);
  };

  const createPayment = () => {
    showNewPayment();
  };

  return (
    <>
      <ComplexSectionBloc>
        <HeaderSection
          title="Pagos"
          description="Situación de pagos del cliente"
          hasActions
        >
          {tenant_has_permission(
            "PORTAL.CLIENTS.PAYMENTS.ADD",
            dataProfile.tenantid
          ) && (
            <button
              className="text-white text-sm px-4 py-1 rounded-md flex justify-center items-center bg-secondary"
              onClick={() => createPayment()}
            >
              Añadir pago
            </button>
          )}
        </HeaderSection>
        <BodySection>
          {userPaymentsQuery.isLoading ? (
            <LoadingContainer />
          ) : (
            <>
              {userPaymentsQuery.data &&
                userPaymentsQuery.data.payments.map((payment: any) => (
                  <div className="border p-2 rounded-lg  mb-4" key={payment.id}>
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-gray-500 text-sm">
                          {(payment.paymentMethod == "Stripe - Card" ||
                            payment.paymentMethod == "Stripe" ||
                            payment.paymentMethod == "Card") &&
                            "Tarjeta"}
                        </p>
                        <p className="text-gray-500 text-sm flex-1">
                          {payment.paymentMethod == "Stripe - Subscription" &&
                            "Tarjeta suscripción"}
                        </p>
                        <p className="text-gray-500 text-sm flex-1">
                          {payment.paymentMethod == "transferencia bancaria" &&
                            "Transferencia bancaria"}
                        </p>
                        <p className="text-gray-500 text-sm flex-1">
                          {payment.paymentMethod == "Paycomet - Bizum" &&
                            "Paycomet - Bizum"}
                        </p>
                        <p className="text-gray-500 text-sm flex-1">
                          {payment.paymentMethod.toUpperCase() == "MANUAL" &&
                            "Manual"}
                        </p>
                        <p className="text-gray-500 text-sm flex-1">
                          {payment.paymentMethod.toUpperCase() == "PROMO" &&
                            "Promo"}
                        </p>
                      </div>

                      <p className="text-gray-500 text-sm pr-10 text-right">
                        {formatDate(payment.paymentDate, "medium", "es")}
                      </p>
                      <p className="text-gray-700 font-medium w-16 text-right text-sm">
                        {payment.amount.toLocaleString("es-AR")}€
                      </p>
                    </div>
                    {payment.details && (
                      <p className="pt-2 text-xs text-gray-500">
                        **** **** **** {payment.details}
                      </p>
                    )}
                  </div>
                ))}
              {userPaymentsQuery.data.payments.length > 0 && (
                <div className="flex justify-between items-center px-2 text-sm">
                  <p className="text-gray-700 font-bold">Total</p>
                  <p className="font-bold">{total.toLocaleString("es-AR")}€</p>
                </div>
              )}
            </>
          )}

          <div className="flex items-center border p-2 rounded-lg mt-8">
            <p className="text-gray-700 flex-1 text-sm">Generar link de pago</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center space-x-4"
            >
              <div>
                <div className="flex-1">
                  <div className="relative rounded-md">
                    <input
                      {...register("amount", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      type="text"
                      className="block w-40 rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-right text-gray-700 pr-10"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span
                        className="text-gray-500 text-sm"
                        id="price-currency"
                      >
                        €
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={mutation.isLoading}
                className="text-white bg-secondary text-sm w-32 flex justify-center items-center py-2 rounded-md"
              >
                {mutation.isLoading ? (
                  <Ring color="#fff" size={20} />
                ) : (
                  "Enviar link"
                )}
              </button>
            </form>
          </div>
        </BodySection>
      </ComplexSectionBloc>
      <PaymentSlideOver />
    </>
  );
};

export default PaymentBloc;
