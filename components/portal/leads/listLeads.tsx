import SectionBloc from "components/layouts/components/section/sectionBloc";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";

import Pagination from "../pagination";
import LoadingContainer from "../loading";
import { usePortalStore } from "store/portal";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuAddUser, Close, Search } from "components/icons";
import { getLeads } from "apis/leads";
import { formatDate } from "shared/helpers";
import clsx from "clsx";

const ListLeads = () => {
  const [operator, setOperator] = useState("eq");
  const [limit, setLimit] = useState(50);
  const [group, setGroup] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const profile = usePortalStore((state) => state.profile);
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const { pathname } = useRouter();

  const [name, setName] = useState("");
  const [filter, setFilter] = useState<any>("fullName");
  const [publicTenantId, setPublicTenantId] = useState<any>("");

  var queryParams = `searchBy=${filter}&searchValue=${name}&limit=${limit}&page=${currentPage}`;

  const leadsQuery = useQuery({
    queryKey: ["leadsAPTD", queryParams],
    queryFn: async () => getLeads(queryParams),
  });

  console.log(leadsQuery.data);

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

    leadsQuery.refetch();
  };

  useEffect(() => {
    getTenants();
  }, []);

  const getTenants = async () => {
    const tenant = dataProfile.tenants.find(
      (item: any) => item.id == dataProfile.tenantid
    );

    setPublicTenantId(tenant.public_id);
  };

  const nextPage = () => {
    if (currentPage == Math.ceil(leadsQuery.data?.total / limit)) return false;
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage == 1) return false;
    setCurrentPage(currentPage - 1);
  };

  const selectPage = (page: any) => {
    setCurrentPage(page);
  };

  const createNewUser = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_ESTUDIO}/?AuthId=${profile.AuthId}&Token=${profile.token}&Source=tenant&Channel=Comercial&publicTenantId=${publicTenantId}`,
      "_blank"
    );
  };

  return (
    <>
      <ComplexSectionBloc>
        <HeaderSection title="Leads" description="Listado de leads" hasActions>
          <button
            className="text-white text-sm px-6 py-2 rounded-md flex justify-center items-center bg-secondary"
            onClick={createNewUser}
          >
            <MenuAddUser className="h-5 w-5 mr-2" />
            Nuevo lead
          </button>
        </HeaderSection>
        <BodySection>
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
                      filter == "fullName"
                        ? "nombre y apellido"
                        : filter == "phone"
                        ? "teléfono"
                        : filter == "email"
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
                <option value="fullName">Filtrar por</option>
                <option value="fullName">Nombre y apellido</option>
                <option value="phone">Teléfono</option>
                <option value="email">Email</option>
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
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Teléfono
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Entidad
                      </th>
                      {/* <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Tipo EPI
                      </th> */}
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Canal
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Creado
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
                    {leadsQuery.isLoading ? (
                      <tr>
                        <td colSpan={6} className="py-4">
                          <LoadingContainer />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {leadsQuery.data?.leads?.length > 0 ? (
                          <>
                            {leadsQuery.data?.leads.map((person: any) => (
                              <tr key={person.id}>
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                  {person.name} {person.surname}
                                </td>
                                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                  {person.phone}
                                </td>
                                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                  {person.email}
                                </td>
                                <td className="py-4 px-3 text-sm text-gray-500">
                                  {person.tenant.name ==
                                  "Abogados para tus deudas"
                                    ? "APTD"
                                    : person.tenant.name}
                                </td>
                                {/* <td className="px-4">
                                  <div
                                    className={clsx(
                                      person.tipo_epi == "FÁCIL"
                                        ? "bg-green-100"
                                        : "bg-red-100",
                                      "rounded-full py-1 px-2 text-xs font-medium uppercase tracking-wide text-center"
                                    )}
                                  >
                                    <p
                                      className={clsx(
                                        person.tipo_epi == "FÁCIL"
                                          ? "text-green-700"
                                          : "text-red-700"
                                      )}
                                    >
                                      {person.tipo_epi}
                                    </p>
                                  </div>
                                </td> */}
                                <td className="py-4 px-3 text-sm text-gray-500">
                                  {person.channel}
                                </td>

                                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                  {formatDate(person.created_at, "short", "es")}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                                  <Link
                                    href={`${pathname}/${person.id}`}
                                    className="text-secondary hover:text-secondary/80"
                                  >
                                    Ver
                                    <span className="sr-only">
                                      , {person.name}
                                    </span>
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

      <Pagination
        total={leadsQuery.data ? leadsQuery.data.total : 0}
        limit={limit}
        nextPage={nextPage}
        prevPage={prevPage}
        selectPage={selectPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default ListLeads;