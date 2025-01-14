import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Help, Close } from "components/icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUIStore } from "store/ui";
import { Controller, useForm } from "react-hook-form";
import { usePreguntasStore } from "store/preguntas";

const estimativo = [
  `<p>Indica cuál es el valor actual de mercado aproximado.</p>
`,
];

const detalles = [
  `<p>Indica de qué activo se trata. (maquinaria de empresa, joyas y obras de arte de gran valor, etc) y explica los detalles sobre este activo.</p>
`,
];

const OtroModal = ({ name, setUserActivos, userActivos }: any) => {
  const openModal: any = usePreguntasStore((state) => state.openModal);
  const showModal: any = usePreguntasStore((state) => state.showModal);
  const setHelp = useUIStore((state) => state.setHelp);
  const showHelpModal = useUIStore((state) => state.showHelpModal);

  const schema = z.object({
    estimatedValue: z.string().min(1),
    moreDetails: z.string().min(1),
  });

  type FormData = z.infer<typeof schema>;

  const setHelpMessage = (question: any) => {
    setHelp(question);
    showHelpModal();
  };

  const { register, handleSubmit, reset, control } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: any) => {
    setUserActivos([
      ...userActivos,
      {
        naturaleza: "Otro activo",
        name,
        ...{
          estimatedValue: data.estimatedValue,
          moreDetails: data.moreDetails,
        },
      },
    ]);

    showModal();
    reset();
  };

  const inmuebles = [
    { name: "Urbana", value: "urbana" },
    { name: "Rústica", value: "rustica" },
    { name: "Otro", value: "otro" },
  ];

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={showModal}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="pt-3 flex-1 text-xl font-bold pl-4">
                    {name}
                  </div>
                  <button onClick={() => showModal()}>
                    <Close className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-8 grid lg:grid-cols-2 gap-8 p-4 mb-4 rounded-lg"
                >
                  <div>
                    <label
                      htmlFor="moreDetails"
                      className="flex text-sm font-medium text-gray-900"
                    >
                      ¿Nos puedes dar más detalles sobre este bien?
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(detalles)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("moreDetails")}
                      id="moreDetails"
                      name="moreDetails"
                      type="text"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="estimatedValue"
                      className="flex text-sm font-medium text-gray-900"
                    >
                      ¿Cuál es el valor estimativo de este bien?
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(estimativo)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("estimatedValue")}
                      id="estimatedValue"
                      name="estimatedValue"
                      type="text"
                    />
                  </div>

                  <div className="lg:col-span-3">
                    <div>
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none sm:text-sm"
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default OtroModal;
