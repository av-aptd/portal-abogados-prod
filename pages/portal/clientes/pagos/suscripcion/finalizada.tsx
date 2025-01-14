import PortalLayout from "components/layouts/portal";
import React, { useEffect } from "react";
import type { ReactElement } from "react";
import Head from "next/head";
import { Add, Check } from "components/icons";
import Link from "next/link";
import { usePortalStore } from "store/portal";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const SuscripcionFinalizada = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["paymentInfo"] });
  }, []);

  // const addData = async () => {
  //   const profileData = await getProfile(profile.token, profile.id);
  //   setDataProfile(profileData);
  //   setClientInfo(await getInfoUser(profile.token, profile.id));
  // };

  return (
    <>
      <Head>
        <title>Suscripción realizada</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="mx-auto max-w-5xl py-10 px-16 bg-white mt-12 border rounded-lg">
        <div className="mb-8 flex justify-center">
          <div className="bg-green-100 rounded-full p-4">
            <Check className="h-16 w-16 text-green-400 bg-white rounded-full" />
          </div>
        </div>
        <h1 className="font-semibold text-gray-700 text-center text-2xl pb-4">
          Suscripción creada
        </h1>
        <p className="text-gray-500 text-center">
          Ya puedes disfrutar de un proceso cómodo de pagos automáticos.
        </p>
        <div className="flex justify-center pt-8">
          <Link
            className="w-auto flex justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
            href="/portal/clientes/pagos"
          >
            Volver a pagos
          </Link>
        </div>
      </div>
    </>
  );
};

SuscripcionFinalizada.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default SuscripcionFinalizada;
