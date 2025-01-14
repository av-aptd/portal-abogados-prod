import { Payment } from "components/icons";
import React from "react";
import MiniLoading from "../miniLoading";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserPayments } from "apis/payments";
import { usePortalStore } from "store/portal";
import { getProcessInfo } from "apis/processes";
import { formatDate } from "shared/helpers";

const PagosPanel = ({ procesos }: any) => {
  const profile = usePortalStore((state) => state.profile);

  const paymentsQuery = useQuery({
    queryKey: ["payments"],
    queryFn: () => getUserPayments(profile.token, profile.id),
  });

  const PaymentQuery = useQuery({
    queryKey: ["paymentInfo"],
    queryFn: () => getProcessInfo(profile.token, procesos.data[0].id),
    enabled: !!procesos.data,
  });

  console.log("PaymentQuery:", PaymentQuery.data);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b flex justify-between items-center p-4 bg-gray-50">
        <div className="flex space-x-2 items-center">
          <Payment className="w-6 h-6 text-gray-400" />
          <h3 className="text-gray-700">Estado pagos</h3>
        </div>
      </div>
      <div className="p-4">
        {PaymentQuery.isLoading || paymentsQuery.isLoading ? (
          <MiniLoading color="#19ABE3" />
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-4 mb-2">
              <div className="border p-4 rounded-lg text-center">
                <p className="font-bold text-xl text-gray-700">
                  {PaymentQuery.data?.total_paid?.toLocaleString("es-AR")}€
                </p>
                <p className="text-gray-500 text-sm">Importe pagado</p>
              </div>
              <div className="border p-4 rounded-lg text-center">
                <p className="font-bold text-xl text-gray-700">
                  {PaymentQuery.data?.total_pending?.toLocaleString("es-AR")}€
                </p>
                <p className="text-gray-500 text-sm">Importe pendiente</p>
              </div>
              <div className="border p-4 rounded-lg  text-center">
                <p className="font-bold text-xl text-gray-700">
                  {PaymentQuery.data?.installments_pending}
                </p>
                <p className="text-gray-500 text-sm">Cuotas pendientes</p>
              </div>
              {PaymentQuery.data?.next_installment && (
                <div className="col-span-3 border px-4 py-2 rounded-lg flex items-center justify-between">
                  <p className="text-gray-500 text-sm">
                    Próximo pago de{" "}
                    <span className="font-semibold text-gray-700">
                      {" "}
                      {PaymentQuery.data?.next_installment.amount}€
                    </span>
                  </p>
                  <p className="font-semibold text-gray-700">
                    {formatDate(
                      PaymentQuery.data?.next_installment.planneddate,
                      "short",
                      "es"
                    )}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
        <div className="flex justify-end">
          <Link
            href={`/portal/clientes/pagos`}
            className="border text-sm p-2 rounded-lg mt-4 inline-block text-gray-500 hover:bg-gray-50 duration-150"
          >
            Hacer un pago
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PagosPanel;
