import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";
import Link from "next/link";

import { usePortalStore } from "store/portal";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import LoadingContainer from "components/portal/loading";

import { useRouter } from "next/router";
import { getUsers } from "apis/users";
import Pagination from "components/portal/pagination";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { Filter } from "components/icons";

const Admin: NextPageWithLayout = () => {
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);
  const [operator, setOperator] = useState("eq");
  const [limit, setLimit] = useState(5);
  const [group, setGroup] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    usersQuery.refetch();
  }, [limit, group, currentPage]);

  var queryParams = `group=${group}&op=${operator}&limit=${limit}&page=${currentPage}`;

  const usersQuery = useQuery({
    queryKey: ["listClient", queryParams],
    queryFn: async () => getUsers(profile.token, queryParams),
  });

  const filterUsers = (term: any, value: any) => {
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
        <title>Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="pt-6 mx-auto max-w-7xl">
        <SectionBloc
          title="Usuarios"
          description="Listado de usuarios de APTD."
        >
          <div className="flex justify-end items-center border-b pb-4 mb-4 ">
            <div className="flex justify-end items-center space-x-4">
              <div className="flex space-x-3 items-center">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>

              <div>
                <select
                  id="size"
                  name="size"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
                  onChange={(e) => filterUsers("limit", e.target.value)}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>

          <main>
            <div className="mt-2 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
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
                            Teléfono
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
                            DNI
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Acciones
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200 bg-white">
                        {usersQuery.isLoading ? (
                          <tr>
                            <td colSpan={6}>
                              <LoadingContainer />
                            </td>
                          </tr>
                        ) : (
                          <>
                            {usersQuery.data.users.map((user: any) => (
                              <tr key={user.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {user.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {user.surname}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {user.phonenumber}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {user.emailaddress}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {user.dni}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-secondary font-medium">
                                  <Link href={`/portal/aptd/admin/${user.id}`}>
                                    Ver
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
            </div>
          </main>
        </SectionBloc>
        <Pagination
          total={usersQuery.data ? usersQuery.data.total : 0}
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

Admin.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Admin;
