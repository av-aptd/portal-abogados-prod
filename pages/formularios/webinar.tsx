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
import { formatDate, formatTime, getSettings } from "shared/helpers";
import { useRouter } from "next/router";

const FormularioWebinar: NextPageWithLayout = () => {
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeData, setAgreeData] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<any>([]);

  const { showModal, setInfo } = useUIStore(
    (state) => ({
      showModal: state.showModal,
      setInfo: state.setInfo,
    }),
    shallow
  );

  useEffect(() => {
    if (router.isReady) {
      getInfoWebinar();
    }
  }, [router.query]);

  let getOptions = {};

  const getInfoWebinar = async () => {
    getOptions = getSettings("GET");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/webinars/${router.query.id}`,
      getOptions
    );
    const data = await response.json();
    setData(data);
  };

  const mutation = useMutation({
    mutationFn: async (data) =>
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/webinars/${router.query.id}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      ),
  });

  const { register, handleSubmit, reset, formState } = useForm();
  const onSubmit = async (data: any) => {
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
      mutation.mutate(data);
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
            Regístrate al webinar
          </h1>
          <p className="text-sm text-gray-500">
            Próximo {formatDate(data.date, "noYear", "es")} a las{" "}
            {formatTime(data.date, "es")}h.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 lg:px-0 pt-10">
        {!mutation.isSuccess ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <div className="">
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

            <div className="">
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

            <div className="sm:col-span-2">
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
                disabled={formState.isSubmitting}
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary/80 disabled:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                {mutation.isLoading ? "Registrando..." : "Registrar al webinar"}
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
            <p className="text-gray-700">Registrado al webinar correctamente</p>
          </div>
        )}
      </div>
    </div>
  );
};

FormularioWebinar.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default FormularioWebinar;
