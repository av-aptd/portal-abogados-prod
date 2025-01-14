import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React, { useState, useEffect, useRef } from "react";
import type { ReactElement } from "react";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { usePortalStore } from "store/portal";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import {
  addPayment,
  deleteCreditCard,
  getPayCometCards,
  getPaymentMethods,
  getUserPayments,
  payCometCard,
  addCometCard,
  setDefaultPaymentCreditCard,
  deleteCometCard,
} from "apis/payments";
import {
  Check,
  Trash,
  CreditCard,
  CheckFilled,
  Warning,
} from "components/icons";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingContainer from "components/portal/loading";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";
import { Ring } from "@uiball/loaders";
import { useUIStore } from "store/ui";
import { AlertModal } from "components/portal/alertModal";
import { getClientAddress, getUserProcesses } from "apis/client";
import { getProcessInfo } from "apis/processes";
import { ModalExtended } from "components/portal/estudio/modalExtended";
import CCForm from "components/portal/payments/CCform";

import AddClientAddressForm from "components/portal/payments/newAddress";
import { getProvinceName } from "vars/shared";
import { getStripeCustomerId } from "apis/leads";
import { getProfile } from "apis/auth";
import PayCometForm from "components/portal/payments/paycomet";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  amount: z
    .number({
      invalid_type_error:
        "El importe debe ser un número, si has puesto una coma pon un punto.",
    })
    .min(0.01, { message: "El importe debe ser mayor de 0" }),
});

type FormData = z.infer<typeof schema>;

