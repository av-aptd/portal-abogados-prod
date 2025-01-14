import SectionBloc from "components/layouts/components/section/sectionBloc";
import React, { useEffect, useState } from "react";
import LoadingContainer from "../loading";
import { EmptyFolder } from "components/icons";

const CreditorsBloc = ({ userCreditorsQuery }: any) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (userCreditorsQuery.data) {
      let total = 0;
      userCreditorsQuery.data.map((payment: any) => {
        console.log("payment:", payment.contractAmount);

        total += Number(payment.contractAmount);
      });
      setTotal(total);
    }
  }, [userCreditorsQuery.data]);

  return (
    <SectionBloc
      title="Acreedores"
      description="Listado de los acreedores del cliente"
    >
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
                  <p className="text-gray-500 text-sm">
                    {creditor.creditorName}
                  </p>

                  <p className="text-gray-700 font-medium text-sm">
                    {Number(creditor.contractAmount).toLocaleString("es-AR")}€
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center px-2 text-sm">
                <p className="text-gray-700 font-bold">Total</p>
                <p className="font-bold">{total.toLocaleString("es-AR")}€</p>
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
    </SectionBloc>
  );
};

export default CreditorsBloc;
