import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ring } from "@uiball/loaders";
import { addCreditCard } from "apis/payments";
import { useRouter } from "next/router";
import { usePortalStore } from "store/portal";
import { getStripeCustomerId } from "apis/leads";
import { getClientAddress } from "apis/client";
import { getProvinceName } from "vars/shared";
import { getProfile } from "apis/auth";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Warning } from "components/icons";

const schema = z
  .object({
    number: z.string().length(16, { message: "Formato tarjeta incorrecto" }),
    exp_month: z.number().gt(0).lte(12, { message: "Mes erróneo" }),
    exp_year: z
      .number()
      .gte(new Date().getFullYear(), { message: "Año erróneo" })
      .lte(2040, { message: "Año erróneo" }),
    cvc: z.string().length(3),
    default: z.boolean(),
  })
  .required();

type formData = z.infer<typeof schema>;

const CCForm = ({ action }: any) => {
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);

  const [errorMessage, setErrorMessage] = React.useState<string | null>("");

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: async (data) => addCreditCard(profile.token, profile.id, data),
    onSuccess: async (data) => {
      if (data.statusCode === 402) {
        switch (data.message) {
          case "Your card number is incorrect.":
            setErrorMessage("El número de la tarjeta es incorrecto");
            break;
          case "Your card was declined.":
            setErrorMessage("La tarjeta ha sido rechazada");
            break;
          case "Your card has expired.":
            setErrorMessage("La tarjeta ha expirado");
            break;
          case "Your card has insufficient funds.":
            setErrorMessage("La tarjeta no tiene fondos suficientes.");
            break;
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
        action();
      }
    },
  });

  const onSubmit = async (data: any) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="border-b p-4">
        <h3>Añadir tarjeta</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 grid lg:grid-cols-3 gap-x-4 gap-y-6 p-4">
          <div className="lg:col-span-3">
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700"
            >
              Número de la tarjeta
            </label>
            <div className="mt-1">
              <input
                {...register("number")}
                type="text"
                id="number"
                name="number"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
              />
              {errors.number && (
                <p className="text-red-400 text-sm pt-1 pl-2">
                  {errors.number.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="exp_month"
              className="block text-sm font-medium text-gray-700"
            >
              Mes expiración
            </label>
            <div className="mt-1">
              <input
                {...register("exp_month", { valueAsNumber: true })}
                type="text"
                name="exp_month"
                id="exp_month"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
              />
              {errors.exp_month && (
                <p className="text-red-400 text-sm pt-1 pl-2">
                  {errors.exp_month.message}
                </p>
              )}
            </div>
          </div>
          <div className="">
            <label
              htmlFor="exp_year"
              className="block text-sm font-medium text-gray-700"
            >
              Año expiración
            </label>
            <div className="mt-1">
              <input
                {...register("exp_year", { valueAsNumber: true })}
                type="text"
                name="exp_year"
                id="exp_year"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
              />
              {errors.exp_year && (
                <p className="text-red-400 text-sm pt-1 pl-2">
                  {errors.exp_year.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="cvc"
              className="block text-sm font-medium text-gray-700"
            >
              CVC
            </label>
            <div className="mt-1">
              <input
                {...register("cvc")}
                type="text"
                name="cvc"
                id="cvc"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
              />
              {errors.cvc && (
                <p className="text-red-400 text-sm pt-1 pl-2">
                  {errors.cvc.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <section aria-labelledby="billing-heading" className="mt-4 px-4">
          <div className="mt-6 flex items-center">
            <input
              {...register("default")}
              id="default"
              name="default"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
            />
            <div className="ml-2">
              <label
                htmlFor="same-as-shipping"
                className="text-sm font-medium text-gray-500"
              >
                Marcar como tarjeta por defecto
              </label>
            </div>
          </div>
        </section>

        {errorMessage != "" && (
          <div className="flex items-center space-x-3 p-2 mt-4 rounded-md border border-red-400 bg-red-50">
            <Warning className="w-5 h-5 text-red-400" />
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        <div className="mt-8 border-t flex justify-end space-x-4 p-4">
          <button
            type="button"
            className="bg-white text-gray-500 text-sm px-4 py-2 border rounded-md hover:bg-gray-50 duration-200"
            onClick={() => action()}
          >
            Cerrar
          </button>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className="inline-flex items-center w-40 justify-center rounded-md border border-transparent bg-secondary px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
          >
            {mutation.isLoading ? <Ring size={16} color="#fff" /> : "Añadir"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CCForm;
