import PortalLayout from "components/layouts/portal";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import Head from "next/head";
import { usePortalStore } from "store/portal";
import { usePreguntasStore } from "store/preguntas";
import Link from "next/link";
import { Add, Check } from "components/icons";
import { useRouter } from "next/router";
import { setProfileCompleted, getInfoUser, getProfile } from "apis/client";
import { processesByUserId, requiredDocsByProcessId } from "apis/processes";
import LoadingContainer from "components/portal/loading";

const GenerarDocumentos = () => {
  const setDataProfile = usePortalStore((state) => state.setDataProfile);
  const profile = usePortalStore((state) => state.profile);
  const reset = usePreguntasStore((state) => state.reset);
  const setClientInfo = usePortalStore((state) => state.setClientInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    addData();
  }, []);

  const addData = async () => {
    await setProfileCompleted(profile.token, profile.id);
    reset();
    const profileData = await getProfile(profile.token, profile.id);
    setDataProfile(profileData);

    const clientInfo = await getInfoUser(profile.token, profile.id);

    setClientInfo(clientInfo);

    const processes = await processesByUserId(profile.token, profile.id);
    await requiredDocsByProcessId(
      profile.token,
      processes[0].id,
      JSON.stringify(clientInfo)
    );
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Preguntas completadas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      {loading ? (
        <LoadingContainer />
      ) : (
        <div className="mx-auto max-w-5xl py-10 px-16 bg-white mt-12 border rounded-lg">
          <div className="mb-8 flex justify-center">
            <div className="bg-green-100 rounded-full p-4">
              <Check className="h-16 w-16 text-green-400 bg-white rounded-full" />
            </div>
          </div>
          <h1 className="font-bold text-primary text-center text-2xl pb-4">
            Información enviada
          </h1>
          <p className="text-gray-500 text-center">
            A continuación añade todos tus acreedores para poder finalizar el
            proceso.
          </p>
          <div className="flex justify-center pt-8">
            <Link
              className="w-auto flex justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
              href="/portal/clientes/panel/listado-acreedores"
            >
              <Add className="h-5 w-5 mr-2" />
              Añadir acreedores
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

GenerarDocumentos.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default GenerarDocumentos;
