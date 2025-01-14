import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";

import Head from "next/head";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { useQuery, useMutation } from "@tanstack/react-query";
import { usePortalStore } from "store/portal";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { planCategories, planSubscriptionType } from "vars/portal/vars";
import { addPlan } from "apis/pricing";

const NuevoUsuario = () => {
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: any) => addPlan(profile.token, data),
    onSuccess: () => router.push("/portal/aptd/planes"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    console.log(typeof Number(data.amount));

    const body = {
      subscription_type: data.subscription_type,
      short_description: data.short_description,
      amount: Number(data.amount),
      initial_payment: Number(data.initial_payment),
      final_payment: Number(data.final_payment),
      isRecommended: false,
      order: 0,
      installment_amount: Number(data.installment_amount),
      total_installments: Number(data.total_installments),
      category: data.category,
      import_debt_min: Number(data.import_debt_min),
      import_debt_max: Number(data.import_debt_max),
      stripe_plan_id: data.stripe_plan_id,
    };

    // console.log(body);
    mutation.mutate(body);
  };

  return (
    <>
      <Head>
        <title>Nuevo plan</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="pt-6 mx-auto max-w-7xl">
        <SectionBloc
          title="Añadir nuevo plan"
          description="Rellena los siguientes campos"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 ">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Categoría
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <select
                        {...register("category", { required: true })}
                        id="category"
                        name="category"
                        className="block rounded-md w-full max-w-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      >
                        <option value="">Selecciona una opción</option>
                        {planCategories.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="subscription_type"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Tipo de suscripción
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <select
                        {...register("subscription_type", { required: true })}
                        id="subscription_type"
                        name="subscription_type"
                        className="block rounded-md w-full max-w-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      >
                        <option value="">Selecciona una opción</option>
                        {planSubscriptionType.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="short_description"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Descripción
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <textarea
                        {...register("short_description", { required: true })}
                        rows={3}
                        name="short_description"
                        id="short_description"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Importe total
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <div className="relative mt-1 rounded-md shadow-sm max-w-lg sm:max-w-xs">
                        <input
                          {...register("amount", { required: true })}
                          type="number"
                          name="amount"
                          id="amount"
                          className="block w-full rounded-md border-gray-300 pr-10 focus:border-secondary focus:ring-secondary sm:text-sm"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                          €
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="initial_payment"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Primer pago
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <div className="relative mt-1 rounded-md shadow-sm max-w-lg sm:max-w-xs">
                        <input
                          {...register("initial_payment", { required: true })}
                          type="text"
                          name="initial_payment"
                          id="initial_payment"
                          className="block w-full rounded-md border-gray-300 pr-10 focus:border-secondary focus:ring-secondary sm:text-sm"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                          €
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="total_installments"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Número de cuotas
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        {...register("total_installments", { required: true })}
                        type="number"
                        name="total_installments"
                        id="total_installments"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="installment_amount"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Cantidad cuota
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <div className="relative mt-1 rounded-md shadow-sm max-w-lg sm:max-w-xs">
                        <input
                          {...register("installment_amount", {
                            required: true,
                          })}
                          type="number"
                          name="installment_amount"
                          id="installment_amount"
                          className="block w-full rounded-md border-gray-300 pr-10 focus:border-secondary focus:ring-secondary sm:text-sm"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                          €
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="final_payment"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Último pago
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <div className="relative mt-1 rounded-md shadow-sm max-w-lg sm:max-w-xs">
                        <input
                          {...register("final_payment", { required: true })}
                          type="text"
                          name="final_payment"
                          id="final_payment"
                          className="block w-full rounded-md border-gray-300 pr-10 focus:border-secondary focus:ring-secondary sm:text-sm"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                          €
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="import_debt_min"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Importe mínimo deuda
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <div className="relative mt-1 rounded-md shadow-sm max-w-lg sm:max-w-xs">
                        <input
                          {...register("import_debt_min", { required: true })}
                          type="number"
                          name="import_debt_min"
                          id="import_debt_min"
                          className="block w-full rounded-md border-gray-300 pr-10 focus:border-secondary focus:ring-secondary sm:text-sm"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                          €
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="import_debt_max"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Importe máximo deuda
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <div className="relative mt-1 rounded-md shadow-sm max-w-lg sm:max-w-xs">
                        <input
                          {...register("import_debt_max", { required: true })}
                          type="text"
                          name="import_debt_max"
                          id="import_debt_max"
                          className="block w-full rounded-md border-gray-300 pr-10 focus:border-secondary focus:ring-secondary sm:text-sm"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                          €
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="stripe_plan_id"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Stripe plan Id
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        {...register("stripe_plan_id")}
                        type="text"
                        name="stripe_plan_id"
                        id="stripe_plan_id"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  onClick={() => router.back()}
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  disabled={mutation.isLoading}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  {mutation.isLoading ? "Creando plan ..." : "Crear plan"}
                </button>
              </div>
            </div>
          </form>
        </SectionBloc>
      </div>
    </>
  );
};

NuevoUsuario.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default NuevoUsuario;
