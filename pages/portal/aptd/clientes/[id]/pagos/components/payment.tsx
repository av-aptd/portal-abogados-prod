import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ring } from "@uiball/loaders";
import { refundPayment } from "apis/payments";
import clsx from "clsx";
import React from "react";
import { formatDate } from "shared/helpers";
import { usePortalStore } from "store/portal";
import { canRefund } from "vars/shared";

const PaymentBox = ({ payment }: any) => {
  const queryClient = useQueryClient();
  const profile = usePortalStore((state) => state.profile);

  const refundMutation = useMutation(
    (paymentId) => refundPayment({ paymentId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userPayments"]);
      },
    }
  );

  const showRefund = (payment: any) => {
    if (payment.details?.includes("Refunded") || payment.amount < 0) {
      return false;
    }
    return true;
  };

  const refunded = (payment: any) => {
    return payment.details?.includes("Refund");
  };

  const devolverPago = (id: any) => {
    refundMutation.mutate(id);
  };

  return (
    <div className={clsx("border p-2 rounded-lg mb-4")} key={payment.id}>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <p className="text-gray-500 text-sm">
            {(payment.paymentMethod == "Stripe - Card" ||
              payment.paymentMethod == "Stripe" ||
              payment.paymentMethod == "Card") &&
              "Tarjeta Stripe"}
          </p>
          <p className="text-gray-500 text-sm">
            {payment.paymentMethod == "Paycomet - Card" && "Tarjeta Pay Comet"}
          </p>
          <p className="text-gray-500 text-sm">
            {payment.paymentMethod == "Paycomet - Bizum" && "Paycomet - Bizum"}
          </p>
          <p className="text-gray-500 text-sm flex-1">
            {payment.paymentMethod == "Stripe - Subscription" &&
              "Tarjeta suscripción"}
          </p>
          <p className="text-gray-500 text-sm flex-1">
            {payment.paymentMethod == "transferencia bancaria" &&
              "Transferencia bancaria"}
          </p>
          <p className="text-gray-500 text-sm flex-1">
            {payment.paymentMethod.toUpperCase() == "MANUAL" && "Manual"}
          </p>
          <p className="text-gray-500 text-sm flex-1">
            {payment.paymentMethod.toUpperCase() == "PROMO" && "Promo"}
          </p>
          {payment.details && (
            <p className="pt-2 text-xs text-gray-500">
              **** **** ****{" "}
              {payment.details
                .replace("Refunded", "Reembolsado")
                .replace("Refund", "Reembolso")}
            </p>
          )}
        </div>

        {/* {showRefund(payment) && canRefund(profile) && (
          <button
            onClick={() => devolverPago(payment.id)}
            disabled={refundMutation.isLoading}
            className="border rounded-lg inline-block px-4 py-2 text-gray-500 text-[10px] hover:bg-gray-50 duration-100 mr-8"
          >
            {refundMutation.isLoading ? (
              <div className="px-4">
                <Ring color="#ccc" size={14} />
              </div>
            ) : (
              "Reembolsar pago"
            )}
          </button>
        )} */}

        <p className="text-gray-500 text-xs w-52 pr-10 text-right">
          {formatDate(payment.paymentDate, "medium", "es")}
        </p>

        <p
          className={clsx(
            refunded(payment) ? "text-red-400" : "text-gray-700",
            " font-medium w-16 text-right text-sm"
          )}
        >
          {payment.amount.toLocaleString("es-AR")}€
        </p>
      </div>
    </div>
  );
};

export default PaymentBox;
