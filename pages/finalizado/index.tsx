import { useRouter } from "next/router";
import React from "react";
import { usePortalStore } from "store/portal";
import type { ReactElement } from "react";
import RedirectLayout from "components/layouts/redirect";
import Lottie from "lottie-react";
import Congrats from "../../public/congrats.json";

const style = {
  height: 100,
};

const PayCometFinalizado = () => {
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();

  const redirectTo = () => {
    if (profile?.groups?.includes("Cliente")) {
      router.push("/portal/clientes/pagos/tarjeta");
    } else {
      router.push("https://comercial.abogadosparatusdeudas.es/finalizado");
    }
  };

  return (
    <div className="mx-auto max-w-3xl py-10">
      <div className="bg-white py-10 rounded-lg border">
        <div className="flex justify-center">
          <Lottie animationData={Congrats} style={style} />
        </div>

        <p className="text-center pb-8">Acción realizada correctamente</p>
        <div className="flex justify-center">
          <button
            onClick={redirectTo}
            className="px-8 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-white text-sm"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

PayCometFinalizado.getLayout = function getLayout(page: ReactElement) {
  return <RedirectLayout>{page}</RedirectLayout>;
};

export default PayCometFinalizado;
