import SectionBloc from "components/layouts/components/section/sectionBloc";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "apis/users";

import { usePortalStore } from "store/portal";
import Link from "next/link";
import { useRouter } from "next/router";
import { Close, Search } from "components/icons";
import { getTenants } from "apis/tenants";
import { getTenantName } from "vars/shared";
import Pagination from "components/portal/pagination";
import LoadingContainer from "components/portal/loading";
import { getReport } from "apis/reports";
import { formatDate } from "shared/helpers";

const ListReportFAC_RE = ({ section }: any) => {
  const [operator, setOperator] = useState("eq");
  const [limit, setLimit] = useState(50);
  const [group, setGroup] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const profile = usePortalStore((state) => state.profile);
  const { pathname } = useRouter();
  const [name, setName] = useState("");
  const [filter, setFilter] = useState<any>("fullname");
  const [tenants, setTenants] = useState<any>(null);

  const reportQuery = useQuery(["reports"], () =>
    getReport({ reportName: "FAC_RE" })
  );

  const filterUsers = (term: any, value: any) => {
    if (term == "name") {
      setName(value);
    }

    if (term == "group") {
      if (value == "") {
        setGroup(1);
        setOperator("neq");
      } else {
        setGroup(value);
        setOperator("eq");
      }
    }

    // if (term == "limit") {
    //   queryParams += `limit=${value}`;
    //   setLimit(value);
    //   setCurrentPage(1);
    // }

    // if (term == "page") {
    //   queryParams += `limit=${value}`;
    //   setCurrentPage(value);
    // }

    reportQuery.refetch();
  };

  // const nextPage = () => {
  //   if (currentPage == Math.ceil(userQuery.data?.total / limit)) return false;
  //   setCurrentPage(currentPage + 1);
  // };

  // const prevPage = () => {
  //   if (currentPage == 1) return false;
  //   setCurrentPage(currentPage - 1);
  // };

  const selectPage = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="bg-white rounded-lg">
        {/* <div className="flex flex-col lg:flex-row justify-between lg:items-center lg:space-x-4 space-y-4 lg:space-y-0 "> */}
        {/* <div className="flex-1">
            <div className="flex rounded-md bg-gray-50">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => filterUsers("name", e.target.value)}
                  className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                  placeholder={`Buscar por ${
                    filter == "fullname"
                      ? "nombre y apellido"
                      : filter == "phonenumber"
                      ? "teléfono"
                      : filter == "emailaddress"
                      ? "email"
                      : filter == "dni"
                      ? "DNI"
                      : ""
                  } `}
                />
              </div>
              <button
                type="button"
                onClick={() => setName("")}
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <Close
                  className="-ml-0.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div> */}

        {/* <div>
            <select
              id="size"
              name="size"
              className="block w-50 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-500 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="fullname">Filtrar por</option>
              <option value="fullname">Nombre y apellido</option>
              <option value="phonenumber">Teléfono</option>
              <option value="emailaddress">Email</option>
              <option value="dni">DNI</option>
            </select>
          </div>

          <div>
            <select
              id="size"
              name="size"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-500 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
              onChange={(e) => filterUsers("limit", e.target.value)}
            >
              <option value="10">Registros por página</option>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div> */}
        {/* </div> */}

        {/* <div className="flow-root"> */}
        {/* <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 relative"> */}
        <div className="bg-white px-4">
          <table className="min-w-full divide-y divide-gray-300 relative">
            <thead className="sticky top-16 bg-white border-b">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Cliente
                </th>

                <th
                  scope="col"
                  className="whitespace-nowrap py-3.5 px-3 text-right text-sm font-semibold text-gray-900"
                >
                  Pendiente
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap py-3.5 px-3 text-right text-sm font-semibold text-gray-900"
                >
                  Cuotas sin pagar
                </th>

                <th
                  scope="col"
                  className="whitespace-nowrap py-3.5 px-3 text-right text-sm font-semibold text-gray-900"
                >
                  Creación contrato
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap py-3.5 px-3 text-right text-sm font-semibold text-gray-900"
                >
                  Última cuota pagada
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap py-3.5 px-3 text-right text-sm font-semibold text-gray-900"
                >
                  Último pago realizado
                </th>

                {/* <th
              scope="col"
              className="whitespace-nowrap py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
            >
              Situación pago
            </th> */}
                <th
                  scope="col"
                  className="whitespace-nowrap py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  Estado expediente
                </th>

                <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {reportQuery.isLoading ? (
                <tr>
                  <td colSpan={6} className="py-4">
                    <LoadingContainer />
                  </td>
                </tr>
              ) : (
                <>
                  {reportQuery.data.length > 0 ? (
                    <>
                      {reportQuery.data.map((person: any) => (
                        <tr key={person.id}>
                          <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm  text-gray-900 sm:pl-0">
                            <div>
                              <p className="font-medium">
                                {person.client_name}
                              </p>
                              <p className="text-gray-400">
                                {person.client_phone}
                              </p>
                              <p className="text-gray-400">
                                {person.client_email}
                              </p>
                            </div>
                          </td>

                          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-center">
                            {person.remainingamount
                              .toFixed(0)
                              .toLocaleString("es_AR")}
                            €
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-center">
                            {person.non_payments}
                          </td>

                          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-center">
                            {formatDate(person.startdate, "short", "es")}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-center">
                            {formatDate(
                              person.first_installment_not_paid,
                              "short",
                              "es"
                            )}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-center">
                            {formatDate(
                              person.last_payment_date,
                              "short",
                              "es"
                            )}
                          </td>

                          <td className=" py-4 px-3 text-sm text-gray-500">
                            {person.process_status}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                            <Link
                              href={`${pathname}/${person.id}`}
                              className="text-secondary hover:text-secondary/80"
                            >
                              Ver
                              <span className="sr-only">, {person.name}</span>
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

        {/* </div>
      </div> */}
        {/* </div> */}
      </div>
      {/* <Pagination
        total={userQuery.data ? userQuery.data.total : 0}
        limit={limit}
        nextPage={nextPage}
        prevPage={prevPage}
        selectPage={selectPage}
        currentPage={currentPage}
      /> */}
    </>
  );
};

export default ListReportFAC_RE;
