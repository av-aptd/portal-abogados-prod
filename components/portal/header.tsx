import Image from "next/image";
import { Notifications, Notation, AddCalendar } from "components/icons";
import anagrama from "public/anagrama-color.webp";
import { useUIStore } from "store/ui";
import { MenuProfile } from "./menuProfile";
import { MenuLangs } from "./menuLangs";
import { usePortalStore } from "store/portal";
import { useRouter } from "next/router";
import { usePreguntasStore } from "store/preguntas";
import React, { useState, useEffect, use } from "react";
import { getNotificationsUser } from "apis/notifications";
import { ModalExtended } from "components/portal/estudio/modalExtended";

export const HeaderPortal = () => {
  const showNotifications: any = useUIStore((state) => state.showNotifications);
  const notifications = usePortalStore((state) => state.notifications);
  const setNotifications = usePortalStore((state) => state.setNotifications);
  const isImpersonate = usePortalStore((state) => state.isImpersonate);
  const setImpersonate = usePortalStore((state) => state.setImpersonate);
  const setDataProfile = usePortalStore((state) => state.setDataProfile);
  const originalProfile = usePortalStore((state) => state.originalProfile);
  const setUserId = usePreguntasStore((state) => state.setUserId);
  const setToken = usePreguntasStore((state) => state.setToken);
  const profile = usePortalStore((state) => state.profile);
  const [number, setNumber] = useState(0);
  const originalDataProfile = usePortalStore(
    (state) => state.originalDataProfile
  );
  const setOriginalProfile = usePortalStore(
    (state) => state.setOriginalProfile
  );

  const showNotification = useUIStore((state) => state.showNotification);

  const setOriginalDataProfile = usePortalStore(
    (state) => state.setOriginalDataProfile
  );

  const router = useRouter();
  const setInfoAlertNotification = useUIStore(
    (state) => state.setInfoAlertNotification
  );
  const setProfile = usePortalStore((state) => state.setProfile);

  const noReadNotifications = () => {
    return notifications.some((item: any) => item.isRead === false);
  };

  console.log("profile", profile);

  const checkNotifications = async () => {
    // if (noReadNotifications()) {
    //   setInfoAlertNotification({
    //     title: "Notificaciones pendientes",
    //     message: "Tienes notificaciones pendientes de leer.",
    //   });
    //   showNotification();
    // }

    await getNotificationsUser(profile.id, profile.token);
    setNumber(Math.random());
  };

  useEffect(() => {
    const timer = setTimeout(() => checkNotifications(), 600000);
    return () => clearTimeout(timer);
  }, [number]);

  const logoutImpersonate = async () => {
    setImpersonate();
    setProfile(originalProfile);
    setDataProfile(originalDataProfile);
    setUserId(originalProfile.id);
    setToken(originalProfile.token);
    router.push("/portal");
  };

  return (
    <div className="bg-white h-16 px-6 flex justify-between items-center fixed inset-x-0 border-b border-gray-200 z-30">
      <div className="relative h-10 w-10">
        <Image
          src="/favicon.png"
          alt="Anagrama de APTD"
          className="object-contain"
          fill
        />
      </div>

      <div className="flex items-center space-x-4">
        {/* <MenuLangs /> */}
        {isImpersonate && (
          <button
            className="text-white text-sm px-4 py-1 rounded-md flex justify-center items-center bg-secondary mr-4"
            onClick={() => logoutImpersonate()}
          >
            Logout Impersonate
          </button>
        )}

        {profile && profile?.groups?.includes("Cliente") && (
          <a
            className="text-white text-sm px-4 py-1 rounded-md flex justify-center items-center bg-secondary mr-4"
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ34q13qDJ6ZlIRT3abgRKwFctzgx-KT04NNXHqlZcjnoCQ3maKM76xaUtsI9BY2ivT2qM7FUqui"
            target="_blank"
          >
            <span className="sm:hidden">
              <AddCalendar className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline-block">
              Agendar visita presencial
            </span>
          </a>
        )}

        <button onClick={showNotifications} className="relative">
          <Notifications className="h-7 w-7 text-gray-400" />
          {noReadNotifications() ? (
            <span className="absolute top-0 right-0 flex justify-center items-center">
              <span className="animate-ping absolute h-3 w-3 rounded-full bg-red-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
            </span>
          ) : // <div className="animate-ping h-2 w-2 rounded-full bg-red-400 absolute top-0 right-0" />
          null}
        </button>

        <MenuProfile />
      </div>
      {/* <ModalExtended>
        <div className="border-b py-4 px-8">
          <h3 className="font-semibold text-gray-700">Nuevas notificaciones</h3>
        </div>
        <div className="p-8">
          <p className="text-gray-500 pb-4">Hola {profile.name},</p>
          <p className="text-gray-500 pb-4">
            Tienes nuevas notificaciones para leer. Haz click en la campana para
            ver las nuevas notificaciones.
          </p>
        </div>
      </ModalExtended> */}
    </div>
  );
};
