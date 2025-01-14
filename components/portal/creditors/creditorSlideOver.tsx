import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useUIStore } from "store/ui";
import NewUserCreditorForm from "./newUserCreditor";
import NewAPTDCreditorForm from "./newAPTDCreditor";
import NewUserCreditorAPTDForm from "./newUserCreditorByAPTD";

const NewCreditorSlideOver = () => {
  const openNewCreditor = useUIStore((state) => state.openNewCreditor);
  const showNewCreditor = useUIStore((state) => state.showNewCreditor);
  const creditorType = useUIStore((state) => state.creditorType);

  return (
    <Transition.Root show={openNewCreditor} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={showNewCreditor}>
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  {creditorType === "user" && <NewUserCreditorForm />}
                  {creditorType === "aptd" && <NewAPTDCreditorForm />}
                  {creditorType === "userAPTD" && <NewUserCreditorAPTDForm />}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NewCreditorSlideOver;
