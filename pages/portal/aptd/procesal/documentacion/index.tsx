import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProfilesCompleted } from "apis/client";
import { usePortalStore } from "store/portal";
import Link from "next/link";
import LoadingContainer from "components/portal/loading";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { Search, Close } from "components/icons";
import Pagination from "components/portal/pagination";

const Documentacion: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState<any>("fullname");

  var queryParams = `searchBy=${filter}&searchValue=${name}&completed=1&limit=${limit}&page=${currentPage}&group=1&op=eq`;

  const profilesCompletedQuery = useQuery({
    queryKey: ["profilesCompleted", queryParams],
    queryFn: () => getProfilesCompleted(profile.token, queryParams),
  });

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

    profilesCompletedQuery.refetch();
  };

  const nextPage = () => {
    if (currentPage == Math.ceil(profilesCompletedQuery.data?.total / limit))
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

  return (
    <div className="pt-6 mx-auto max-w-7xl">
      <SectionBloc
        title="Documentacion"
        description="Listado de clientes para generar documentación"
      >
        <div className="flex flex-col lg:flex-row justify-between lg:items-center pb-4 mb-4 lg:space-x-4 space-y-4 lg:space-y-0 ">
          <div className="flex-1">
            <div>
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
                    placeholder="Buscar por nombre y apellido"
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
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Cliente
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
                      className="relative py-3.5 pl-3 pr-6 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {profilesCompletedQuery.isLoading ? (
                    <tr>
                      <td colSpan={5} className="py-4">
                        <LoadingContainer />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {profilesCompletedQuery.data.users.map((doc: any) => (
                        <tr key={doc.id}>
                          <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {doc.name} {doc.surname}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                            {doc.dni}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                            {doc.phonenumber}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                            {doc.emailaddress}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                            <Link
                              href={`/portal/aptd/procesal/documentacion/${doc.id}`}
                              className="text-secondary"
                            >
                              Generar docs
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
      </SectionBloc>
      <Pagination
        total={
          profilesCompletedQuery.data ? profilesCompletedQuery.data.total : 0
        }
        limit={limit}
        nextPage={nextPage}
        prevPage={prevPage}
        selectPage={selectPage}
        currentPage={currentPage}
      />
    </div>
  );
};

Documentacion.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Documentacion;
