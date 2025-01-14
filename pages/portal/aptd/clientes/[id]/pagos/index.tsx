import React, { useEffect, useState } from "react";
import PortalLayout from "components/layouts/portal";
import ClientLayout from "components/layouts/client";
import type { NextPageWithLayout } from "../../../../../_app";
import type { ReactElement } from "react";
import PaymentSlideOver from "components/portal/payments/paymentSlide";
import LoadingContainer from "components/portal/loading";
import { isUserInGroup, tenant_has_permission } from "vars/portal/vars";
import { usePortalStore } from "store/portal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUIStore } from "store/ui";
import { useForm } from "react-hook-form";
import {
  createPaymentLink,
  getUserPayments,
  sendPaymentLink,
} from "apis/payments";
import { useRouter } from "next/router";
import { Ring } from "@uiball/loaders";
import PortalHeader from "components/portal/layout/header";
import PaymentBox from "./components/payment";

const PaymentsUserAdmin: NextPageWithLayout = () => {
  const token = usePortalStore((state) => state.profile.token);
  const showNewPayment: any = useUIStore((state) => state.showNewPayment);
  const [total, setTotal] = useState(0);
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);

  const userPaymentsQuery = useQuery(
    ["userPayments", router.query.id],
    async () => getUserPayments(profile.token, router.query.id)
  );

  console.log(userPaymentsQuery.data);

  useEffect(() => {
    if (userPaymentsQuery.data) {
      let total = 0;
      userPaymentsQuery.data.payments.map((payment: any) => {
        total += payment.amount;
      });
      setTotal(total);
    }
  }, [userPaymentsQuery.data]);

  const mutation = useMutation({
    mutationFn: (body: any) => createPaymentLink(token, body),
    onSuccess: async (data) => {
      const res = await sendPaymentLink(token, data.id);
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const body = {
      customerId: router.query.id,
      amount: data.amount,
    };

    mutation.mutate(body);
  };

  const createPayment = () => {
    showNewPayment();
  };

  return (
    <>
      <PortalHeader title="Pagos cliente" />
      <div className="flex justify-between mb-4 items-baseline border-b border-gray-100 px-4 pb-4">
        <p className="text-sm font-medium">Listado de pagos</p>
        <div className="">
          {tenant_has_permission(
            "PORTAL.CLIENTS.PAYMENTS.ADD",
            dataProfile.tenantid
          ) && (
            <div className="">
              <button
                className="text-white text-sm px-4 py-1.5 rounded-md flex justify-center items-center bg-secondary"
                onClick={() => createPayment()}
              >
                Añadir pago
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        {userPaymentsQuery.isLoading ? (
          <LoadingContainer />
        ) : (
          <>
            {userPaymentsQuery.data && (
              <>
                <div className="grid lg:grid-cols-3 gap-4">
                  <div className="border p-4 rounded-lg bg-gray-50 text-center mb-4">
                    <p className="text-gray-500 text-sm">Total pagado</p>
                    <p className="font-bold text-2xl text-gray-700 pt-2">
                      {userPaymentsQuery.data.payments.length > 0
                        ? total.toLocaleString("es-AR")
                        : 0}
                      €
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg bg-gray-50 text-center mb-4">
                    <p className="text-gray-500 text-sm">Balance</p>
                    <p className="font-bold text-2xl text-gray-700 pt-2">
                      {userPaymentsQuery.data.balance.balance.toLocaleString(
                        "es-AR"
                      )}
                      €
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg bg-gray-50 mb-4">
                    <p className="text-gray-500 text-right text-sm pb-2">
                      Generar link de pago
                    </p>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex items-center justify-end space-x-4"
                    >
                      <div className="relative rounded-md">
                        <input
                          {...register("amount", {
                            required: true,
                            valueAsNumber: true,
                          })}
                          type="text"
                          className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-right text-gray-700 pr-10"
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

                      <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="text-white bg-secondary text-sm w-auto flex justify-center items-center py-2 px-4 rounded-md shrink-0"
                      >
                        {mutation.isLoading ? (
                          <Ring color="#fff" size={20} />
                        ) : (
                          "Enviar link"
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {userPaymentsQuery.data.payments.map((payment: any) => (
                  <PaymentBox payment={payment} key={payment.id} />
                ))}
              </>
            )}
          </>
        )}
      </div>

      <PaymentSlideOver />
    </>
  );
};

PaymentsUserAdmin.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ClientLayout>{page}</ClientLayout>
    </PortalLayout>
  );
};

export default PaymentsUserAdmin;
