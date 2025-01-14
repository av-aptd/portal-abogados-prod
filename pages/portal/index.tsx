/* eslint-disable react-hooks/exhaustive-deps */
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "./../_app";
import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { usePreguntasStore } from "store/preguntas";
import { processesByUserId, getProcessInfo } from "apis/processes";

import { useRouter } from "next/navigation";
import { usePortalStore } from "store/portal";
import shallow from "zustand/shallow";
import { getInfoUser, getUserInitialQuestions } from "apis/client";
import { getNotificationsUser } from "apis/notifications";
import { getProfile } from "apis/auth";
import { Ring } from "@uiball/loaders";
import Cookies from "js-cookie";
import { ModalExtended } from "components/portal/estudio/modalExtended";
import { useUIStore } from "store/ui";
import { especialUsers } from "vars/shared";
import { useQuery } from "@tanstack/react-query";
import { getPayCometCards } from "apis/payments";

const Portal: NextPageWithLayout = () => {
  const router = useRouter();

  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const showModalExtended = useUIStore((state) => state.showModalExtended);

  const { setNotifications, setDataProfile, setClientInfo, profile } =
    usePortalStore(
      (state) => ({
        setNotifications: state.setNotifications,
        setDataProfile: state.setDataProfile,
        dataProfile: state.dataProfile,
        setClientInfo: state.setClientInfo,
        profile: state.profile,
      }),
      shallow
    );

  useEffect(() => {
    setInfoUser();
  }, [profile]);

  const setInfoUser = async () => {
    if (profile.isActive) {
      if (profile.token === undefined) {
        profile.token = "";
      }

      const infoClient = await getProfile(profile.id, profile.token);
      const notifications = await getNotificationsUser(
        profile.id,
        profile.token
      );

      setDataProfile(infoClient);
      setNotifications(notifications);

      if (profile.groups?.includes("Cliente")) {
        const processes = await processesByUserId(profile.token, profile.id);
        const status = await getProcessInfo(profile.token, processes[0]?.id);
        const payments = await getPayCometCards();

        if (infoClient.isProfileCompleted) {
          setClientInfo(await getInfoUser(profile.token, profile.id));

          if (payments) {
            if (payments.length > 0) {
              router.push("/portal/clientes/panel");
            } else {
              console.log("cookies new card:", Cookies.get("showNewCard"));

              if (
                Cookies.get("showNewCard") === "true" ||
                Cookies.get("showNewCard") === undefined
              ) {
                showModalExtended();
              } else {
                router.push("/portal/clientes/panel");
              }
            }
          }
        } else {
          if (status.installments_paid > 0) {
            const userProperties = await getUserInitialQuestions(
              profile.token,
              profile.id
            );

            if (userProperties.length === 0) {
              router.push("/portal/clientes/bienvenido");
            } else {
              if (
                userProperties[userProperties.length - 1].groupNextKey ===
                "completado"
              ) {
                router.push("/portal/clientes/panel");
              } else {
                setCurrentQuestion(
                  userProperties[userProperties.length - 1].groupNextKey
                );
                router.push("/portal/clientes/preguntas");
              }
            }
          } else {
            if (especialUsers.some((item) => item.email === profile.email)) {
              router.push("/portal/clientes/panel");
            } else {
              router.push("/portal/clientes/esperando-pago");
            }
          }
        }
      } else {
        router.push("/portal/aptd");
      }
    }
  };

  const noInteresa = () => {
    Cookies.set("showNewCard", "true");
    showModalExtended();
    router.push("/portal/clientes/panel");
  };

  const Interesa = () => {
    showModalExtended();
    Cookies.set("showNewCard", "false");
    router.push("/portal/clientes/pagos");
  };

  return (
    <>
      <div className="mx-auto max-w-xl mt-6">
        <div className="bg-white rounded-lg border p-8">
          <div className="flex items-center justify-center ">
            <Ring size={24} color="#1AABE3" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Cargando información
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 px-8 lg:px-0">
                Estamos cargando toda la información de tu perfil.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ModalExtended size="big">
        <div className="border-b py-4 px-8">
          <h3 className="font-semibold text-gray-700">Nuevo método de pago</h3>
        </div>
        <div className="py-4 px-8">
          <p className="text-gray-500 pb-4">Hola {profile.name},</p>
          <p className="text-gray-500 pb-4">
            Hemos hecho un cambio en nuestra plataforma y necesitamos que
            vuelvas a introducir los datos de tu tarjeta.
          </p>
          <p className="text-gray-500 pb-4">
            Haz click en el botón Añadir tarjeta para poner la nueva
            información.
          </p>
          <p className="text-gray-500">Muchas gracias por tu compresión.</p>
        </div>

        <div className="mt-4 border-t flex justify-end space-x-4 p-4">
          <button
            type="button"
            className="bg-white text-gray-700 text-sm px-4 py-2 border rounded-md hover:bg-gray-50 duration-200 focus:outline-none"
            onClick={() => noInteresa()}
          >
            Cerrar
          </button>

          <button
            type="button"
            onClick={() => Interesa()}
            className="inline-flex items-center w-56 justify-center rounded-md border border-transparent bg-secondary px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
          >
            Añadir tarjeta
          </button>
        </div>
      </ModalExtended>
    </>
  );
};

Portal.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Portal;
