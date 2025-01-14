import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";
import Head from "next/head";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { Bank, CheckFilled, CreditCard } from "components/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPaymentMethods, getUserPayments } from "apis/payments";
import { usePortalStore } from "store/portal";
import { formatDate } from "shared/helpers";
import { getClientAddress, getUserProcesses } from "apis/client";
import { getProcessInfo } from "apis/processes";
import LoadingContainer from "components/portal/loading";
import {
  getSubscriptionsByProcess,
  getSubscriptions,
  createSubscription,
} from "apis/subscriptions";
import clsx from "clsx";
import CCForm from "components/portal/payments/CCform";
import { getProvinceName } from "vars/shared";
import { getProfile } from "apis/auth";
import { getStripeCustomerId } from "apis/leads";
import { ModalExtended } from "components/portal/estudio/modalExtended";
import { useUIStore } from "store/ui";
import { Ring } from "@uiball/loaders";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";

const Suscripcion: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const [sub, setSub] = useState<any>(null);
  const [defaultCreditCard, setDefaultCreditCard] = useState<any>(null);
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const setDataProfile = usePortalStore((state) => state.setDataProfile);
  const showModalExtended = useUIStore((state) => state.showModalExtended);
  const router = useRouter();

  useEffect(() => {
    if (dataProfile.stripeCustomerId == null) {
      createStripeCustomer();
    }
  }, [dataProfile]);

  const createStripeCustomer = async () => {
    const address = await getClientAddress(profile.token, profile.id);

    const body = {
      email: dataProfile.emailaddress,
      dni: dataProfile.dni,
      address: {
        street: address.address,
        city: address.city,
        state: getProvinceName(address.province),
        zip: address.zip,
      },
    };

    await getStripeCustomerId(body, dataProfile.id);

    const infoClient = await getProfile(profile.id, profile.token);
    setDataProfile(infoClient);
  };

  const processesQuery = useQuery(["procceses"], () =>
    getUserProcesses(profile.token, profile.id)
  );

  const subscriptionInfoClientQuery = useQuery(
    ["subscriptions"],
    () => getSubscriptionsByProcess(profile.token, processesQuery.data[0].id),
    { enabled: !!processesQuery.data }
  );

  const subscriptionQuery = useQuery(["subscription"], () =>
    getSubscriptions(profile.token, "LSO")
  );

  const statusQuery = useQuery(
    ["statusProcess"],
    () => getProcessInfo(profile.token, processesQuery.data[0].id),
    { enabled: !!processesQuery.data }
  );

  const methodsQuery = useQuery(
    ["paymentMethods"],
    () => getPaymentMethods(profile.token, profile.id),
    {
      onSuccess(data) {
        if (data.length > 0) {
          const dCC = data.find((e: any) => (e.isDefault = true));
          if (dCC != undefined) {
            setDefaultCreditCard(dCC.id);
          } else {
            if (data.length > 0) {
              setDefaultCreditCard(data[0].id);
            }
          }
        }
      },
    }
  );

  const mutation = useMutation({
    mutationFn: async () =>
      createSubscription({
        token: profile.token,
        processId: processesQuery.data[0].id,
        customerStripeId: dataProfile.stripeCustomerId,
        planId: sub.id,
      }),
    onSuccess: async (data) => {
      router.push("/portal/clientes/pagos/suscripcion/finalizada");
    },
  });

  const subscribePlan = async () => {
    mutation.mutate();
  };

  return (
    <>
      <Head>
        <title>Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="pt-6 mx-auto max-w-4xl">
        <ComplexSectionBloc>
          <HeaderSection
            title="Suscripción"
            description="Selecciona un plan para tu expediente."
            hasActions
          >
            <div className="pb-4">
              <p className="text-gray-500 text-sm">
                Importe pendiente:{" "}
                <span className="text-gray-700 font-medium">
                  {" "}
                  {statusQuery.isLoading
                    ? ""
                    : statusQuery.data.total_pending.toLocaleString("es-AR")}
                  €{" "}
                </span>
              </p>
            </div>
          </HeaderSection>
          <BodySection>
            {subscriptionQuery.isLoading ||
            subscriptionInfoClientQuery.isLoading ? (
              <LoadingContainer />
            ) : (
              <>
                <div className="grid lg:grid-cols-5 gap-2 lg:gap-8">
                  {subscriptionQuery.data
                    .sort(
                      (a: any, b: any) =>
                        a.installment_amount - b.installment_amount
                    )
                    .map((subscription: any) => (
                      <div
                        key={subscription.id}
                        onClick={() => setSub(subscription)}
                        className={clsx(
                          subscription.id === sub?.id && " border-secondary",
                          "border-2 relative rounded-lg p-4 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer"
                        )}
                      >
                        <p className="text-gray-700 font-bold text-xl">
                          {subscription.installment_amount}€
                        </p>
                        <p className="text-xs text-gray-500">Cuota mensual</p>

                        {subscription.id === sub?.id && (
                          <CheckFilled className="absolute w-4 h-4 top-2 right-2 text-secondary" />
                        )}
                      </div>
                    ))}
                </div>

                {sub != null && (
                  <div className="mt-8 border p-2 rounded-lg">
                    <p className="text-sm text-gray-500 text-center">
                      Opción suscripción con este plan:{" "}
                      <span className="font-semibold text-gray-700">
                        {" "}
                        {statusQuery.isLoading
                          ? ""
                          : Math.round(
                              statusQuery.data.total_pending /
                                sub.installment_amount
                            )}{" "}
                        cuotas de {sub.installment_amount}€
                      </span>
                    </p>
                  </div>
                )}

                {sub != null && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 pb-2">
                      Seleccionar tarjeta para la suscripción
                    </p>
                    {methodsQuery.isLoading ? (
                      <LoadingContainer />
                    ) : (
                      <>
                        {methodsQuery.data?.length > 0 ? (
                          <>
                            {methodsQuery.data.map((method: any) => (
                              <div
                                onClick={() => setDefaultCreditCard(method.id)}
                                className={clsx(
                                  method.id == defaultCreditCard &&
                                    "border-secondary",
                                  "border-2 p-2 rounded-lg mb-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                                )}
                                key={method.id}
                              >
                                <div className="w-6">
                                  {method.id == defaultCreditCard ? (
                                    <CheckFilled
                                      className={clsx("w-4 h-4 text-secondary")}
                                    />
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                                <div className="flex-1 flex justify-between items-center">
                                  {method.card.brand === "visa" && (
                                    <div className="border rounded px-2 shrink-0">
                                      <img
                                        src="/visa.svg"
                                        className="w-6 h-6"
                                      />
                                    </div>
                                  )}
                                  {method.card.brand === "mastercard" && (
                                    <div className="border rounded px-2 shrink-0">
                                      <img
                                        src="/mastercard.svg"
                                        className="w-6 h-6"
                                      />
                                    </div>
                                  )}

                                  <p
                                    className={clsx(
                                      method.id == defaultCreditCard
                                        ? "text-gray-700"
                                        : "text-gray-400",
                                      "text-sm  tracking-widest flex-1 px-8"
                                    )}
                                  >
                                    **** **** **** {method.card.last4}
                                  </p>
                                  <div className="w-30 px-4">
                                    {method.isDefault && (
                                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                        Predeterminada
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className="my-4">
                              <button
                                onClick={showModalExtended}
                                className="px-8 py-2 w-full sm:w-auto rounded-md bg-white hover:bg-gray-50 text-gray-500 border-2 text-sm duration-150"
                              >
                                Añadir tarjeta
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="border rounded-lg p-2 bg-gray-50 flex mt-2">
                            <div className="flex-1 flex items-center space-x-4">
                              <CreditCard className="h-8 w-8 text-gray-400" />
                              <p className="text-center text-sm text-gray-500">
                                No hay tarjetas
                              </p>
                            </div>

                            <button
                              onClick={showModalExtended}
                              className="px-8 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-white text-sm"
                            >
                              Añadir tarjeta
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {sub != null && methodsQuery.data?.length > 0 && (
                  <div className="flex justify-end pt-4 border-t mt-4">
                    <button
                      type="button"
                      onClick={() => subscribePlan()}
                      className="w-48 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-white text-sm flex justify-center"
                    >
                      {mutation.isLoading ? (
                        <div className="py-0.5">
                          <Ring size={16} color="#fff" />
                        </div>
                      ) : (
                        " Suscribirse al plan"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </BodySection>
        </ComplexSectionBloc>
      </div>
      <ModalExtended size="big">
        <CCForm action={showModalExtended} />
      </ModalExtended>
    </>
  );
};

Suscripcion.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Suscripcion;
