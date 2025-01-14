import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ring } from "@uiball/loaders";
import { usePortalStore } from "store/portal";
import { addClientAddress } from "apis/client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const schema = z
  .object({
    address: z.string(),
    zip: z.string(),
    city: z.string(),
    province: z.string(),
  })
  .required();

type formData = z.infer<typeof schema>;

const AddClientAddressForm = ({
  action,
  createStripeCustomer,
  setShowNewAddress,
}: any) => {
  const profile = usePortalStore((state) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: async (data) =>
      addClientAddress(profile.token, profile.id, data),
    onSuccess: async (data) => {
      setShowNewAddress(false);
      createStripeCustomer();
      action();
    },
  });

  const onSubmit = async (data: any) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="border-b p-4">
        <h3>Añadir dirección</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 grid lg:grid-cols-3 gap-x-4 gap-y-6 p-4">
          <div className="lg:col-span-3">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección
            </label>
            <div className="mt-1">
              <input
                {...register("address")}
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="zip"
              className="block text-sm font-medium text-gray-700"
            >
              Código postal
            </label>
            <div className="mt-1">
              <input
                {...register("zip")}
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
              />
            </div>
          </div>
          <div className="col-span-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Ciudad
            </label>
            <div className="mt-1">
              <input
                {...register("city")}
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
              />
            </div>
          </div>
          <div className="col-span-1">
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700"
            >
              Provincia
            </label>
            <div className="mt-1">
              <input
                {...register("province")}
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t flex justify-end space-x-4 p-4">
          <button
            type="button"
            className="bg-white text-gray-500 text-sm px-4 py-2 border rounded-md hover:bg-gray-50 duration-200"
            onClick={() => action()}
          >
            Cerrar
          </button>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className="inline-flex items-center w-40 justify-center rounded-md border border-transparent bg-secondary px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
          >
            {mutation.isLoading ? <Ring size={16} color="#fff" /> : "Añadir"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddClientAddressForm;
