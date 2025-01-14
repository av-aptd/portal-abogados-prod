import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../../_app";
import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { usePortalStore } from "store/portal";

import Breadcrumbs from "components/portal/breadCrumbs";

import Link from "next/link";
import { useRouter } from "next/router";
import {
  Memoria,
  Inventario,
  Solicitud,
  Users,
  Warning,
} from "components/icons";

import { getInfoUser, getProfile, getUserCreditors } from "apis/client";

import SectionBloc from "components/layouts/components/section/sectionBloc";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import CreditorBox from "./components/creditorBox";

const UserDocs: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const setClientInfo = usePortalStore((state) => state.setClientInfo);
  const setClient = usePortalStore((state) => state.setClient);
  const router = useRouter();
  const clientInfo = usePortalStore((state) => state.clientInfo);

  const route = [
    {
      title: "Procesal",
      path: "/portal/aptd/procesal/",
    },
    {
      title: "Cliente",
      path: "/portal/aptd/procesal/",
    },
  ];

  useEffect(() => {
    getUserInfo();
  }, []);

  const isQuestionsAnswered = () => {
    if (clientInfo?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const getUserInfo = async () => {
    const userProperties = await getInfoUser(profile.token, router.query.id);
    const client = await getProfile(profile.token, router.query.id);

    setClientInfo(userProperties);
    setClient({
      name: client.name,
      surname: client.surname,
      id: client.id,
      dni: client.dni,
    });
  };

  const hasAssets = () => {
    // const assets = clientInfo.find(
    //   (item) => item.groupKey === "tienesbienesactivos"
    // );

    // if (assets?.properties[0].propertyValue == "no") {
    //   return false;
    // } else {
    //   return true;
    // }
    return true;
  };

  const hasWorkers = () => {
    const assets = clientInfo.find(
      (item) => item.groupKey === "autonomoopersonafisica"
    );

    if (assets?.properties[0].propertyValue == "autonomo") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="pt-16 pb-8">
          <SectionBloc title="Generar documentación">
            <div className="grid lg:grid-cols-3 gap-8">
              <Link
                href={
                  isQuestionsAnswered()
                    ? `/portal/aptd/procesal/documentacion/${router.query.id}/documentos/memoria`
                    : `/portal/aptd/procesal/documentacion/${router.query.id}`
                }
                className={clsx(
                  !isQuestionsAnswered() ? "border-red-400" : "",
                  " border-2 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 duration-150 relative"
                )}
              >
                <div>
                  <div className="pb-1">
                    <Memoria className="w-12 h-12 text-gray-500 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-500 px-4 text-center mt-2">
                    Memoria expresiva de la Historia Económica y Jurídica.
                  </p>
                </div>
                {!isQuestionsAnswered() && (
                  <Warning className="absolute top-1 right-1 w-5 h-5 text-red-400" />
                )}
              </Link>
              {hasAssets() && (
                <Link
                  href={`/portal/aptd/procesal/documentacion/${router.query.id}/documentos/inventario`}
                  className="bg-gray-50 border p-6 rounded-lg hover:bg-gray-100 duration-150"
                >
                  <div>
                    <div className="pb-1">
                      <Inventario className="w-12 h-12 text-gray-500 mx-auto" />
                    </div>
                    <p className="text-sm text-gray-500 px-4 text-center mt-2">
                      Inventario de bienes y derechos.
                    </p>
                  </div>
                </Link>
              )}

              <Link
                href={
                  isQuestionsAnswered()
                    ? `/portal/aptd/procesal/documentacion/${router.query.id}/documentos/demanda`
                    : `/portal/aptd/procesal/documentacion/${router.query.id}`
                }
                className={clsx(
                  isQuestionsAnswered() ? "" : "border-red-400",
                  " border-2 flex justify-center items-center rounded-lg bg-gray-50 hover:bg-gray-100 duration-150 relative"
                )}
              >
                <div className="p-6">
                  <div className="pb-1">
                    <Solicitud className="w-12 h-12 text-gray-500 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-500 px-4 text-center mt-2">
                    Solicitud de concurso consecutivo.
                  </p>
                </div>
                {!isQuestionsAnswered() && (
                  <Warning className="absolute top-1 right-1 w-5 h-5 text-red-400" />
                )}
              </Link>
              {hasWorkers() && (
                <Link
                  href={`/portal/aptd/procesal/documentacion/${router.query.id}/documentos/trabajadores`}
                  className="bg-gray-50 border flex justify-center items-center rounded-lg hover:bg-gray-100 duration-150"
                >
                  <div className="p-6">
                    <div className="pb-1">
                      <Users className="w-12 h-12 text-gray-500 mx-auto" />
                    </div>
                    <p className="text-sm text-gray-500 px-4 text-center mt-2">
                      Listado de trabajadores cliente.
                    </p>
                  </div>
                </Link>
              )}
              <CreditorBox userId={router.query.id} />
            </div>
          </SectionBloc>
        </div>
      </div>
    </>
  );
};

UserDocs.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default UserDocs;
