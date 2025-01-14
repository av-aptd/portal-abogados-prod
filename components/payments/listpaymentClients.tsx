import SectionBloc from "components/layouts/components/section/sectionBloc";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "apis/users";
import { usePortalStore } from "store/portal";
import Link from "next/link";
import { useRouter } from "next/router";
import { Close, Search } from "components/icons";
import Pagination from "components/portal/pagination";
import LoadingContainer from "components/portal/loading";
import clsx from "clsx";

const ListPaymentClients = ({ user, selectUser }: any) => {
  const [operator, setOperator] = useState("eq");
  const [limit, setLimit] = useState(20);
  const [group, setGroup] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const profile = usePortalStore((state) => state.profile);
  const [name, setName] = useState("");
  const [searchBy, setSearchBy] = useState<string>("fullname");

  var queryParams = `searchBy=${searchBy}&searchValue=${name}&group=${group}&op=${operator}&limit=${limit}&page=${currentPage}`;

  const userQuery = useQuery({
    queryKey: ["usersAPTD", queryParams],
    queryFn: async () => getUsers(profile.token, queryParams),
  });

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

    if (term == "searchBy") {
      queryParams += `limit=${value}`;
      setSearchBy(value);
      setCurrentPage(1);
    }

    userQuery.refetch();
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

  const clearAll = () => {
    setName("");
    selectUser(null);
  };

  return (
    <>
      <SectionBloc title="Selecciona un cliente para el pago">
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
                  placeholder="Buscar cliente"
                />
              </div>
              <button
                type="button"
                onClick={clearAll}
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
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-500 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
              onChange={(e) => filterUsers("searchBy", e.target.value)}
            >
              <option value="fullname">Nombre y apellido</option>
              <option value="dni">DNI</option>
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
                      Apellidos
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell"
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
                      className="relative py-3.5 pl-3 pr-6 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {userQuery.isLoading ? (
                    <tr>
                      <td colSpan={5} className="py-4">
                        <LoadingContainer />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {userQuery.data.users.length > 0 ? (
                        <>
                          {userQuery.data.users.map((person: any) => (
                            <tr key={person.id}>
                              <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                {person.name}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                {person.surname}
                              </td>
                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 hidden sm:table-cell">
                                {person.emailaddress}
                              </td>
                              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                {person.dni}
                              </td>

                              <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                                <button
                                  onClick={() => selectUser(person)}
                                  className={clsx(
                                    user?.id == person.id
                                      ? "bg-secondary text-white border-secondary"
                                      : "",
                                    "border text-gray-500 text-xs px-4 py-1 rounded"
                                  )}
                                >
                                  {user?.id == person.id
                                    ? "Seleccionado"
                                    : "Seleccionar"}
                                  <span className="sr-only">{person.name}</span>
                                </button>
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
        total={userQuery.data ? userQuery.data.total : 0}
        limit={limit}
        nextPage={nextPage}
        prevPage={prevPage}
        selectPage={selectPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default ListPaymentClients;
