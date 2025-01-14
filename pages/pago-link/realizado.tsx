import WebLayout from "components/layouts/web";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import React from "react";
import PortalHeader from "components/portal/layout/header";
import Lottie from "lottie-react";
import Congrats from "../../public/congrats.json";

const style = {
  height: 150,
};

const PagoLinkRealizado = () => {
  return (
    <>
      <PortalHeader title="Pago realizado" />
      <div className="px-4 xl:px-0">
        <div className="p-6 lg:p-12 mx-auto max-w-4xl xl:px-0 bg-white border rounded-xl mt-6 lg:mt-10 flex justify-center items-center">
          <div>
            <div className="flex justify-center">
              <Lottie animationData={Congrats} style={style} />
            </div>

            <h3 className="text-gray-700 font-medium pt-4 lg:pt-8 text-center text-xl">
              Pago realizado correctamente
            </h3>
            <p className="text-gray-500 pt-4 max-w-lg text-center">
              Ya puedes cerrar esta ventana de manera segura.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

PagoLinkRealizado.getLayout = function getLayout(page: ReactElement) {
  return <WebLayout>{page}</WebLayout>;
};

export default PagoLinkRealizado;
