import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useUIStore } from "store/ui";
import clsx from "clsx";
import { Close } from "components/icons";

export const ModalExtended = ({ children, size }: any) => {
  const openModalExtended: any = useUIStore((state) => state.openModalExtended);
  const showModalExtended: any = useUIStore((state) => state.showModalExtended);

  return (
    <Transition.Root show={openModalExtended} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => console.log()}
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
              <Dialog.Panel
                className={clsx(
                  "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full",
                  size == "big"
                    ? "sm:max-w-2xl"
                    : size == "huge"
                    ? "sm:max-w-4xl"
                    : "sm:max-w-lg"
                )}
              >
                <button
                  onClick={() => showModalExtended()}
                  className="absolute top-4 right-4"
                >
                  <div className="border rounded-full hover:bg-gray-100 duration-150">
                    <Close className="w-5 h-5 text-gray-500" />
                  </div>
                </button>

                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
