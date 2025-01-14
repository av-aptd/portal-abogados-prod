import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Close } from "../icons";
import { useUIStore } from "store/ui";

const HelpSlideOver = () => {
  const showHelpModal = useUIStore((state) => state.showHelpModal);
  const openModalHelp = useUIStore((state) => state.openModalHelp);
  const help = useUIStore((state) => state.help);

  return (
    <Transition.Root show={openModalHelp} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[110]"
        onClose={() => showHelpModal()}
      >
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
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 sm:px-6 bg-secondary py-3">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-white">
                          Ayuda
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white/20 text-white hover:bg-white/30 focus:outline-none"
                            onClick={() => showHelpModal()}
                          >
                            <span className="sr-only">Close panel</span>
                            <Close className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-12 flex-1 px-4 sm:px-6">
                      <div
                        className="prose prose-p:text-gray-500 prose-h4:text-gray-700 prose-li:text-gray-500"
                        dangerouslySetInnerHTML={{ __html: help }}
                      />
                    </div>
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

export default HelpSlideOver;
