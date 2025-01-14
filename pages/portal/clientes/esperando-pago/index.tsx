import React from "react";
import PortalLayout from "components/layouts/portal";
import type { ReactElement } from "react";
import { WaitingPayment } from "components/icons";

const EsperandoPagoTransferencia = () => {
  return (
    <div className="mx-auto max-w-3xl py-10 px-16 bg-white mt-12 border rounded-lg">
      <div className="flex justify-center pb-4">
        <WaitingPayment className="h-12 w-12 text-secondary" />
      </div>
      <div>
        <h3 className="text-center font-bold text-gray-700 pb-2">
          Esperando primer pago
        </h3>
        <div className="flex justify-center">
          <p className="text-center text-sm text-gray-500 max-w-sm">
            Una vez hayamos recibido la transferencia con el primer pago, podrás
            continuar con el proceso.
          </p>
        </div>
      </div>
    </div>
  );
};

EsperandoPagoTransferencia.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default EsperandoPagoTransferencia;
