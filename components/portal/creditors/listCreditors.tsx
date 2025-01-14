import SectionBloc from "components/layouts/components/section/sectionBloc";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";

import Pagination from "../pagination";
import LoadingContainer from "../loading";
import { usePortalStore } from "store/portal";
import Link from "next/link";
import { useRouter } from "next/router";
import { Add, Close, Search, Trash } from "components/icons";
import { getTenants } from "apis/tenants";
import { getTenantName } from "vars/shared";
import { deleteAptdCreditor, getCreditors, getDebTypes } from "apis/creditors";
import { useUIStore } from "store/ui";
import { AlertModal } from "../alertModal";

const ListCreditors = () => {
  const [operator, setOperator] = useState("eq");
  const [limit, setLimit] = useState(150);
  const [group, setGroup] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [filter, setFilter] = useState<any>("name");
  const showNewCreditor = useUIStore((state) => state.showNewCreditor);
  const setCreditorType = useUIStore((state) => state.setCreditorType);
  const showAlert = useUIStore((state) => state.showAlert);
  const [creditorToDelete, setCreditorToDelete] = useState(0);

  const showCreditorSlider = () => {
    setCreditorType("aptd");
    createNewCreditor();
  };

  var queryParams = `searchBy=${filter}&searchValue=${name}&group=${group}&op=${operator}&limit=${limit}&page=${currentPage}`;

  const {
    data: creditors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allCreditors"],
    queryFn: getCreditors,
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

    if (term == "limit") {
      queryParams += `limit=${value}`;
      setLimit(value);
      setCurrentPage(1);
    }

    if (term == "page") {
      queryParams += `limit=${value}`;
      setCurrentPage(value);
    }

    refetch();
  };

  const nextPage = () => {
    if (currentPage == Math.ceil(creditors?.total / limit)) return false;
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage == 1) return false;
    setCurrentPage(currentPage - 1);
  };

  const selectPage = (page: any) => {
    setCurrentPage(page);
  };

  const createNewCreditor = () => {
    showNewCreditor();
  };

  const showModaldeleteCreditor = async (creditorId: number) => {
    showAlert();
    setCreditorToDelete(creditorId);
  };

  const mutation = useMutation(() => deleteAptdCreditor(creditorToDelete), {
    onSuccess: () => {
      showAlert();

      queryClient.invalidateQueries({ queryKey: ["allCreditors"] });
    },
  });

  return (
    <>
      <AlertModal
        title="Borrar acreedor"
        description="Estás seguro que quieres borrar este acreedor. Está acción no se puede deshacer."
        label="Borrar acreedor"
        action={() => mutation.mutate()}
      />
      <ComplexSectionBloc>
        <HeaderSection
          title="Acreedores"
          description="Listado de acreedores"
          hasActions
        >
          <button
            className="text-white text-sm px-6 py-2 rounded-md flex justify-center items-center bg-secondary"
            onClick={() => showCreditorSlider()}
          >
            <Add className="h-5 w-5 mr-2" />
            Nuevo acreedor
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
                    placeholder={`Buscar por nombre`}
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
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 hidden lg:block"
                      >
                        Teléfono
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
                    {isLoading ? (
                      <tr>
                        <td colSpan={4} className="py-4">
                          <LoadingContainer />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {creditors.length > 0 ? (
                          <>
                            {creditors
                              .filter((creditor: any) =>
                                creditor.name
                                  .toLowerCase()
                                  .includes(name.toLowerCase())
                              )
                              .map((creditor: any) => (
                                <tr key={creditor.id}>
                                  <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                    {creditor.name}
                                  </td>

                                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 hidden lg:block">
                                    {creditor.phonenumber}
                                  </td>

                                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <button
                                      onClick={() =>
                                        showModaldeleteCreditor(creditor.id)
                                      }
                                      className=""
                                    >
                                      <Trash className="w-5 h-5 text-gray-400" />
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
        </BodySection>
      </ComplexSectionBloc>

      <Pagination
        total={creditors?.length}
        limit={limit}
        nextPage={nextPage}
        prevPage={prevPage}
        selectPage={selectPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default ListCreditors;
