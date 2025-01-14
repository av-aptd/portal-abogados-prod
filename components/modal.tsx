import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useUIStore } from "store/ui";
import { Check, Wrong, Close } from "components/icons";
import CanvasDraw from "react-canvas-draw";

export const Modal = ({ action, canvasDraw }: any) => {
  const openModal: any = useUIStore((state) => state.openModal);
  const showModal: any = useUIStore((state) => state.showModal);
  const info: any = useUIStore((state) => state.info);

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <button
                  onClick={() => showModal()}
                  className="absolute top-4 right-6"
                >
                  <div className="border rounded-full hover:bg-gray-50 duration-150">
                    <Close className="w-6 h-6 text-gray-500" />
                  </div>
                </button>
                {info.type == "alert" && (
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center">
                      {info.icon === "good" && (
                        <Check
                          className="h-12 w-12 text-green-400"
                          aria-hidden="true"
                        />
                      )}
                      {info.icon === "bad" && (
                        <Wrong
                          className="h-12 w-12 text-red-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {info.title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{info.message}</p>
                      </div>
                    </div>
                  </div>
                )}
                {info.type == "signature" && (
                  <div>
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {info.title}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {info.message}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => canvasDraw.current.eraseAll()}
                          className="bg-red-400 text-white rounded px-4 py-1"
                        >
                          Borrar
                        </button>
                      </div>

                      <div className="border mt-4">
                        <CanvasDraw
                          ref={canvasDraw}
                          hideInterface
                          hideGrid
                          brushRadius={4}
                          lazyRadius={1}
                          canvasHeight={300}
                          canvasWidth={500}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none sm:text-sm"
                    onClick={action}
                  >
                    {info.textButton}
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
