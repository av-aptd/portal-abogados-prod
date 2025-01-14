import WebLayout from "components/layouts/web";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import { Ring } from "@uiball/loaders";
import { CreditCard, Warning } from "components/icons";
import { useRouter } from "next/router";
import React, { use, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  addCreditCard,
  addPaymentLink,
  getPaymentLinkPayComet,
} from "apis/payments";
import PortalHeader from "components/portal/layout/header";

const PagoLink = () => {
  const router = useRouter();
  const [addCometUrl, setAddCometUrl] = React.useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    getPaymentLinkPayCometUrl();
  }, [router.isReady]);

  const getPaymentLinkPayCometUrl = async () => {
    const response = await getPaymentLinkPayComet(router.query?.id);
    setAddCometUrl(response.src);
  };

  return (
    <>
      <PortalHeader title="Link de pago abogados para tus deudas" />
      <div className="pt-6 mx-auto max-w-3xl px-4">
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="py-4 border-b px-8 ">
            <p className="text-gray-700">Hola {router.query?.customer_name},</p>
            <p className="text-gray-700">
              rellena los datos de la tarjeta para efectuar el pago de{" "}
              <span className="font-semibold">
                {Number(router.query?.amount)?.toLocaleString("es-AR")}€.
              </span>
            </p>
          </div>
          {addCometUrl && (
            <div className="flex justify-center bg-gray-50/50">
              <iframe
                title="titulo"
                sandbox="allow-top-navigation allow-scripts allow-same-origin allow-forms"
                src={`${addCometUrl}`}
                width="500"
                height="400"
                scrolling="no"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

PagoLink.getLayout = function getLayout(page: ReactElement) {
  return <WebLayout>{page}</WebLayout>;
};

export default PagoLink;
