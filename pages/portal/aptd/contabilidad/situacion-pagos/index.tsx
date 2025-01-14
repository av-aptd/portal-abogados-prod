import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { Close, Search } from "components/icons";
import Head from "next/head";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { usePortalStore } from "store/portal";
import clsx from "clsx";
import { addManualPayment, getPaymentsSituation } from "apis/payments";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Link from "next/link";
import LoadingContainer from "components/portal/loading";
import Pagination from "components/portal/pagination";
registerLocale("es", es);
import { utils, writeFileXLSX, writeXLSX } from "xlsx";

const ContabilidadHome: NextPageWithLayout = () => {
  const [filters, setFilters] = useState<any>([
    "PARALIZADO POR IMPAGO",
    "CERRADO POR IMPAGO",
    "IMPAGADO",
  ]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const profile = usePortalStore((state) => state.profile);
  const [operator, setOperator] = useState("eq");
  const [limit, setLimit] = useState(10000);
  const [group, setGroup] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState<any>("fullname");

  var queryParams = `searchBy=${filter}&searchValue=${name}&limit=${limit}&page=${currentPage}`;

  const paymentsSituationQuery = useQuery(
    ["UsersPaymentSituation", queryParams],
    () => getPaymentsSituation(profile.token, queryParams)
  );

  console.log(paymentsSituationQuery.data);

  const filterUsers = (term: any, value: any) => {
    if (term == "name") {
      setName(value);
    }

    if (term == "limit") {
      queryParams += `limit=${value}`;
      setLimit(value);
      setCurrentPage(1);
    }

    if (term == "page") {
      queryParams += `limit=${value}`;
      setCurrentPage(value);
    }

    paymentsSituationQuery.refetch();
  };

  const addFilter = (filter: any) => {
    if (filters.includes(filter)) {
      setFilters((prev: any) => prev.filter((f: any) => f !== filter));
    } else {
      setFilters((prev: any) => [...prev, filter]);
    }
  };

  const isInArray = (filter: any) => filters.includes(filter);

  useEffect(() => {
    if (paymentsSituationQuery.data) {
      getStatusPayments();
      cuotasImpagadas();
    }
  }, [filters, paymentsSituationQuery.data]);

  const getStatusPayments = () => {
    if (filters.length === 0) {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(
        paymentsSituationQuery.data.filter((payment: any) =>
          filters.includes(payment.payment_situation)
        )
      );
    }
  };

  const cuotasImpagadas = () => {
    const cuotas = filteredUsers.reduce(
      (acc: any, currentValue: any) => acc + currentValue.non_payments,
      0
    );

    return cuotas;
  };

  const nextPage = () => {
    if (currentPage == Math.ceil(paymentsSituationQuery.data?.total / limit))
      return false;
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage == 1) return false;
    setCurrentPage(currentPage - 1);
  };

  const selectPage = (page: any) => {
    setCurrentPage(page);
  };

  const getFormattedData = () => {
    let formattedData: any[] = [];

    filteredUsers.forEach((user: any) => {
      formattedData.push({
        nombre: user.client_name,
        email: user.client_email,
        telefono: user.client_phone,
      });
    });

    return formattedData;
  };

  const downloadExcel = async () => {
    const finalData = getFormattedData();
    const worksheet = utils.json_to_sheet(finalData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Dates");

    utils.sheet_add_aoa(worksheet, [["Nombre", "email", "teléfono"]], {
      origin: "A1",
    });

    const a = writeFileXLSX(
      workbook,
      "listado-usuarios-al-corriente-pagos.xlsx",
      {
        compression: true,
      }
    );

    // const b = writeXLSX(workbook, {
    //   type: "buffer",
    //   compression: true,
    //   bookType: "xlsx",
    // });
  };

  return (
    <>
      <Head>
        <title>Contabilidad</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="pt-6 mx-auto max-w-7xl">
        <SectionBloc
          title="Situación de pagos"
          description="Listado de la situación de pagos de los clientes."
        >
          <div className="p-4 border rounded-lg mb-4">
            <div className=" rounded-lg flex justify-between items-center">
              <div className="flex space-x-8">
                <p className="text-gray-500 text-sm">
                  <span className="font-bold text-lg text-gray-700">
                    {filteredUsers &&
                      filteredUsers.length.toLocaleString("es-AR")}
                  </span>{" "}
                  clientes seleccionados
                </p>

                <p className="text-gray-500 text-sm">
                  <span className="font-bold text-lg text-gray-700">
                    {filteredUsers && cuotasImpagadas().toLocaleString("es-AR")}
                  </span>{" "}
                  cuotas impagadas
                </p>

                <p className="text-gray-500 text-sm">
                  <span className="font-bold text-lg text-gray-700">
                    {filteredUsers &&
                      (cuotasImpagadas() * 252).toLocaleString("es-AR")}
                  </span>{" "}
                  euros
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="isolate inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => addFilter("CORRIENTE DE PAGO")}
                    className={clsx(
                      "relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 focus:z-10",
                      isInArray("CORRIENTE DE PAGO")
                        ? "bg-secondary  text-white ring-secondary"
                        : "bg-white text-gray-500"
                    )}
                  >
                    Al corriente
                  </button>

                  <button
                    type="button"
                    onClick={() => addFilter("CERRADO POR IMPAGO")}
                    className={clsx(
                      "relative -ml-px inline-flex items-center px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 focus:z-10",
                      isInArray("CERRADO POR IMPAGO")
                        ? "bg-secondary  text-white ring-secondary"
                        : "bg-white text-gray-500"
                    )}
                  >
                    Cerrado
                  </button>
                  <button
                    type="button"
                    onClick={() => addFilter("PARALIZADO POR IMPAGO")}
                    className={clsx(
                      "relative -ml-px inline-flex items-center px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 focus:z-10",
                      isInArray("PARALIZADO POR IMPAGO")
                        ? "bg-secondary  text-white ring-secondary"
                        : "bg-white text-gray-500"
                    )}
                  >
                    Paralizado
                  </button>
                  <button
                    type="button"
                    onClick={() => addFilter("IMPAGADO")}
                    className={clsx(
                      "relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 focus:z-10",
                      isInArray("IMPAGADO")
                        ? "bg-secondary  text-white ring-secondary"
                        : "bg-white text-gray-500"
                    )}
                  >
                    Impagado
                  </button>
                </span>
                <button
                  type="button"
                  onClick={() => downloadExcel()}
                  className={clsx(
                    "relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium bg-gray-900  text-white"
                  )}
                >
                  Descargar
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between lg:items-center pb-4 mb-4 lg:space-x-4 space-y-4 lg:space-y-0 ">
            <div className="flex-1">
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
            </div>

            <div>
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
            </div>
          </div>

          <div className="flow-root">
            <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-10 text-right text-sm font-semibold text-gray-900"
                      >
                        Cuotas impagadas
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Situación
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
                    {paymentsSituationQuery.isLoading ? (
                      <LoadingContainer />
                    ) : (
                      <>
                        {filteredUsers.map((person: any) => (
                          <tr key={person.id}>
                            <td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900">
                              {person.client_name}
                            </td>
                            <td className="whitespace-nowrap py-4 px-20 text-sm text-gray-500 text-right">
                              {person.non_payments}
                            </td>

                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                              {person.payment_situation ==
                              "CORRIENTE DE PAGO" ? (
                                <div className="flex items-center space-x-3">
                                  <div className="h-2 w-2 bg-green-400 rounded-full" />
                                  <p>Corriente de pago</p>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-3">
                                  <div className="h-2 w-2 bg-red-400 rounded-full" />
                                  <p>
                                    {person.payment_situation.toLowerCase()}
                                  </p>
                                </div>
                              )}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium"></td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SectionBloc>
        <Pagination
          total={
            paymentsSituationQuery.data ? paymentsSituationQuery.data.total : 0
          }
          limit={limit}
          nextPage={nextPage}
          prevPage={prevPage}
          selectPage={selectPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

ContabilidadHome.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default ContabilidadHome;
