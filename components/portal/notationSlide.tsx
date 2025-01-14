import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useUIStore } from "store/ui";
import { Close } from "components/icons";

import { useForm } from "react-hook-form";
import { usePortalStore } from "store/portal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const judicializedDebts = [
  {
    name: "Sí",
    value: "yes",
  },
  {
    name: "No",
    value: "no",
  },
];

const schema = z.object({
  creditorId: z.string(),
  typeOfDebt: z.string(),
  contractAmount: z
    .number({ invalid_type_error: "El importe debe ser un número" })
    .min(0.01, { message: "El importe debe ser mayor de 0" }),
  judicializedDebt: z.string({
    invalid_type_error: "Por favor selecciona una opción",
  }),
  isSeized: z.string().optional(),
  courtName: z.string().optional(),
  procedureNumber: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const NewNotationSlideOver = () => {
  const openNewNotation: any = useUIStore((state) => state.openNewNotation);
  const showNewNotation: any = useUIStore((state) => state.showNewNotation);
  const profile: any = usePortalStore((state) => state.profile);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const getCreditors = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/creditors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
    });
    return await res.json();
  };

  const { data: creditors } = useQuery({
    queryKey: ["creditors"],
    queryFn: getCreditors,
  });

  const getDebTypes = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/debt-types`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${profile.token}`,
        },
      }
    );
    return await res.json();
  };

  const { data: debTypes } = useQuery({
    queryKey: ["debTypes"],
    queryFn: getDebTypes,
  });

  const watchFields = watch(["judicializedDebt", "isSeized"]);

  const getCreditorInfo = (creditorId: string) => {
    const creditor = creditors.find(
      (creditor: any) => creditor.id === Number(creditorId)
    );
    return creditor;
  };

  const closeCreditorModal = () => {
    showNewNotation(false);
    reset();
  };

  const onSubmit = async (data: any) => {
    const creditorInfo = getCreditorInfo(data.creditorId);

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
      body: JSON.stringify({
        clientId: profile.id,
        creditorName: creditorInfo.name,
        creditorLocation: creditorInfo.location,
        creditorEmail: creditorInfo.email,
        creditorPhoneNumber: creditorInfo.phonenumber,
        contractAmount: data.contractAmount,
        typeOfDebt: data.typeOfDebt,
        expirationDate,
        debtStatus:
          data.judicializedDebt == "yes"
            ? "Deuda judicializada"
            : "Deuda no judicializada",
        stage: data.isSeized == "yes" ? "Etapa ejecutiva" : "Etapa declarativa",
        courtName: data.courtName,
        procedureNumber: data.procedureNumber,
      }),
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/creditors/client/${profile.id}`,
      settings
    );

    queryClient.invalidateQueries({ queryKey: ["creditors"] });
    queryClient.invalidateQueries({ queryKey: ["userCreditors"] });

    reset();
    showNewNotation();
  };

  return (
    <Transition.Root show={openNewNotation} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={showNewNotation}>
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
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                  >
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-primary py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            Nueva anotación
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-primary text-indigo-200 hover:text-white focus:outline-none"
                              onClick={() => showNewNotation(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <Close className="h-8 w-8" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-white/60">
                            A continuación escribe la anotación
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pt-6 pb-5">
                            <div>
                              <label
                                htmlFor="creditorId"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Tipo de anotación
                              </label>
                              <select
                                {...register("creditorId")}
                                id="creditorId"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                              >
                                {creditors?.map((creditor: any) => (
                                  <option key={creditor.id} value={creditor.id}>
                                    {creditor.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label
                                htmlFor="typeOfDebt"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Responsable
                              </label>
                              <select
                                {...register("typeOfDebt")}
                                id="typeOfDebt"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                              >
                                {debTypes?.map((debType: any) => (
                                  <option
                                    key={debType.value}
                                    value={debType.value}
                                  >
                                    {debType.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label
                                htmlFor="typeOfDebt"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Estado
                              </label>
                              <select
                                {...register("typeOfDebt")}
                                id="typeOfDebt"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                              >
                                {debTypes?.map((debType: any) => (
                                  <option
                                    key={debType.value}
                                    value={debType.value}
                                  >
                                    {debType.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label
                                htmlFor="expirationDate"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Vencimiento
                              </label>
                              <div className="mt-1">
                                <DatePicker
                                  locale="es"
                                  dateFormat="P"
                                  selected={expirationDate}
                                  onChange={(date: Date) =>
                                    setExpirationDate(date)
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="typeOfDebt"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Anotación
                              </label>
                              <div className="mt-1">
                                <textarea
                                  rows={3}
                                  className="block border-gray-300 w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-start lg:justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                        onClick={() => closeCreditorModal()}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NewNotationSlideOver;