const PagoTarjeta: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const queryClient = useQueryClient();
  const showModalExtended = useUIStore((state) => state.showModalExtended);

  const [typeModal, setTypeModal] = useState<string>("addCard");

  const [payCometUser, setPayCometUser] = useState<any>(null);

  //PAYCOMET, stripe, SABADELL
  const [paymentProvider, setPaymentProvider] = useState<any>("PAYCOMET");
  const iframeRef = useRef(null);

  const [iframeReady, setIframeReady] = useState(false);
  const [payCometUrl, setPayCometUrl] = useState<string | null>(null);
  const [addCometUrl, setAddCometUrl] = useState<string | null>(null);

  const showAlert = useUIStore((state) => state.showAlert);

  const [defaultCreditCard, setDefaultCreditCard] = useState<any>(null);
  const [cardToDelete, setCardToDelete] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const processesQuery = useQuery(["procceses"], () =>
    getUserProcesses(profile.token, profile.id)
  );

  const payCometCardsQuery = useQuery(
    ["payCometCards"],
    () => getPayCometCards(),
    {
      onSuccess(data) {
        setPayCometUser(data[0]);
      },
    }
  );

  const deleteCometCardMutation = useMutation({
    mutationFn: async (data: any) => deleteCometCard(data),
    onSuccess: async (data) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["payCometCards"],
      });
      showAlert();
    },
  });

  const deleteCard = async (method: any) => {
    showAlert();

    setCardToDelete({
      portal_user_id: profile.id,
      paycomet_user_id: method.paycomet_user_id,
      token_user: method.token_user,
    });
  };

  const PayCometMutation = useMutation({
    mutationFn: async (data: any) => payCometCard(data),
    onSuccess: async (data) => {
      console.log(data);
      setPayCometUrl(data.src);
      setIframeReady(true);
      setTypeModal("payCard");
      showModalExtended();
    },
  });

  const onSubmit = async (data: any) => {
    if (defaultCreditCard == null) {
      alert("Selecciona una tarjeta");
    } else {
      const payload = {
        portal_user_id: profile.id,
        amount: data.amount,
        plan_id: null,
        comercialId: null,
        leadId: null,
        token: payCometCardsQuery.data.find(
          (item: any) => item.id == defaultCreditCard
        ).token_user,
        paycomet_user_id: payCometCardsQuery.data.find(
          (item: any) => item.id == defaultCreditCard
        ).paycomet_user_id,
      };

      PayCometMutation.mutate(payload);
    }
  };

  const AddCometMutation = useMutation({
    mutationFn: async (data: any) => addCometCard(data),
    onSuccess: async (data) => {
      setAddCometUrl(data.src);
      setIframeReady(true);
      setTypeModal("addCard");
      showModalExtended();
    },
  });

  const addPayCometCard = () => {
    const payload = {
      portal_user_id: profile.id,
    };

    AddCometMutation.mutate(payload);
  };

  return (
    <>
      <div className="pt-6 mx-auto max-w-3xl">
        <div className="">
          <SectionBloc title="Hacer un pago">
            <div className="mb-4">
              {payCometCardsQuery.isLoading ? (
                <LoadingContainer />
              ) : (
                <>
                  {payCometCardsQuery.data?.length > 0 ? (
                    <>
                      <p className="text-sm font-medium text-gray-700 pb-1">
                        Selecciona una tarjeta
                      </p>
                      {payCometCardsQuery.data.map((method: any) => (
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
                            {method.brand?.toLowerCase() === "visa" && (
                              <div className="border rounded px-2 shrink-0">
                                <img src="/visa.svg" className="w-6 h-6" />
                              </div>
                            )}
                            {method.brand?.toLowerCase() === "mastercard" && (
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
                              **** **** **** {method.last4}
                            </p>
                            <div className="w-30 px-4">
                              {method.isDefault && (
                                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                  Predeterminada
                                </span>
                              )}
                            </div>

                            <button onClick={() => deleteCard(method)}>
                              <Trash className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="pb-4">
                        <button
                          onClick={addPayCometCard}
                          className="px-8 py-2 rounded-md border hover:bg-gray-50 text-gray-700 text-sm"
                        >
                          Añadir otra tarjeta
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <CreditCard className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="text-center text-sm text-gray-500">
                        No hay tarjetas
                      </p>
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={addPayCometCard}
                          className="px-8 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-white text-sm"
                        >
                          Añadir tarjeta
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Importe
                </label>
                <div className="mt-1">
                  <input
                    {...register("amount", {
                      valueAsNumber: true,
                    })}
                    id="amount"
                    name="amount"
                    className={clsx(
                      errors.amount?.type === "required"
                        ? "border-red-400"
                        : "border-gray-300",
                      "block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                    )}
                  />
                  {errors.amount && (
                    <p className="text-red-400 text-sm pt-1 pl-2">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
                >
                  Pagar ahora
                </button>
              </div>
            </form>

            {/* <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Importe a ingresar
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  name="price"
                  id="price"
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="block w-full rounded-md border-gray-300 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    €
                  </span>
                </div>
              </div>
            </div>
            {errorMessage != "" && (
              <div className="flex items-center space-x-3 p-2 mt-4 rounded-md border border-red-400 bg-red-50">
                <Warning className="w-5 h-5 text-red-400" />
                <p className="text-red-400 text-sm">{errorMessage}</p>
              </div>
            )}

            <button
              onClick={createClientToPayComet}
              className="bg-secondary px-8 py-2 text-white rounded-md mt-4 text-sm w-full flex justify-center"
            >
              {loading ? (
                <div className="flex space-x-4">
                  <Ring size={20} color="#fff" /> <p>pagando</p>
                </div>
              ) : (
                "Continuar"
              )}
            </button> */}
          </SectionBloc>

          {/* <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SectionBloc title="Seleccionar tarjeta">
                <div className="mb-4">
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
                                    <img src="/visa.svg" className="w-6 h-6" />
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

                                <button
                                  onClick={() => showModalDelete(method.id)}
                                >
                                  <Trash className="w-4 h-4 text-gray-400" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <CreditCard className="mx-auto h-10 w-10 text-gray-400" />
                          <p className="text-center text-sm text-gray-500">
                            No hay tarjetas
                          </p>
                          <div className="flex justify-center pt-4">
                            <button
                              onClick={showModalExtended}
                              className="px-8 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-white text-sm"
                            >
                              Añadir tarjeta
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <button
                  onClick={showModalExtended}
                  className="px-8 py-2 w-full sm:w-auto rounded-md bg-white hover:bg-gray-50 text-gray-500 border-2 text-sm duration-150"
                >
                  Añadir tarjeta
                </button>
              </SectionBloc>
            </div>
            <SectionBloc title="Pago con tarjeta">
              {paymentComplete ? (
                <div className="pt-4">
                  <Check className="mx-auto h-16 w-16 text-green-400" />
                  <p className="text-center text-gray-500 pt-4">
                    Pago realizado correctamente
                  </p>
                  <div className="flex justify-center mt-8">
                    <button
                      className="bg-secondary text-sm text-white px-16 py-2 rounded-md"
                      onClick={() => router.push("/portal/clientes/pagos")}
                    >
                      Volver
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Importe a ingresar
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="price"
                        id="price"
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="block w-full rounded-md border-gray-300 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                        placeholder="0.00"
                        aria-describedby="price-currency"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span
                          className="text-gray-500 sm:text-sm"
                          id="price-currency"
                        >
                          €
                        </span>
                      </div>
                    </div>
                  </div>
                  {errorMessage != "" && (
                    <div className="flex items-center space-x-3 p-2 mt-4 rounded-md border border-red-400 bg-red-50">
                      <Warning className="w-5 h-5 text-red-400" />
                      <p className="text-red-400 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    onClick={pay}
                    disabled={paymentDisabled()}
                    className="bg-secondary px-8 py-2 text-white rounded-md mt-4 text-sm w-full flex justify-center"
                  >
                    {loading ? (
                      <div className="flex space-x-4">
                        <Ring size={20} color="#fff" /> <p>pagando</p>
                      </div>
                    ) : (
                      "Pagar"
                    )}
                  </button>
                </>
              )}
            </SectionBloc>
          </div> */}
        </div>
      </div>
      <AlertModal
        title="Eliminar tarjeta"
        description="¿Estás seguro que quieres eliminar esta tarjeta?"
        label="Eliminar"
        action={() => deleteCometCardMutation.mutate(cardToDelete)}
      />

      <ModalExtended size="big" className="bg-gray-50">
        {/* {showNewAddress ? (
          <AddClientAddressForm
            action={showModalExtended}
            createStripeCustomer={createStripeCustomer}
            setShowNewAddress={setShowNewAddress}
          />
        ) : ( */}
        <>
          {/* {paymentProvider == "STRIPE" && (
              <CCForm action={showModalExtended} />
            )} */}
          {iframeReady && typeModal == "payCard" && (
            <div className="border p-10 text-center">
              <LoadingContainer />
              <p className="text-base font-semibold leading-6 text-gray-900 pb-2">
                Haciendo el pago
              </p>
              <p className="text-sm text-gray-500">No cierres esta ventana</p>
              <iframe
                title="titulo"
                sandbox="allow-top-navigation allow-scripts allow-same-origin allow-forms"
                src={`${payCometUrl}`}
                width="600"
                height="10"
                scrolling="no"
              ></iframe>
            </div>
          )}
          {iframeReady && typeModal == "addCard" && (
            <iframe
              title="titulo"
              sandbox="allow-top-navigation allow-scripts allow-same-origin allow-forms"
              src={`${addCometUrl}`}
              width="500"
              height="400"
              scrolling="no"
            ></iframe>
          )}
        </>
        {/* )} */}
      </ModalExtended>
    </>
  );
};

PagoTarjeta.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default PagoTarjeta;
