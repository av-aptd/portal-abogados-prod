import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useLayoutEffect, useRef, useState } from "react";
import type { ReactElement } from "react";

import Head from "next/head";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePortalStore } from "store/portal";
import { formatDate, getSettingsSecure } from "shared/helpers";
import { useRouter } from "next/router";
import clsx from "clsx";
import LoadingContainer from "components/portal/loading";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import ListLeads from "components/portal/leads/listLeads";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  surname: string;
  debtValue: string;
  isNotified: boolean;
  created_at: string;
  source: string;
  status: string;
}

const Marketing: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isNotified, setIsNotified] = useState(-1);
  const [source, setSource] = useState("");
  const [debt, setDebt] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const getLeads = async (
    isNotified: number,
    source: string,
    startDate: Date | null,
    endDate: Date | null,
    debt: string,
    status: string
  ) => {
    let query = ``;

    if (isNotified != -1) {
      query += `isNotified=${isNotified}`;
    }

    if (source != "") {
      query += `&source=${source}`;
    }

    if (debt != "") {
      query += `&debtvalue=${debt}`;
    }

    if (status != "") {
      query += `&status=${status}`;
    }

    if (startDate != null) {
      query += `&fromCreated_at=${startDate.toISOString().split("T")[0]}`;
    }

    if (endDate != null) {
      query += `&toCreated_at=${endDate.toISOString().split("T")[0]}`;
    }

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/leads?${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${profile.token}`,
        },
      }
    );

    return await resp.json();
  };

  const { data: leads, isLoading } = useQuery({
    queryKey: ["leads", isNotified, source, startDate, endDate, debt, status],
    queryFn: () =>
      getLeads(isNotified, source, startDate, endDate, debt, status),
  });

  const checkbox = useRef<HTMLInputElement | null | undefined>();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);

  // useLayoutEffect(() => {
  //   // const isIndeterminate =
  //   //   selectedLeads.length > 0 && selectedLeads.length < leads.length;
  //   // setChecked(selectedLeads.length === leads.length);
  //   // setIndeterminate(isIndeterminate);
  //   // checkbox.current.indeterminate = isIndeterminate;
  // }, [selectedLeads]);

  function toggleAll() {
    setSelectedLeads(checked || indeterminate ? [] : leads);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  async function sendNotification() {
    let messages = [];

    for (const lead of selectedLeads as Lead[]) {
      messages.push({
        internalId: lead.id,
        source: "Leads",
        From: "noreply@abogadosparatusdeudas.es",
        To: lead.email,
        TemplateAlias: "email-notificacion",
        templateModel: {
          subject: "Bienvenido a Abogados para tus deudas",
          name: lead.name,
          message: "Gracias por registrarte en Abogados para tus deudas",
        },
        messageStream: "outbound",
      });
    }

    const options = getSettingsSecure(
      "POST",
      profile.token,
      JSON.stringify(messages)
    );

    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/email-notification/bulk`,
      options
    );

    queryClient.invalidateQueries({ queryKey: ["leads"] });
  }

  const getSourceName = (source: string) => {
    switch (source) {
      case "estudio":
        return "Estudio Económico";
      case "formulario":
        return "Formulario Web";
      case "afiliado":
        return "Afiliado";
      default:
        return "Formulario Web";
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case "NEW":
        return "Nuevo";
      case "OPEN":
        return "Abierto";
      case "IN_PROGRESS":
        return "En curso";
      case "OPEN_DEAL":
        return "Negocio abierto";
      case "UNQUALIFIED":
        return "No cualificado";
      case "ATTEMPTED_TO_CONTACT":
        return "Intento de Contacto";
      case "CONNECTED":
        return "Conectado";
      case "BAD_TIMING":
        return "Mal momento";
    }
  };

  return (
    <div className="mx-auto max-w-7xl py-6">
      <Head>
        <title>Marketing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ListLeads />
      {/* <div className="pt-6">
        <h1 className="font-bold text-2xl mb-2 text-primary">Marketing</h1>
        <div className="">
          <div className="">
            <div className="flex items-center space-x-4 pb-8">
              <h1 className="text-xl font-semibold text-gray-700">
                Listado de leads
              </h1>
              {selectedLeads.length > 0 && (
                <div className="bg-primary/20 text-primary font-medium w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {selectedLeads.length}
                </div>
              )}
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Canal
                </label>
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                  defaultValue=""
                  onChange={(e) => setSource(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="formulario">Formulario Web</option>
                  <option value="estudio">Estudio económico</option>
                  <option value="afiliado">Afiliado</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estado
                </label>
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                  defaultValue=""
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="NEW">Nuevo</option>
                  <option value="OPEN">Abierto</option>
                  <option value="IN_PROGRESS">En curso</option>
                  <option value="OPEN_DEAL">Negocio abierto</option>
                  <option value="UNQUALIFIED">No cualificado</option>
                  <option value="ATTEMPTED_TO_CONTACT">
                    Intento de Contacto
                  </option>

                  <option value="CONNECTED">Conectado</option>
                  <option value="BAD_TIMING">Mal momento</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Valor deuda
                </label>
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                  defaultValue=""
                  onChange={(e) => setDebt(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="Más de 15.000€">Más de 15.000€</option>
                  <option value="Entre 5.000€ y 15.000€">
                    Entre 5.000€ y 15.000€
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notificado
                </label>
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                  defaultValue=""
                  onChange={(e) => setIsNotified(Number(e.target.value))}
                >
                  <option value="-1">Seleccionar</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="expirationDate"
                  className="block text-sm font-medium text-gray-900"
                >
                  Desde
                </label>
                <div className="mt-1">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="expirationDate"
                  className="block text-sm font-medium text-gray-900"
                >
                  Hasta
                </label>
                <div className="mt-1">
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  {selectedLeads.length > 0 && (
                    <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                      <button
                        onClick={() => sendNotification()}
                        type="button"
                        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Enviar email
                      </button>
                      {/* <button
                        type="button"
                        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Delete all
                      </button> 
                    </div>
                  )}
                  <table className="min-w-full table-fixed divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="relative w-12 px-6 sm:w-16 sm:px-8"
                        >
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary sm:left-6"
                            // ref={checkbox}
                            checked={checked}
                            onChange={toggleAll}
                          />
                        </th>
                        <th
                          scope="col"
                          className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                          Nombre
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Apellidos
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Teléfono
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Estado
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Valor deuda
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Creado el
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Canal
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                        >
                          Notificado
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {isLoading ? (
                        <tr>
                          <td colSpan={10}>
                            <LoadingContainer />
                          </td>
                        </tr>
                      ) : (
                        <>
                          {leads.map((lead: Lead) => (
                            <tr
                              key={lead.id}
                              className={
                                selectedLeads.includes(lead)
                                  ? "bg-gray-50"
                                  : undefined
                              }
                            >
                              <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                {selectedLeads.includes(lead) && (
                                  <div className="absolute inset-y-0 left-0 w-0.5 bg-secondary" />
                                )}
                                <input
                                  type="checkbox"
                                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary sm:left-6"
                                  value={lead.email}
                                  checked={selectedLeads.includes(lead)}
                                  onChange={(e) =>
                                    setSelectedLeads(
                                      e.target.checked
                                        ? [...selectedLeads, lead]
                                        : selectedLeads.filter(
                                            (p) => p !== lead
                                          )
                                    )
                                  }
                                />
                              </td>
                              <td
                                className={clsx(
                                  "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                                  selectedLeads.includes(lead)
                                    ? "text-secondary"
                                    : "text-gray-900"
                                )}
                              >
                                {lead.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {lead.surname}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {lead.email}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {lead.phone}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {getStatusName(lead.status)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {lead.debtValue}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {formatDate(
                                  lead.created_at,
                                  "medium",
                                  router.locale
                                )}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {getSourceName(lead.source)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                                {lead.isNotified ? (
                                  <span className="text-green-800 bg-green-200 px-4 rounded-full py-1 text-xs">
                                    Sí
                                  </span>
                                ) : (
                                  <span className="text-red-800 bg-red-200 px-4 rounded-full py-1 text-xs">
                                    No
                                  </span>
                                )}
                              </td>

                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a
                                  href="#"
                                  className="text-secondary hover:text-indigo-900"
                                >
                                  {/* Edit 
                                  <span className="sr-only">, {lead.name}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

Marketing.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Marketing;
