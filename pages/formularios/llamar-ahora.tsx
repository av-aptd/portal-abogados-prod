import type { NextPageWithLayout } from "../_app";
import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";
import Head from "next/head";
import LoginLayout from "components/layouts/login";
import { useForm } from "react-hook-form";
import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { CallNow } from "components/icons";
import shallow from "zustand/shallow";
import { useUIStore } from "store/ui";
import { useMutation } from "@tanstack/react-query";
import { getSettings } from "shared/helpers";

const CallNowForm: NextPageWithLayout = () => {
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const { showModal, setInfo } = useUIStore(
    (state) => ({
      showModal: state.showModal,
      setInfo: state.setInfo,
    }),
    shallow
  );

  let options = {};

  const mutation = useMutation({
    mutationFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/leads`, options),
  });

  const { register, handleSubmit, reset, formState } = useForm();
  const onSubmit = async (data: any) => {
    const phoneFormatted = (data.prefix + data.phone).trim();

    if (!agreePrivacy) {
      setInfo({
        title: "Aceptar términos",
        message:
          "Debe aceptar los términos y condiciones para poder continuar.",
        icon: "bad",
        textButton: "Cerrar",
        type: "alert",
      });
      showModal();
    } else {
      options = getSettings(
        "POST",
        JSON.stringify({
          phone: phoneFormatted,
          callNow: true,
          source: "formulario-callNow",
        })
      );
      mutation.mutate();
      reset();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Formulario de llamar ahora</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="mx-auto max-w-2xl px-4 lg:px-0 pt-10">
        <div>
          {!mutation.isSuccess ? (
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0"
              >
                <div className="flex-1">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <label htmlFor="prefix" className="sr-only">
                        prefix
                      </label>
                      <select
                        {...register("prefix", { required: true })}
                        id="prefix"
                        name="prefix"
                        autoComplete="country"
                        className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-8 text-gray-500 focus:border-secondary focus:ring-secondary"
                      >
                        <option value="+34">+34</option>
                        <option value="+33">+33</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                      </select>
                    </div>
                    <input
                      {...register("phone", { required: true })}
                      type="text"
                      name="phone"
                      id="phone"
                      className="block w-full rounded-md border-gray-300 pl-20  py-3 pr-4 focus:border-secondary focus:ring-secondary"
                      placeholder=""
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={mutation.isLoading}
                    type="submit"
                    className="inline-flex w-full lg:w-auto items-center justify-center rounded-md border border-transparent bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary/80 disabled:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                  >
                    {mutation.isLoading ? "Enviando datos..." : "Te llamamos"}
                  </button>
                </div>
              </form>
              <div className="sm:col-span-2 mt-8 bg-white border p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Switch
                      checked={agreePrivacy}
                      onChange={setAgreePrivacy}
                      className={clsx(
                        agreePrivacy ? "bg-secondary" : "bg-gray-200",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                      )}
                    >
                      <span className="sr-only">Agree to policies</span>
                      <span
                        aria-hidden="true"
                        className={clsx(
                          agreePrivacy ? "translate-x-5" : "translate-x-0",
                          "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        )}
                      />
                    </Switch>
                  </div>
                  <div className="ml-6">
                    <p className=" text-gray-500 text-xs">
                      Acepto el uso de mis datos para la gestión del registro de
                      usuario, de la relación comercial y ejecución del
                      contrato, en su caso. Consultar{" "}
                      <a
                        href="https://abogadosparatusdeudas.es/politica-de-privacidad/"
                        className="font-medium text-gray-700 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Política de privacidad.
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center bg-white p-8 rounded-lg shadow flex justify-center">
              <div className="flex items-center">
                <CallNow
                  className="h-8 w-8 text-secondary"
                  aria-hidden="true"
                />

                <p className="text-gray-700 pl-4">
                  Ahora nos ponemos en contacto contigo.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CallNowForm.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default CallNowForm;
