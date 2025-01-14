import React from "react";
import PortalLayout from "components/layouts/portal";
import ClientLayout from "components/layouts/client";
import type { NextPageWithLayout } from "../../../../../_app";
import type { ReactElement } from "react";
import MessageClient from "components/portal/messageClient";
import { usePortalStore } from "store/portal";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "apis/client";
import { useRouter } from "next/router";
import { getNotificationsUser } from "apis/notifications";
import { formatDate } from "shared/helpers";
import clsx from "clsx";
import PortalHeader from "components/portal/layout/header";
import { Day, Notifications } from "components/icons";

const NotificationsUserAdmin: NextPageWithLayout = () => {
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();

  const userInfoQuery = useQuery(["userInfo", router.query.id], async () =>
    getProfile(profile.token, router.query.id)
  );

  const notificationsQuery = useQuery(
    ["userNotifications", router.query.id],
    async () => getNotificationsUser(router.query.id, profile.token)
  );

  return (
    <>
      <PortalHeader title="Notificaciones cliente" />
      <div className="flex justify-between items-baseline border-b border-gray-100 px-4 pb-4">
        <p className="text-sm font-medium pt-1">Listado de notificaciones</p>
      </div>

      <div className="grid lg:grid-cols-2 lg:gap-8 items-start p-4">
        <div>
          {notificationsQuery.isLoading ? (
            <p>Cargando</p>
          ) : (
            <>
              {notificationsQuery.data.length > 0 ? (
                notificationsQuery.data.map((notification: any) => (
                  <div
                    key={notification.id}
                    className="border p-4 mb-4 rounded-lg relative bg-gray-50/50"
                  >
                    <div className="flex space-x-2 items-center mb-4">
                      <Day className="w-5 h-5 text-secondary" />
                      <p className="text-xs text-secondary">
                        {formatDate(notification.created_at, "es", "short")}
                      </p>
                    </div>

                    <h4 className="font-semibold pb-2 text-gray-700">
                      {notification.title}
                    </h4>

                    <div
                      className="pt-0 text-sm text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: notification.message,
                      }}
                    ></div>

                    <div
                      className={clsx(
                        notification.isRead ? "bg-green-100" : "bg-red-100",
                        "absolute top-3 right-2 rounded-full px-2 py-1"
                      )}
                    >
                      <p
                        className={clsx(
                          notification.isRead
                            ? "text-green-600"
                            : "text-red-600",
                          "text-[10px]"
                        )}
                      >
                        {notification.isRead ? "Leído" : "No leído"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="border p-8 mb-4 rounded-lg flex justify-center items-center bg-gray-50/50">
                  <div className="">
                    <Notifications className="w-8 h-8 text-secondary mx-auto" />
                    <p className="text-sm text-gray-500 text-center pt-4">
                      Todavía no se han enviado notificaciones a este cliente
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="p-4 rounded-lg border sticky top-20 bg-gray-50/50">
          <p className="text-sm pb-2 text-gray-500">Enviar mensaje a cliente</p>
          <MessageClient
            user={userInfoQuery.isLoading ? "" : userInfoQuery.data}
            token={profile.token}
            owner={`${dataProfile.name} ${dataProfile.surname}`}
          />
        </div>
      </div>
    </>
  );
};

NotificationsUserAdmin.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ClientLayout>{page}</ClientLayout>
    </PortalLayout>
  );
};

export default NotificationsUserAdmin;
