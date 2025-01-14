import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useState } from "react";
import type { ReactElement } from "react";
import Head from "next/head";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { Bank, CreditCard, Subscription } from "components/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUserPayments } from "apis/payments";
import { usePortalStore } from "store/portal";
import { formatDate } from "shared/helpers";
import { getUserProcesses } from "apis/client";
import { getProcessInfo } from "apis/processes";
import LoadingContainer from "components/portal/loading";
import clsx from "clsx";

const Pagos: NextPageWithLayout = () => {
  const { pathname } = useRouter();
  const profile = usePortalStore((state) => state.profile);
  const dataProfile = usePortalStore((state) => state.dataProfile);

  const paymentsQuery = useQuery(["paymentsUser", profile.id], () =>
    getUserPayments(profile.token, profile.id)
  );

  const processesQuery = useQuery(["procceses", profile.id], () =>
    getUserProcesses(profile.token, profile.id)
  );

  const PaymentQuery = useQuery(
    ["paymentInfo"],
    () => getProcessInfo(profile.token, processesQuery.data[0].id),
    { enabled: !!processesQuery.data }
  );

  const refunded = (payment: any) => {
    return payment.details?.includes("Refund");
  };

  return (
    <>
      <Head>
        <title>Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="pt-6 mx-auto max-w-7xl">
        {}

        <div className="grid lg:grid-cols-2 gap-8">
          <SectionBloc
            title="Hacer un pago"
            description="Selecciona una forma de pago."
          >
            {PaymentQuery.isLoading || paymentsQuery.isLoading ? (
              <LoadingContainer />
            ) : (
              <>
                <div className="grid lg:grid-cols-3 gap-x-8 gap-y-4 mt-2 mb-8">
                  <div className="border p-4 rounded-lg bg-gray-50 text-center">
                    <p className="text-gray-500 text-sm">Importe pagado</p>
                    <p className="font-bold text-2xl text-gray-700 pt-2">
                      {PaymentQuery.data.total_paid?.toLocaleString("es-AR")}€
                    </p>
                  </div>
                  {/* <div className="border p-4 rounded-lg bg-gray-50 text-center">
                    <p className="text-gray-500 text-sm">Balance</p>
                    <p className="font-bold text-2xl text-gray-700 pt-2">
                      {paymentsQuery.data.balance.balance.toLocaleString(
                        "es-AR"
                      )}
                      €
                    </p>
                  </div> */}
                  <div className="border p-4 rounded-lg bg-gray-50 text-center">
                    <p className="text-gray-500 text-sm">Importe pendiente</p>
                    <p className="font-bold text-2xl text-gray-700 pt-2">
                      {PaymentQuery.data.total_pending > 0
                        ? PaymentQuery.data.total_pending.toLocaleString(
                            "es-AR"
                          )
                        : 0}
                      €
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg bg-gray-50 text-center">
                    <p className="text-gray-500 text-sm">Cuotas pendientes</p>
                    <p className="font-bold text-2xl text-gray-700 pt-2">
                      {PaymentQuery.data.installments_pending}
                    </p>
                  </div>
                </div>

                {/* {PaymentQuery.data.total_pending > 0 && ( */}
                <div className="border p-4 rounded-lg mb-8">
                  <p className="pb-4 font-semibold text-gray-700 text-lg">
                    Selecciona método de pago
                  </p>
                  <div
                    className={clsx(
                      !PaymentQuery.data.hasSubscription
                        ? "lg:grid-cols-2"
                        : "",
                      "grid grid-cols-2 gap-4"
                    )}
                  >
                    <Link
                      href={pathname + "/transferencia"}
                      className="border bg-gray-50 p-4 rounded-lg text-center flex justify-center items-center"
                    >
                      <div>
                        <Bank className="w-8 h-8 mx-auto text-gray-500" />
                        <p className="text-gray-500 font-medium pt-2 text-sm">
                          Transferencia
                        </p>
                      </div>
                    </Link>
                    <Link
                      href={pathname + "/tarjeta"}
                      className="border bg-gray-50 p-4 rounded-lg text-center flex justify-center items-center"
                    >
                      <div>
                        <CreditCard className="w-8 h-8 mx-auto text-gray-500" />
                        <p className="text-gray-500 font-medium pt-2 text-sm">
                          Tarjeta
                        </p>
                      </div>
                    </Link>
                    {/* {!PaymentQuery.data.hasSubscription && (
                      <Link
                        href={pathname + "/suscripcion"}
                        className="border-2 border-secondary bg-gray-50 p-4 rounded-lg text-center flex justify-center items-center"
                      >
                        <div>
                          <Subscription className="w-8 h-8 mx-auto text-gray-500" />
                          <p className="text-gray-500 font-medium pt-2 text-sm">
                            Suscripción
                          </p>
                          <div className="flex justify-center pt-2">
                            <div className="bg-secondary rounded-full px-3 py-1">
                              <p className="text-xs text-white">recomendado</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )} */}
                  </div>
                  {/* {PaymentQuery.data.hasSubscription && (
                    <div className="bg-green-50 border rounded-lg p-2 border-green-600 mt-4">
                      <p className="text-green-600 text-sm text-center">
                        Tienes una suscripción activa
                      </p>
                    </div>
                  )} */}
                </div>
                {/* )} */}
              </>
            )}
          </SectionBloc>
          <SectionBloc
            title="Historial de pagos"
            description="Listado de los pagos realizados."
          >
            {paymentsQuery.isLoading ? (
              <LoadingContainer />
            ) : (
              <>
                {paymentsQuery.data?.payments?.map((pago: any) => (
                  <div
                    key={pago.id}
                    className=" border rounded-lg p-4 py-2 mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-gray-500 text-sm flex-1">
                          {(pago.paymentMethod == "Stripe - Card" ||
                            pago.paymentMethod == "Paycomet - Card" ||
                            pago.paymentMethod == "Stripe") &&
                            "Tarjeta"}
                        </p>

                        <p className="text-gray-500 text-sm flex-1">
                          {pago.paymentMethod == "Stripe - Subscription" &&
                            "Tarjeta suscripción"}
                        </p>
                        <p className="text-gray-500 text-sm flex-1">
                          {pago.paymentMethod == "Paycomet - Bizum" &&
                            "Paycomet - Bizum"}
                        </p>
                        <p className="text-gray-500 text-sm flex-1">
                          {pago.paymentMethod == "transferencia bancaria" &&
                            "Transferencia bancaria"}
                        </p>
                        <p className="text-gray-500 text-sm flex-1">
                          {pago.paymentMethod == "Manual" && "Manual"}
                        </p>
                        <p className="text-gray-500 text-sm flex-1">
                          {pago.paymentMethod == "Promo" && "Promo"}
                        </p>
                        {pago.details && (
                          <p className="pt-2 text-xs text-gray-500">
                            **** **** ****{" "}
                            {pago.details
                              .replace("Refunded", "Reembolsado")
                              .replace("Refund", "Reembolso")}
                          </p>
                        )}
                      </div>

                      <p className="text-gray-500 text-sm pr-10 text-right">
                        {formatDate(pago.paymentDate, "medium", "es")}
                      </p>
                      <p
                        className={clsx(
                          refunded(pago) ? "text-red-400" : "text-gray-700",
                          " font-bold w-16 text-right text-sm"
                        )}
                      >
                        {pago.amount.toLocaleString("es-AR")}€
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </SectionBloc>
        </div>
      </div>
    </>
  );
};

Pagos.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Pagos;
