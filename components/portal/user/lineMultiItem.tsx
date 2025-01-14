import React from "react";
import { formatDate } from "shared/helpers";
import ChipInstallment from "../installments/chip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refundPayment } from "apis/payments";
import { Ring } from "@uiball/loaders";
import { Refund } from "components/icons";
import { canRefund } from "vars/shared";
import { usePortalStore } from "store/portal";

const LineMultiItem = ({ installment }: any) => {
  const queryClient = useQueryClient();
  const profile = usePortalStore((state) => state.profile);

  const refundMutation = useMutation(
    (paymentId) => refundPayment({ paymentId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["installmentsProccess"]);
      },
    }
  );

  const devolverPago = (id: any) => {
    refundMutation.mutate(id);
  };

  return (
    <div className="flex justify-between border border-gray-100 py-3 items-center px-4 mb-2 rounded-lg">
      <h3 className="text-sm text-gray-500 flex-1">{installment.amount}€</h3>
      <p className="text-sm font-semibold text-gray-700 flex-1">
        {formatDate(installment.planneddate, "short", "es")}
      </p>
      <div className="w-20 mr-4 flex justify-end">
        <ChipInstallment status={installment.status} />
      </div>
      <div className="w-10">
        {installment.status == 1 && canRefund(profile) && (
          <button
            onClick={() => devolverPago(installment.paymentid)}
            disabled={refundMutation.isLoading}
            className="border rounded-lg inline-block px-2 py-1 text-gray-500 text-[10px] hover:bg-gray-50 duration-100 mr-8"
          >
            {refundMutation.isLoading ? (
              <Ring color="#ccc" size={14} />
            ) : (
              <Refund className="w-4 h-4 text-gray-500" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LineMultiItem;
