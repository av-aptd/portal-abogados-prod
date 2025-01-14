import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useUIStore } from "store/ui";

import { Day, Time } from "components/icons";
import { formatDate, formatTime } from "shared/helpers";
import { useRouter } from "next/router";
import { usePortalStore } from "store/portal";
import { getNotificationsUser, setReadNotification } from "apis/notifications";

export const ModalNotification = () => {
  const openModalNotification: any = useUIStore(
    (state) => state.openModalNotification
  );
  const showModalNotification: any = useUIStore(
    (state) => state.showModalNotification
  );
  const infoNotification: any = useUIStore((state) => state.infoNotification);
  const profile = usePortalStore((state) => state.profile);
  const setNotifications = usePortalStore((state) => state.setNotifications);
  const router = useRouter();

  const closeModal = async () => {
    if (!infoNotification.isRead) {
      await setReadNotification(infoNotification, profile);
      setNotifications(await getNotificationsUser(profile.id, profile.token));
    }

    showModalNotification(false);
  };

  return (
    <Transition.Root show={openModalNotification} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[120]"
        onClose={showModalNotification}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div>
                  <div className="">
                    <div className="flex justify-between">
                      <div className="flex space-x-4 items-center">
                        <img
                          className="h-10 w-10 rounded-full border"
                          src="/anagrama-noti.webp"
                          alt=""
                        />
                        <p className="truncate font-medium text-gray-900">
                          APTD
                        </p>
                      </div>
                      <div className="items-center pt-2">
                        <div className="flex items-center space-x-2 justify-end">
                          <Day className="h-4 w-4 text-secondary" />
                          <p className="text-secondary text-sm w-14">
                            {formatDate(
                              infoNotification.created_at,
                              "short",
                              router.locale
                            )}
                          </p>
                        </div>
                        {/* <div className="flex items-center space-x-2 justify-end">
                          <Time className="h-4 w-4 text-gray-400" />
                          <p className="text-gray-400 text-sm w-14 ">
                            {formatTime(
                              infoNotification.created_at,
                              router.locale
                            )}
                            h
                          </p>
                        </div> */}
                      </div>
                    </div>

                    <div className="mt-4 border rounded-lg p-2 text-gray-500 text-sm">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: infoNotification.message,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none sm:text-sm"
                    onClick={() => closeModal()}
                  >
                    Cerrar notificación
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
