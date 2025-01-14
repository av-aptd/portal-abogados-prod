import { Fragment, useState, useEffect } from "react";
import { Transition, Dialog, Menu } from "@headlessui/react";
import { useUIStore } from "store/ui";
import { Close, ArrowNext } from "components/icons";

import { usePortalStore } from "store/portal";
import { formatDate, formatTime } from "shared/helpers";
import { useRouter } from "next/router";
import clsx from "clsx";

export const NotificationSlideOver = () => {
  const openNotifications: any = useUIStore((state) => state.openNotifications);
  const showNotifications: any = useUIStore((state) => state.showNotifications);
  const showModalNotification: any = useUIStore(
    (state) => state.showModalNotification
  );
  const setInfoNotification: any = useUIStore(
    (state) => state.setInfoNotification
  );

  const infoNotification = useUIStore((state) => state.infoNotification);

  const notifications = usePortalStore((state) => state.notifications);

  console.log(notifications);
  console.log(infoNotification);

  const [current, setCurrent] = useState("all");
  const [selectedNotis, setSelectedNotis] = useState<any[]>([]);

  const router = useRouter();

  const tabs = [
    { nameES: "Todas", nameEN: "Todas", value: "all" },
    {
      nameES: "No leídas",
      nameEN: "No leídas",
      value: "unread",
    },
    {
      nameES: "Leídas",
      nameEN: "Leídas",
      value: "read",
    },
  ];

  useEffect(() => {
    setSelectedNotis(notifications);
  }, [notifications]);

  const notisRead = notifications.filter((item) => item.isRead === true);
  const notisUnRead = notifications.filter((item) => item.isRead === false);

  const selectNotis = (noti: any) => {
    setCurrent(noti);

    switch (noti) {
      case "all":
        setSelectedNotis(notifications);
        break;
      case "unread":
        setSelectedNotis(notisUnRead);
        break;
      case "read":
        setSelectedNotis(notisRead);
        break;
      default:
        setSelectedNotis(notifications);
    }
  };

  const openModalNoti = (noti: any) => {
    setInfoNotification({
      id: noti.id,
      created_at: noti.created_at,
      message: noti.message,
      isRead: noti.isRead,
    });
    showModalNotification();
  };

  return (
    <Transition.Root show={openNotifications} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={showNotifications}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="bg-primary py-6 px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">
                          Notificaciones
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-primary text-indigo-200 hover:text-white focus:outline-none"
                            onClick={() => showNotifications(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <Close className="h-8 w-8" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-white/60">
                          A continuación se muestra una lista de todas tus
                          notificaciones.
                        </p>
                      </div>
                    </div>

                    <div className="border-b border-gray-200">
                      <div className="px-6 pt-4">
                        <nav
                          className="-mb-px flex space-x-6"
                          x-descriptions="Tab component"
                        >
                          {tabs.map((tab) => (
                            <button
                              key={tab.value}
                              className={clsx(
                                current === tab.value
                                  ? "border-secondary text-secondary"
                                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                              )}
                              onClick={() => selectNotis(tab.value)}
                            >
                              {router.locale === "es" ? tab.nameES : tab.nameEN}
                            </button>
                          ))}
                        </nav>
                      </div>
                    </div>
                    <ul
                      role="list"
                      className="flex-1 divide-y divide-gray-200 overflow-y-auto"
                    >
                      {selectedNotis.length > 0 ? (
                        selectedNotis.map((noti) => (
                          <li key={noti.id}>
                            <div className="group relative flex items-center py-6 px-5">
                              <div
                                onClick={() => openModalNoti(noti)}
                                className="-m-1 block flex-1 p-1 cursor-pointer"
                              >
                                <div
                                  className="absolute inset-0 group-hover:bg-gray-50"
                                  aria-hidden="true"
                                />
                                <div className="relative flex min-w-0 flex-1 items-start">
                                  <span className="relative inline-block flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full border"
                                      src="/anagrama-noti.webp"
                                      alt=""
                                    />
                                    <span
                                      className={clsx(
                                        noti.isRead
                                          ? "bg-green-400"
                                          : "bg-red-400",
                                        "absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <div className="ml-4 truncate flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900">
                                      APTD
                                    </p>
                                    <div
                                      className="pt-0 truncate w-40 sm:w-80 text-sm text-gray-500 h-[60px]"
                                      dangerouslySetInnerHTML={{
                                        __html: noti.message,
                                      }}
                                    ></div>
                                  </div>
                                  <div className="text-right">
                                    <p className="truncate text-sm text-gray-900 font-medium">
                                      {formatDate(
                                        noti.created_at,
                                        "short",
                                        router.locale
                                      )}
                                    </p>
                                    <p className="truncate text-sm text-gray-500 ">
                                      {formatTime(
                                        noti.created_at,
                                        router.locale
                                      )}
                                      {router.locale === "es" && <span>h</span>}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <div className="p-8 text-sm text-gray-700">
                          {/* Todavía no hay notificaciones */}
                        </div>
                      )}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
