import React, { useState } from "react";
import PortalLayout from "components/layouts/portal";
import ProcessLayout from "components/layouts/process";
import type { NextPageWithLayout } from "../../../../../../_app";
import type { ReactElement } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePlan, getProcessById, getProcessInfo } from "apis/processes";
import { useRouter } from "next/router";
import { usePortalStore } from "store/portal";
import LineItem from "components/portal/user/lineItem";
import LoadingContainer from "components/portal/loading";
import { formatDate } from "shared/helpers";
import { CheckFilled, EmptyFolder } from "components/icons";
import { ModalExtended } from "components/portal/estudio/modalExtended";
import { getPlans } from "apis/pricing";
import { useUIStore } from "store/ui";
import clsx from "clsx";
import { Ring } from "@uiball/loaders";
import PortalHeader from "components/portal/layout/header";
import ClientLayout from "components/layouts/client";
import {
  cancelSubscription,
  getPaymentsSituation,
  getUserPayments,
} from "apis/payments";

import { canRefund } from "vars/shared";

const InformationProcess: NextPageWithLayout = () => {
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);
  const [plan, setPlan] = useState<any>("");
  const [planId, setPlanId] = useState<any>(null);
  const queryClient = useQueryClient();
  const showModalExtended = useUIStore((state) => state.showModalExtended);
  const setProcess = usePortalStore((state) => state.setProcess);
  const process = usePortalStore((state) => state.process);
  const [activateChangePlan, setActivateChangePlan] = useState(false);
  const [non_payments, setNon_payments] = useState<any>(0);
  const [showStatus, setShowStatus] = useState(true);

  const userQuery = useQuery(
    ["infoProccess", router.query.proccessId],
    () => getProcessById(profile.token, router.query.proccessId),
    {
      onSuccess: (data) => {
        setProcess(data);
      },
    }
  );

  const ContractQuery = useQuery(
    ["installmentsUser", router.query.proccessId],
    () => getProcessInfo(profile.token, router.query.proccessId)
  );

  console.log("ContractQuery", ContractQuery.data);

  const paymentsQuery = useQuery(["paymentsUser", router.query.id], () =>
    getUserPayments(profile.token, router.query.id)
  );

  console.log("paymentsQuery", paymentsQuery.data);

  var queryParams = `searchBy=${""}&searchValue=${""}&limit=1000&page=1`;

  const pricingsQuery = useQuery(
    ["pricings", queryParams],
    () => getPlans(profile.token, queryParams),
    {
      enabled: !!activateChangePlan,
    }
  );

  const nameUserProcess = () => {
    const name = process.intervinientes?.filter((i: any) => i.role.id == "8");
    if (name == undefined || name.length === 0) return "";
    const fullName = `${name[0].name} ${name[0].surname}`;
    return fullName;
  };

  var queryParams2 = `searchBy=fullname&searchValue=${nameUserProcess()}&limit=1000&page=1`;

  useQuery(
    ["UsersPaymentSituation", queryParams2, router.query.proccessId],
    () => getPaymentsSituation(profile.token, queryParams2),
    {
      enabled: !!nameUserProcess() && !!ContractQuery.data,
      onSuccess(data) {
        if (data.statusCode == 500) {
          setNon_payments(0);
          setShowStatus(false);
        } else {
          const user = data.find(
            (i: any) => i.portal_process_id === process.id
          );
          if (user) {
            setNon_payments(user == undefined ? 0 : user.non_payments);
          }
        }
      },
    }
  );

  const planMutation = useMutation(
    ["addPlan"],
    (data: any) => changePlan(profile.token, router.query.proccessId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["installments", "userProcesses"],
        });
        setPlanId(null);
        showModalExtended();
      },
    }
  );

  const changeToAnewPlan = () => {
    setActivateChangePlan(true);
    showModalExtended();
  };

  const selectPlan = () => {
    planMutation.mutate({
      planId: planId,
      processId: router.query.proccessId,
    });
  };

  const cancelMutation = useMutation(
    (stripeCustomerId) => cancelSubscription({ stripeCustomerId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["installmentsUser"]);
      },
    }
  );

  const cancelarSuscripcion = (id: any) => {
    cancelMutation.mutate(id);
  };

  console.log("ContractQuery.data", ContractQuery.data);

  return (
    <>
      <PortalHeader title="Información expediente" />
      <div className="">
        <div className="grid lg:grid-cols-3 border rounded-lg p-4 mb-4 gap-4">
          <div>
            <p className="text-gray-500">{process.processname}</p>
            <p className="font-medium text-gray-700">{process.planName}</p>
            <div className="mt-4">
              <button
                onClick={() => changeToAnewPlan()}
                className="text-gray-700 bg-white border text-sm w-40 flex justify-center items-center py-2 rounded-md"
              >
                Cambiar de plan
              </button>
            </div>
          </div>

          <div className="text-sm pb-2 lg:text-right">
            <p className="text-gray-500">Estado</p>
            <p className="font-semibold text-gray-700">{process?.statusName}</p>
          </div>

          <div className="text-sm lg:text-right">
            {showStatus && (
              <>
                <p className="text-gray-500">Situación pagos</p>

                <div className="flex lg:justify-end">
                  <div
                    className={clsx(
                      non_payments > 0 ? "bg-red-100" : "bg-green-100",
                      "rounded-full py-1 px-3 flex justify-center mt-1"
                    )}
                  >
                    <p
                      className={clsx(
                        non_payments > 0 ? "text-red-800" : "text-green-700",
                        "text-right text-xs"
                      )}
                    >
                      {non_payments > 0 ? "Impagado" : "Al corriente"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="border rounded-lg">
            <div className="flex justify-between mb-4 items-baseline border-b border-gray-100 p-3">
              <p className="font-medium">Contrato</p>{" "}
              {ContractQuery.data && ContractQuery.data.hasSubscription && (
                <span className="text-xs text-green-800 bg-green-100 rounded-full px-2 py-1">
                  Suscripción activa
                </span>
              )}
            </div>
            <div className="">
              {ContractQuery.isLoading || paymentsQuery.isLoading ? (
                <LoadingContainer />
              ) : (
                <>
                  {ContractQuery.data != undefined ? (
                    <>
                      {ContractQuery.data.contract_price > 0 ? (
                        <>
                          <div className="">
                            {ContractQuery.data.contract_date != null && (
                              <LineItem
                                label="Fecha de contrato"
                                value={
                                  ContractQuery.data.contract_date != null
                                    ? formatDate(
                                        ContractQuery.data.contract_date,
                                        "short",
                                        "es"
                                      )
                                    : "No definida"
                                }
                              />
                            )}

                            <LineItem
                              label="Precio contrato"
                              value={`${Number(
                                ContractQuery.data.contract_price
                              ).toLocaleString("es-AR")}€`}
                            />
                            <LineItem
                              label="Total Pagado"
                              value={`${Number(
                                ContractQuery.data.total_paid
                              ).toLocaleString("es-AR")}€`}
                            />
                            {/* <LineItem
                              label="Total pendiente"
                              value={
                                Number(ContractQuery.data.total_pending) >= 0
                                  ? `${Number(
                                      ContractQuery.data.total_pending -
                                        (paymentsQuery.data.balance.balance > 0
                                          ? paymentsQuery.data.balance.balance
                                          : 0)
                                    ).toLocaleString("es-AR")}€`
                                  : 0
                              }
                            /> */}

                            <LineItem
                              label="Total pendiente"
                              value={
                                Number(ContractQuery.data.total_pending) > 0
                                  ? `${Number(
                                      ContractQuery.data.contract_price -
                                        ContractQuery.data.total_paid
                                    ).toLocaleString("es-AR")}€`
                                  : `${Number(
                                      ContractQuery.data.contract_price -
                                        ContractQuery.data.total_paid
                                    ).toLocaleString("es-AR")}€`
                              }
                            />

                            <LineItem
                              label="Cuotas pagadas"
                              value={ContractQuery.data.installments_paid}
                            />
                            <LineItem
                              label="Cuotas pendientes"
                              value={ContractQuery.data.installments_pending}
                            />

                            {ContractQuery.data.installments_pending > 0 && (
                              <>
                                <LineItem
                                  label="Próximo pago"
                                  value={formatDate(
                                    ContractQuery.data.next_installment
                                      ?.planneddate,
                                    "short",
                                    "es"
                                  )}
                                />
                                <LineItem
                                  label="Cantidad cuota"
                                  value={`${Number(
                                    ContractQuery.data.next_installment?.amount
                                  ).toLocaleString("es")}€`}
                                />
                              </>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="bg-gray-50 rounded-lg px-8 py-4">
                          <p className="text-sm text-gray-500 text-center">
                            Contrato de LSO UF sin coste
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8">
                      <EmptyFolder className="text-gray-500 w-10 h-10 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 text-center">
                        Pendiente de firmar la Hoja de Encargo o de hacer el
                        pago
                      </p>
                    </div>
                  )}
                  {ContractQuery.data &&
                    ContractQuery.data.hasSubscription &&
                    canRefund(profile) && (
                      <div className="p-4">
                        <button
                          onClick={() =>
                            cancelarSuscripcion(
                              ContractQuery.data.client.stripeCustomerId
                            )
                          }
                          disabled={cancelMutation.isLoading}
                          className="text-xs text-red-800 bg-red-100 hover:bg-red-200 duration-150 rounded-full p-2 w-full"
                        >
                          {cancelMutation.isLoading ? (
                            <div className="flex justify-center">
                              <Ring color="#991B1B" size={16} />
                            </div>
                          ) : (
                            "Cancelar suscripción"
                          )}
                        </button>
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
          <div className="border rounded-lg">
            <div className="flex justify-between mb-4 items-baseline border-b border-gray-100 p-3">
              <p className="font-medium">Participantes</p>
            </div>

            {process?.intervinientes?.map((participant: any) => (
              <LineItem
                key={participant.email}
                label={participant.role.displayName}
                value={`${participant.name} ${participant.surname}`}
              />
            ))}
          </div>
        </div>
      </div>
      <ModalExtended size="big">
        <>
          <div className="border-b py-4 px-8">
            <h3 className="font-semibold text-gray-700">
              Seleccionar nuevo plan
            </h3>
          </div>
          <div className="px-8 py-2 bg-gray-100">
            <input
              type="text"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="block w-full rounded-lg py-1.5 border-gray-300 text-gray-700 focus:border-secondary focus:outline-none focus:ring-secondary placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Buscar plan"
            />
          </div>

          <div className="py-4 px-8 overflow-y-scroll h-[400px]">
            {pricingsQuery?.data
              ?.filter((item: any) =>
                item.subscription_type
                  .toLowerCase()
                  .includes(plan.toLowerCase())
              )
              .map((plan: any) => (
                <div
                  key={plan.id}
                  className={clsx(
                    plan.id === planId
                      ? "border-secondary bg-gray-50"
                      : "border-gray-300",
                    "hover:bg-gray-50 duration-150 rounded-lg mb-4 px-2 py-2 text-sm cursor-pointer border-2 flex justify-between items-center"
                  )}
                  onClick={() => setPlanId(plan.id)}
                >
                  <div className="grid grid-cols-6 items-center gap-4 flex-1">
                    <div className="col-span-2 flex items-center space-x-2">
                      {plan.is_public ? (
                        <div className="rounded-full bg-green-400 w-2 h-2"></div>
                      ) : (
                        <div className="rounded-full bg-red-400 w-2 h-2"></div>
                      )}
                      <p className="text-gray-700 text-xs font-medium">
                        {plan.category} - {plan.subscription_type}
                      </p>
                    </div>
                    <div className="text-gray-700 font-bold text-right">
                      <p>{plan.amount.toLocaleString("es-AR")}€</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-right">
                        {plan.initial_payment.toLocaleString("es-AR")}€
                      </p>
                    </div>

                    <div className="text-gray-500 text-right">
                      <p>
                        {plan.total_installments} x {plan.installment_amount}€
                      </p>
                    </div>

                    <div className="text-gray-500 text-right">
                      <p>{plan.import_debt_min.toLocaleString("es-AR")}€</p>
                    </div>
                  </div>
                  <div className="w-6 flex justify-end">
                    {plan.id === planId && (
                      <CheckFilled className="w-4 h-4 text-secondary" />
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className="border-t flex justify-end space-x-4 p-4">
            <button
              type="button"
              className="bg-white text-gray-700 text-sm px-4 py-2 border rounded-md hover:bg-gray-50 duration-200 focus:outline-none"
              onClick={() => showModalExtended()}
            >
              Cerrar
            </button>

            <button
              type="button"
              disabled={planMutation.isLoading}
              onClick={() => selectPlan()}
              className="inline-flex items-center w-56 justify-center rounded-md border border-transparent bg-secondary px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
            >
              {planMutation.isLoading ? (
                <Ring size={16} color="#fff" />
              ) : (
                "Cambiar plan"
              )}
            </button>
          </div>
        </>
      </ModalExtended>
    </>
  );
};

InformationProcess.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ClientLayout>
        <ProcessLayout>{page}</ProcessLayout>
      </ClientLayout>
    </PortalLayout>
  );
};

export default InformationProcess;
