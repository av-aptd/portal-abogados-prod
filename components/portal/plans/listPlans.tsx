import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPlans } from "apis/pricing";
import { usePortalStore } from "store/portal";
import clsx from "clsx";
import { CheckFilled } from "components/icons";
import { Ring } from "@uiball/loaders";

const ListPlans = ({
  planId,
  setPlanId,
  typeList,
  copied,
  setCopied,
  copyLinkHE,
  sendHojadeEncargo,
  mutation,
  plans,
}: any) => {
  const profile = usePortalStore((state: any) => state.profile);

  return (
    <>
      <div className="border-b py-4 px-8">
        <h3 className="font-semibold text-gray-700">Seleccionar un plan</h3>
      </div>
      <div className="py-4 px-8">
        <div className="grid grid-cols-6 items-center gap-4 flex-1 text-gray-700 text-sm pl-1 pr-8 font-bold">
          <div className="col-span-2">
            <p>Plan</p>
          </div>

          <p className="text-right">Total</p>
          <p className="text-right">Inicial</p>
          <p className="text-right">Cuotas</p>
          <p className="text-right">Mínimo</p>
        </div>
        <div>
          <div className="border-t h-[400px] overflow-y-scroll pt-4">
            {plans
              ?.filter((plan: any) => plan.tenantid == 1)
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
          {typeList === "lead" && (
            <div className="pt-4 flex space-x-4">
              <button
                className={clsx(
                  copied
                    ? "bg-green-100 text-green-500 border-green-100"
                    : "bg-transparent text-gray-500 border-gray-300",
                  "border   text-sm flex-1 py-2 rounded-md flex justify-center items-center duration-150"
                )}
                onClick={() => copyLinkHE()}
              >
                {copied ? "Copiado" : "Copiar Link"}
              </button>
              <button
                onClick={() => sendHojadeEncargo()}
                className="flex flex-1 justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
              >
                {mutation.isLoading ? (
                  <Ring size={20} color="#fff" />
                ) : (
                  "Enviar hoja encargo"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListPlans;
