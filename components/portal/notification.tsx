import { Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Check, Close, Wrong } from "components/icons";
import { useUIStore } from "store/ui";

export const Notification = () => {
  const openNotification: any = useUIStore((state) => state.openNotification);
  const showNotification: any = useUIStore((state) => state.showNotification);
  const infoAlertNotification = useUIStore(
    (state) => state.infoAlertNotification
  );

  useEffect(() => {
    if (openNotification === true) {
      const timer = setTimeout(() => {
        showNotification();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [openNotification]);

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-[100]"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={openNotification}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-secondary shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {infoAlertNotification.icon === "good" && (
                      <Check
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    )}
                    {infoAlertNotification.icon === "bad" && (
                      <Wrong
                        className="h-6 w-6 text-red-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-white">
                      {infoAlertNotification.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-200">
                      {infoAlertNotification.message}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white/20 text-white hover:text-gray-50 focus:outline-none "
                      onClick={() => {
                        showNotification(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <Close className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
