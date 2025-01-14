/* eslint-disable react-hooks/exhaustive-deps */
import SectionBloc from "components/layouts/components/section/sectionBloc";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "apis/users";

import Pagination from "../pagination";
import LoadingContainer from "../loading";
import { usePortalStore } from "store/portal";
import Link from "next/link";
import { useRouter } from "next/router";
import { Close, Search } from "components/icons";
import { getTenants } from "apis/tenants";
import { getTenantName } from "vars/shared";
import { getPlans } from "apis/pricing";

const LsoPricingsList = ({ section }: any) => {
  const [operator, setOperator] = useState("eq");
  const [limit, setLimit] = useState(50);
  const [group, setGroup] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const profile = usePortalStore((state) => state.profile);
  const { pathname } = useRouter();
  const [name, setName] = useState("");
  const [filter, setFilter] = useState<any>("fullname");
  const [tenants, setTenants] = useState<any>(null);
  const [value, setValue] = useState<any>("");

  const [type, setType] = useState<any>("all");
  const [entity, setEntity] = useState<any>("fullname");
  const [status, setStatus] = useState<any>("fullname");
  const [filteredPricings, setFilteredPricings] = useState<any>(null);

  var queryParams = `searchBy=${filter}&searchValue=${value}`;

  let filterQuery = "";

  const userQuery = useQuery({
    queryKey: ["usersAPTD", queryParams],
    queryFn: async () => getUsers(profile.token, queryParams),
  });

  const pricingsQuery = useQuery(["pricings", queryParams], () =>
    getPlans(profile.token, queryParams)
  );

  console.log(pricingsQuery.data);

  useQuery(["tenants"], async () => getTenants(profile.token), {
    onSuccess: (data) => {
      setTenants(data);
    },
  });

  useEffect(() => {
    if (pricingsQuery.data) {
      setFilteredPricings(pricingsQuery.data);
    }
  }, [pricingsQuery.data]);

  const queryParamsFiltered = (pricing: any) => {
    return;
  };

  useEffect(() => {
    setFilteredPricings(
      pricingsQuery.data?.filter((pricing: any) => queryParams)
    );

    // if (type == "all") {
    //   setFilteredPricings(pricingsQuery.data);
    // } else {
    //   setFilteredPricings(
    //     pricingsQuery.data?.filter(
    //       (pricing: any) =>
    //         pricing.subscription_type.toLowerCase() == type.toLowerCase()
    //     )
    //   );
    // }
    // if (status == "all") {
    //   setFilteredPricings(pricingsQuery.data);
    // } else {
    //   if (status == "actives") {
    //     setFilteredPricings(
    //       pricingsQuery.data?.filter(
    //         (pricing: any) => pricing.is_public == true
    //       )
    //     );
    //   } else {
    //     setFilteredPricings(
    //       pricingsQuery.data?.filter(
    //         (pricing: any) => pricing.is_public == false
    //       )
    //     );
    //   }
    // }
  }, [type, status]);

  const filterPricings = (term: any, value: any) => {
    // if (term == "name") {
    //   setName(value);
    // }
    // if (term == "group") {
    //   if (value == "") {
    //     setGroup(1);
    //     setOperator("neq");
    //   } else {
    //     setGroup(value);
    //     setOperator("eq");
    //   }
    // }
    // if (term == "limit") {
    //   queryParams += `limit=${value}`;
    //   setLimit(value);
    //   setCurrentPage(1);
    // }
    // if (term == "page") {
    //   queryParams += `limit=${value}`;
    //   setCurrentPage(value);
    // }
  };

  const nextPage = () => {
    if (currentPage == Math.ceil(userQuery.data?.total / limit)) return false;
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage == 1) return false;
    setCurrentPage(currentPage - 1);
  };

  const selectPage = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SectionBloc title="Planes LSO" description="Listado de precios de LSO.">
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
                  onChange={(e) => filterPricings("name", e.target.value)}
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
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">Tipo</option>
              <option value="all">Todos</option>
              <option value="online">Online</option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="premium">Premium</option>
              <option value="subscription">Subscription</option>
            </select>
          </div>
          <div>
            <select
              id="size"
              name="size"
              className="block w-50 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-500 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
              onChange={(e) => setEntity(e.target.value)}
            >
              <option value="fullname">Entidad</option>
              {tenants?.map((tenant: any) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              id="size"
              name="size"
              className="block w-50 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-500 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">Estado</option>
              <option value="all">Todos</option>
              <option value="actives">Activos</option>
              <option value="inactives">Inactivos</option>
            </select>
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
                      Plan
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
                      Total
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Pago inicial
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Quotas
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Precio quota
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Entidad
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Estado
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
                  {pricingsQuery.isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-4">
                        <LoadingContainer />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {filteredPricings?.length > 0 ? (
                        <>
                          {filteredPricings.map((pricing: any) => (
                            <tr key={pricing.id}>
                              <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                {pricing.category}
                              </td>
                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {pricing.subscription_type}
                              </td>
                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {pricing.amount.toLocaleString("es-AR")}€
                              </td>
                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {pricing.initial_payment.toLocaleString(
                                  "es-AR"
                                )}
                                €
                              </td>
                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {pricing.total_installments}
                              </td>

                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {pricing.installment_amount}€
                              </td>

                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {getTenantName({
                                  tenants,
                                  tenantid: pricing.tenantid,
                                })}
                              </td>
                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {pricing.is_public ? (
                                  <div className="rounded-full bg-green-400 w-2 h-2 mx-4"></div>
                                ) : (
                                  <div className="rounded-full bg-red-400 w-2 h-2 mx-4"></div>
                                )}
                              </td>

                              <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                                <Link
                                  href={`${pathname}/${pricing.id}`}
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
      </SectionBloc>
      <Pagination
        total={pricingsQuery.data ? filteredPricings?.length : 0}
        limit={limit}
        nextPage={nextPage}
        prevPage={prevPage}
        selectPage={selectPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default LsoPricingsList;
