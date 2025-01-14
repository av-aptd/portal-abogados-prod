import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import type { ReactElement } from "react";
import { usePortalStore } from "store/portal";

import { useUIStore } from "store/ui";

import { Edit, Trash } from "components/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "shared/helpers";
import { useRouter } from "next/router";
import { AlertModal } from "components/portal/alertModal";
import { getUserCreditors } from "apis/client";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import { deleteUserCreditor, getDebTypes } from "apis/creditors";
import NewCreditorSlideOver from "components/portal/creditors/creditorSlideOver";

const StopAcoso: NextPageWithLayout = () => {
  const queryClient = useQueryClient();

  const profile = usePortalStore((state) => state.profile);
  const [creditorToDelete, setCreditorToDelete] = useState(0);
  const showNewCreditor = useUIStore((state) => state.showNewCreditor);
  const setCreditorType = useUIStore((state) => state.setCreditorType);
  const { locale } = useRouter();
  const showAlert: any = useUIStore((state) => state.showAlert);
  const router = useRouter();

  const { data: debtTypes } = useQuery({
    queryKey: ["debtTypes"],
    queryFn: getDebTypes,
  });

  const getNameDebtType = (value: string) => {
    const debtType = debtTypes?.find((debt: any) => debt.value === value);
    return debtType?.name;
  };

  const userCreditors = useQuery({
    queryKey: ["userCreditors", profile.token, profile.id],
    queryFn: () => getUserCreditors(profile.token, profile.id),
  });

  const showModaldeleteCreditor = async (creditorId: number) => {
    showAlert();
    setCreditorToDelete(creditorId);
  };

  const mutation = useMutation(() => deleteUserCreditor(creditorToDelete), {
    onSuccess: () => {
      showAlert();

      queryClient.invalidateQueries({ queryKey: ["userCreditors"] });
    },
  });

  const creditorsFinished = () => {
    router.push("/portal/clientes/panel/documentacion");
  };

  const showCreditorSlider = () => {
    setCreditorType("user");
    showNewCreditor();
  };

  return (
    <>
      <AlertModal
        title="Borrar acreedor"
        description="Estás seguro que quieres borrar este acreedor. Está acción no se puede deshacer."
        label="Borrar acreedor"
        action={() => mutation.mutate()}
      />

      <div className="px-4 sm:px-6 lg:px-8 pt-6 mx-auto max-w-7xl">
        <ComplexSectionBloc>
          <HeaderSection
            title="Listado de acreedores"
            description="A continuación se muestra el listado de acreedores que se encuentran activos."
            hasActions
          >
            <div className="flex-shrink-0 flex space-x-2 mt-4 sm:mt-0">
              <button
                type="button"
                onClick={() => showCreditorSlider()}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary/90 focus:outline-none sm:w-auto"
              >
                Añadir acreedor
              </button>
            </div>
          </HeaderSection>
          <BodySection>
            <div className="-mx-4 sm:-mx-0">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Acreedor
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Tipo de deuda
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Importe
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Vencimiento
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {userCreditors.isLoading ? (
                    <></>
                  ) : (
                    <>
                      {userCreditors?.data?.map((creditor: any) => (
                        <tr key={creditor.id}>
                          <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                            {creditor.creditorName}
                            <dl className="font-normal lg:hidden">
                              <dt className="sr-only">Title</dt>
                              <dd className="mt-1 truncate text-gray-700">
                                {getNameDebtType(creditor.typeOfDebt)}
                              </dd>
                              <dt className="sr-only sm:hidden">Email</dt>
                              <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                {creditor.contractAmount}€
                              </dd>
                            </dl>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                            {getNameDebtType(creditor.typeOfDebt)}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {creditor.contractAmount}€
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {formatDate(
                              creditor.expirationDate,
                              "short",
                              locale
                            )}
                          </td>
                          <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              onClick={() =>
                                showModaldeleteCreditor(creditor.id)
                              }
                              className="text-red-500 pl-2"
                            >
                              <Trash className="w-5 h-5 text-gray-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {userCreditors.data?.length > 1 && (
              <div className="mt-8 bg-gray-50 border rounded-lg p-4 flex flex-col lg:flex-row justify-between lg:items-center space-y-4 lg:space-y-0">
                <div>
                  <h3 className="font-semibold text-gray-700">
                    ¿Has acabado de subir todos los acreedores?
                  </h3>
                  <p className="text-gray-500 text-sm">
                    En caso afirmativo puedes continuar el proceso con la subida
                    de documentación.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => creditorsFinished()}
                    className="text-white bg-secondary hover:bg-secondary/90 px-4 py-2 rounded-md text-sm"
                  >
                    Subir documentación
                  </button>
                </div>
              </div>
            )}
          </BodySection>
        </ComplexSectionBloc>
      </div>
      <NewCreditorSlideOver />
    </>
  );
};

StopAcoso.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default StopAcoso;
