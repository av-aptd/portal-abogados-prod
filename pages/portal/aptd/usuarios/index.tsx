import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";

import Head from "next/head";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { useQuery } from "@tanstack/react-query";
import { getUsers, getListGroups } from "apis/users";
import { usePortalStore } from "store/portal";
import LoadingContainer from "components/portal/loading";
import Link from "next/link";
import { useRouter } from "next/router";
import { Filter, Close, Search } from "components/icons";
import Pagination from "components/portal/pagination";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";

const Usuarios: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const { pathname } = useRouter();
  const [listGroupNoClient, setListGroupNoClient] = useState<any>([]);
  const [operator, setOperator] = useState("neq");
  const [limit, setLimit] = useState(150);
  const [group, setGroup] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState<any>("fullname");

  useEffect(() => {
    userQuery.refetch();
  }, [limit, group, currentPage]);

  var queryParams = `searchBy=${filter}&searchValue=${name}&group=${group}&op=${operator}&limit=${limit}&page=${currentPage}`;

  const userQuery = useQuery({
    queryKey: ["usersAPTD", queryParams],
    queryFn: async () => getUsers(profile.token, queryParams),
  });

  // console.log(userQuery.data);

  const groupQuery = useQuery(
    ["groupsAPTD"],
    () => getListGroups(profile.token),
    {
      onSuccess: (data) => {
        const listGroupNoClient = data.filter((group: any) => group.id != 1);
        listGroupNoClient.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name);
        });
        setListGroupNoClient(listGroupNoClient);
      },
    }
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

    if (term == "limit") {
      queryParams += `limit=${value}`;
      setLimit(value);
    }

    if (term == "page") {
      queryParams += `limit=${value}`;
      setCurrentPage(value);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const selectPage = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Head>
        <title>Usuarios</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="pt-6 mx-auto max-w-7xl">
        <ComplexSectionBloc>
          <HeaderSection
            hasActions
            title="Listado usuarios"
            description="Listado de todos los usuarios de APTD."
          >
            <Link
              className="text-white rounded-lg bg-secondary px-4 py-2 text-sm"
              href="/portal/aptd/usuarios/nuevo"
            >
              Nuevo usuario
            </Link>
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
                  className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
                  onChange={(e) => filterUsers("group", e.target.value)}
                >
                  <option value="">Selecciona un grupo</option>
                  {groupQuery.isLoading ? (
                    <option>Cargando...</option>
                  ) : (
                    <>
                      {listGroupNoClient.map((group: any) => (
                        <option value={group.id} key={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div>
                <select
                  id="size"
                  name="size"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
                  onChange={(e) => filterUsers("limit", e.target.value)}
                >
                  <option value="5">Registros por página</option>
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
                        ></th>
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
                          DNI
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
                      {userQuery.isLoading ? (
                        <tr>
                          <td colSpan={7} className="py-4">
                            <LoadingContainer />
                          </td>
                        </tr>
                      ) : (
                        <>
                          {userQuery.data.users.map((person: any) => (
                            <tr key={person.id}>
                              <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                {person.avatarUrl ? (
                                  <img
                                    src={person.avatarUrl}
                                    className="h-10 w-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                                )}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                {person.name} {person.surname}
                              </td>
                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {person.phonenumber}
                              </td>
                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {person.emailaddress}
                              </td>
                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {person.dni}
                              </td>
                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {person.isactive ? (
                                  <div className="h-2 w-2 bg-green-400 rounded-full ml-4"></div>
                                ) : (
                                  <div className="h-2 w-2 bg-red-400 rounded-full ml-4"></div>
                                )}
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
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </BodySection>
        </ComplexSectionBloc>

        <Pagination
          total={userQuery.data ? userQuery.data.total : 0}
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

Usuarios.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Usuarios;
