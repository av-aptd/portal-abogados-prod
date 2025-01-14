import React, { useState, useEffect } from "react";
import PortalLayout from "components/layouts/portal";
import ClientLayout from "components/layouts/client";
import type { NextPageWithLayout } from "../../../../../_app";
import type { ReactElement } from "react";
import LoadingContainer from "components/portal/loading";
import { getUserCreditors } from "apis/client";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePortalStore } from "store/portal";
import { EmptyFolder, Trash } from "components/icons";
import PortalHeader from "components/portal/layout/header";
import NewCreditorSlideOver from "components/portal/creditors/creditorSlideOver";
import { useUIStore } from "store/ui";
import { AlertModal } from "components/portal/alertModal";
import { deleteUserCreditor, getDebTypes } from "apis/creditors";
import { formatDate } from "shared/helpers";

const CreditorsUserAdmin: NextPageWithLayout = () => {
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);
  const showNewCreditor = useUIStore((state) => state.showNewCreditor);
  const setCreditorType = useUIStore((state) => state.setCreditorType);
  const showAlert: any = useUIStore((state) => state.showAlert);
  const [creditorToDelete, setCreditorToDelete] = useState(0);

  const queryClient = useQueryClient();

  const userCreditorsQuery = useQuery(
    ["userCreditors", router.query.id],
    async () => getUserCreditors(profile.token, router.query.id)
  );

  const { data: debtTypes } = useQuery({
    queryKey: ["debtTypes"],
    queryFn: getDebTypes,
  });

  const getNameDebtType = (value: string) => {
    const debtType = debtTypes?.find((debt: any) => debt.value === value);
    return debtType?.name;
  };

  const mutation = useMutation(() => deleteUserCreditor(creditorToDelete), {
    onSuccess: () => {
      showAlert();

      queryClient.invalidateQueries({ queryKey: ["userCreditors"] });
    },
  });

  const showModaldeleteCreditor = async (creditorId: number) => {
    showAlert();
    setCreditorToDelete(creditorId);
  };

  useEffect(() => {
    if (userCreditorsQuery.data) {
      let total = 0;
      userCreditorsQuery.data.map((payment: any) => {
        total += Number(payment.contractAmount);
      });
      setTotal(total);
    }
  }, [userCreditorsQuery.data]);

  const showCreditorSlider = () => {
    setCreditorType("userAPTD");
    showNewCreditor();
  };

  console.log(userCreditorsQuery.data);

  return (
    <>
      <AlertModal
        title="Borrar acreedor"
        description="Estás seguro que quieres borrar este acreedor. Está acción no se puede deshacer."
        label="Borrar acreedor"
        action={() => mutation.mutate()}
      />
      <PortalHeader title="Acreedores" />
      <div className="flex justify-between border-b border-gray-100 px-4 pb-4 items-center">
        <p className="text-sm font-medium">Listado de los acreedores</p>
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => showCreditorSlider()}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary/90 focus:outline-none sm:w-auto"
          >
            Añadir acreedor
          </button>
        </div>
      </div>
      <div className="p-4">
        {userCreditorsQuery.isLoading ? (
          <LoadingContainer />
        ) : (
          <>
            {userCreditorsQuery.data.length > 0 ? (
              <>
                {userCreditorsQuery.data.map((creditor: any) => (
                  <div
                    className="border p-2 mb-4 rounded-lg flex justify-between items-center"
                    key={creditor.id}
                  >
                    <div className="flex-1">
                      <p className="text-gray-700 font-medium text-sm pb-1">
                        {creditor.creditorName}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {creditor.debtStatus} -{" "}
                        {formatDate(creditor.expirationDate, "es", "short")}
                      </p>
                    </div>

                    <p className="text-gray-500 text-xs px-8">
                      {getNameDebtType(creditor.typeOfDebt)}
                    </p>
                    <div className="flex space-x-2 items-center w-28 justify-end">
                      <p className="text-gray-700 font-medium text-sm">
                        {Number(creditor.contractAmount).toLocaleString(
                          "es-AR"
                        )}
                        €
                      </p>
                      <button
                        onClick={() => showModaldeleteCreditor(creditor.id)}
                        className="text-red-500 pl-2"
                      >
                        <Trash className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center px-2 text-sm">
                  <p className="text-gray-700 font-bold">Total</p>
                  <p className="font-bold pr-9">
                    {total.toLocaleString("es-AR")}€
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gray-50 rounded-lg p-8">
                  <EmptyFolder className="text-gray-500 w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 text-center">
                    Todavía no ha añadido ningún acreedor.
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <NewCreditorSlideOver />
    </>
  );
};

CreditorsUserAdmin.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ClientLayout>{page}</ClientLayout>
    </PortalLayout>
  );
};

export default CreditorsUserAdmin;
