import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { usePortalStore } from "store/portal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Close } from "components/icons";
import { useUIStore } from "store/ui";
import { addAptdCreditor } from "apis/creditors";
import { Ring } from "@uiball/loaders";

const schema = z.object({
  name: z.string(),
  location: z.string(),
  email: z.string().email(),
  phonenumber: z.string(),
});

type FormData = z.infer<typeof schema>;

function NewAPTDCreditorForm() {
  const [expirationDate, setExpirationDate] = useState(new Date());
  const profile = usePortalStore((state) => state.profile);
  const showNewCreditor: any = useUIStore((state) => state.showNewCreditor);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation((body: any) => addAptdCreditor(body), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCreditors"] });
      reset();
      showNewCreditor();
    },
  });

  const onSubmit = async (data: any) => {
    mutation.mutate(data);
  };

  const closeCreditorModal = () => {
    showNewCreditor(false);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
    >
      <div className="h-0 flex-1 overflow-y-auto">
        <div className="bg-primary py-6 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium text-white">
              Nuevo acreedor
            </Dialog.Title>
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="rounded-md bg-primary text-indigo-200 hover:text-white focus:outline-none"
                onClick={() => showNewCreditor(false)}
              >
                <span className="sr-only">Close panel</span>
                <Close className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-1">
            <p className="text-sm text-white/60">
              A continuación rellena la información del acreedor.
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="divide-y divide-gray-200 px-4 sm:px-6">
            <div className="space-y-6 pt-6 pb-5">
              <div>
                <label
                  htmlFor="procedureNumber"
                  className="block text-sm font-medium text-gray-900"
                >
                  Nombre
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    {...register("name")}
                    type="text"
                    className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    {...register("email")}
                    type="text"
                    className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium text-gray-900"
                >
                  Teléfono
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    {...register("phonenumber")}
                    type="text"
                    className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-900"
                >
                  Dirección
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <textarea
                    {...register("location")}
                    className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                  />
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
          {mutation.isLoading ? <Ring size={20} color="#fff" /> : "Añadir"}
        </button>
      </div>
    </form>
  );
}

export default NewAPTDCreditorForm;
