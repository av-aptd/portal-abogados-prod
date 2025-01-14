import type { NextPageWithLayout } from "../_app";
import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";
import Head from "next/head";
import LoginLayout from "components/layouts/login";
import { useForm } from "react-hook-form";
import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { Check } from "components/icons";
import shallow from "zustand/shallow";
import { useUIStore } from "store/ui";
import { useMutation } from "@tanstack/react-query";
import { getSettings } from "shared/helpers";
import { useRouter } from "next/router";

const Formulario: NextPageWithLayout = () => {
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeData, setAgreeData] = useState(false);

  const router = useRouter();

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const phoneFormatted = (data.prefix + data.phone).trim();

    if (!agreePrivacy) {
      setInfo({
        title: "Aceptar términos",
        message:
          "Debe aceptar los términos y condiciones para poder continuar.",
        icon: "bad",
        textButton: "Cerrar",
      });
      showModal();
    } else {
      options = getSettings(
        "POST",
        JSON.stringify({
          email: data.email,
          name: data.name,
          surname: data.surname,
          phone: phoneFormatted,
          debtValue: data.debtValue,
          callNow: false,
          isNotified: false,
          source: "formulario-afiliado",
          affiliate: router.query.affiliate,
          templateAlias: "welcome-lead",
          notification: {
            subject: "Bienvenido/a al despacho Abogados para tus deudas",
            message: null,
            name: data.name,
          },
        })
      );
      mutation.mutate();
      reset();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Formulario de captación de leads</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="pt-10 flex justify-center text-center px-8">
        <div>
          <h1 className="font-bold text-3xl mb-2 text-secondary text-center">
            Contacta con nosotros
          </h1>
          <p className="text-sm text-gray-500">
            Un abogado de nuestro equipo te asesorará personalmente de forma
            gratuita
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 lg:px-0 pt-10">
        {!mutation.isSuccess ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <div className="mt-1">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-secondary focus:ring-secondary"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="surname"
                className="block text-sm font-medium text-gray-700"
              >
                Apellidos
              </label>
              <div className="mt-1">
                <input
                  {...register("surname", { required: true })}
                  type="text"
                  name="surname"
                  id="surname"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-secondary focus:ring-secondary"
                />
              </div>
            </div>

            <div className="">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
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

            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register("email", { required: true })}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-secondary focus:ring-secondary"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="debtValue"
                className="block text-sm font-medium text-gray-700"
              >
                Valor de tus deudas
              </label>
              <select
                {...register("debtValue", { required: true })}
                id="debtValue"
                name="debtValue"
                className="mt-1 block w-full rounded-md border-gray-300 py-3.5 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                defaultValue="Canada"
              >
                <option>10.000€ a 15.000€</option>
                <option>15.000€ a 20.000€</option>
                <option>Más de 20.000€</option>
              </select>
            </div>

            <div className="sm:col-span-2">
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
                <div className="ml-3">
                  <p className=" text-gray-500 text-xs">
                    Autorizo el tratamiento de mis datos para el asesoramiento
                    de los servicios. Para ello acepto{" "}
                    <a
                      href="https://abogadosparatusdeudas.es/politica-de-privacidad"
                      className="font-medium text-gray-700 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de privacidad*
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Switch
                    checked={agreeData}
                    onChange={setAgreeData}
                    className={clsx(
                      agreeData ? "bg-secondary" : "bg-gray-200",
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                    )}
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className={clsx(
                        agreeData ? "translate-x-5" : "translate-x-0",
                        "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </div>
                <div className="ml-3">
                  <p className=" text-gray-500 text-xs">
                    Autorizo el uso de mis datos para la{" "}
                    <a
                      href="https://abogadosparatusdeudas.es/politica-de-privacidad"
                      className="font-medium text-gray-700 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      gestión del registro de usuario
                    </a>
                    , de la relación comercial y ejecución del contrato, en su
                    caso.** .
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                disabled={mutation.isLoading}
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary/80 disabled:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                {mutation.isLoading ? "Enviando datos..." : "Enviar formulario"}
              </button>
            </div>
            <div className="sm:col-span-2 pt-4">
              <p className=" text-gray-400 text-xs text-center">
                Responsable del fichero: CORMEUM GLOBAL, SL.. Finalidad: el
                asesoramiento de nuestros servicios. Legitimación:
                consentimiento. Destinatarios: No se comunicarán los datos a
                terceros. Derechos: acceder, rectificar y suprimir los datos,
                así como otros derechos, como se explica en la información
                adicional. Puede consultar información adicional y detallada en
                nuestra{" "}
                <a
                  href="https://abogadosparatusdeudas.es/politica-de-privacidad/"
                  className="font-medium text-gray-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de privacidad*
                </a>
              </p>
            </div>
          </form>
        ) : (
          <div className="text-center bg-white p-8 rounded-lg shadow">
            <div className="flex justify-center pb-6">
              <Check className="h-20 w-20 text-green-400" aria-hidden="true" />
            </div>
            <p className="text-gray-700">Formulario recibido correctamente</p>
          </div>
        )}
      </div>
    </div>
  );
};

Formulario.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default Formulario;
