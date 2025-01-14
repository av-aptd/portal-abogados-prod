import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Pagination from "../pagination";
import LoadingContainer from "../loading";
import { usePortalStore } from "store/portal";
import Link from "next/link";
import { useRouter } from "next/router";
import { Add } from "components/icons";
import { getLeads } from "apis/leads";
import { formatDate } from "shared/helpers";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import { useUIStore } from "store/ui";
import { getTickets, getAllTickets } from "apis/tickets";
import { getListGroups, getUsers } from "apis/users";
import ChipTicket from "./chip";
import clsx from "clsx";
import { ta } from "date-fns/locale";

const ListIncidents = () => {
  const profile = usePortalStore((state) => state.profile);
  const { pathname } = useRouter();
  const showNewIncident: any = useUIStore((state) => state.showNewIncident);
  const [filterStatus, setFilterStatus] = useState("all");
  const [all, setAll] = useState(true);

  const incidenciasQuery = useQuery({
    queryKey: [
      "incidencias",
      `searchBy=fullName&searchValue=""&limit=50&page=1`,
    ],
    queryFn: async () =>
      getTickets(
        profile.token,
        `searchBy=fullName&searchValue=""&limit=50&page=1`
      ),
  });

  const tabs = [
    { name: "Todas", value: "all" },
    { name: "Abiertas", value: "open" },
    { name: "En revisión", value: "in progress" },
    { name: "Resueltas", value: "resolved" },
    { name: "Cerradas", value: "closed" },
    { name: "Rechazadas", value: "rejected" },
  ];

  const filterByStatus = (status: any) => {
    if (status == "all") {
      setAll(true);
    } else {
      setAll(false);
    }
    setFilterStatus(status);
  };

  const userQuery = useQuery({
    queryKey: ["usersListAPTD", "group=1&op=neq&limit=100&page=1"],
    queryFn: async () =>
      getUsers(profile.token, "group=1&op=neq&limit=100&page=1"),
  });

  const nameUser = (id: any) => {
    const user = userQuery.data?.users.find((user: any) => user.id == id);
    const name = user?.name + " " + user?.surname;
    return name;
  };

  const groupsQuery = useQuery({
    queryKey: ["groupsListAPTD"],
    queryFn: async () => getListGroups(profile.token),
  });

  const nameGroup = (id: any) => {
    const group = groupsQuery.data?.find((group: any) => group.id == id);
    const name = group?.name;
    return name;
  };

  return (
    <>
      <ComplexSectionBloc>
        <HeaderSection
          title="Incidencias"
          description="Listado de incidencias"
          hasActions
        >
          <button
            className="text-white text-sm px-6 py-2 rounded-md flex justify-center items-center bg-secondary"
            onClick={() => showNewIncident()}
          >
            <Add className="h-5 w-5 mr-2" />
            Nueva incidencia
          </button>
        </HeaderSection>
        <BodySection>
          <div className=" ">
            <div className="mb-4">
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                  onChange={(e: any) => filterByStatus(e.target.value)}
                  // defaultValue={tabs.find((tab) => tab.current)?.name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.value} value={tab.value}>
                      {tab.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <div
                        key={tab.value}
                        onClick={() => filterByStatus(tab.value)}
                        className={clsx(
                          tab.value == filterStatus
                            ? "border-secondary text-secondary"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                          "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer"
                        )}
                      >
                        {tab.name}
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="flow-root">
            <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Número
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Título
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Tipo
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Creado
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Creado por
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Asignado a
                      </th>

                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-6 sm:pr-0"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {incidenciasQuery.isLoading ? (
                      <tr>
                        <td colSpan={6} className="py-4">
                          <LoadingContainer />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {incidenciasQuery.data.length > 0 ? (
                          <>
                            {incidenciasQuery.data
                              .filter((e: any) =>
                                all
                                  ? e.ticket_type != 0
                                  : e.status == filterStatus
                              )
                              .map((ticket: any) => (
                                <tr key={ticket.id}>
                                  <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                    {ticket.id.slice(0, 8)}
                                  </td>
                                  <td className="py-4 px-3 text-sm text-gray-500 w-96">
                                    {ticket.title}
                                  </td>
                                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    <div>
                                      <span
                                        className={clsx(
                                          ticket.ticket_type == 1
                                            ? "bg-red-100 text-red-800"
                                            : ticket.ticket_type == 2
                                            ? "bg-green-100 text-green-800"
                                            : "bg-indigo-100 text-indigo-800",
                                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium "
                                        )}
                                      >
                                        {ticket.ticket_type == 1 &&
                                          "Fallo portal"}
                                        {ticket.ticket_type == 2 &&
                                          "Mejora portal"}
                                        {ticket.ticket_type == 3 &&
                                          "Incidencia expediente"}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap py-4 px-2 text-sm text-gray-500">
                                    {formatDate(
                                      ticket.created_at,
                                      "short",
                                      "es"
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap py-4 px-2 text-sm text-gray-500">
                                    <ChipTicket status={ticket.status} />
                                  </td>
                                  <td className="whitespace-nowrap py-4 px-2 text-sm text-gray-500">
                                    {ticket.created_by_user}
                                  </td>

                                  <td className="whitespace-nowrap py-4 px-2 text-sm text-gray-500">
                                    {nameGroup(ticket.assigned_to_group_id)}
                                  </td>

                                  <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                                    <Link
                                      href={`${pathname}/${ticket.id}`}
                                      className="text-secondary hover:text-secondary/80"
                                    >
                                      Ver
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                          </>
                        ) : (
                          <tr>
                            <td colSpan={7} className="py-8">
                              <p className="text-sm text-gray-500 text-center">
                                No se han encontrado resultados
                              </p>
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </BodySection>
      </ComplexSectionBloc>
    </>
  );
};

export default ListIncidents;
