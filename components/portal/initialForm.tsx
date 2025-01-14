import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useUIStore } from "store/ui";

const InitialForm = () => {
  const openInitialForm: any = useUIStore((state) => state.openInitialForm);
  const showInitialForm: any = useUIStore((state) => state.showInitialForm);

  return (
    <Transition.Root show={openInitialForm} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={showInitialForm}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div>
                  <div className="text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-gray-900 pb-2"
                    >
                      Bienvenid@ al portal
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-gray-500">
                        Antes de empezar Has de contestar una serie de preguntas
                        para poder asesorarte mejor durante todo el proceso.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex w-auto justify-center rounded-md border border-transparent bg-secondary px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none sm:text-sm"
                    onClick={() => showInitialForm()}
                  >
                    Empezar
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

export default InitialForm;
