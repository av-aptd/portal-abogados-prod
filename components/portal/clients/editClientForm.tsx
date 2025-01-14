import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ring } from "@uiball/loaders";
import { editClientData } from "apis/client";

import { usePortalStore } from "store/portal";

const schema = z.object({
  name: z.string(),
  surname: z.string(),
  phone: z.string(),
  dni: z.string(),
});

type FormData = z.infer<typeof schema>;

const EditClientForm = ({ client }: any) => {
  const queryClient = useQueryClient();
  const profile = usePortalStore((state) => state.profile);

  const router = useRouter();
  useEffect(() => {
    setValue("name", client?.name);
    setValue("surname", client?.surname);
    setValue("phone", client?.phonenumber);
    setValue("dni", client?.dni);
  }, [client]);

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (user) => editClientData(profile.token, client.id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userInfo"],
      });
    },
  });

  const onSubmit = async (data: any) => {
    const user = {
      ...client,
      ...data,
      groups: client.groups.map((group: any) => group.groupId),
      email: client.emailaddress,
    };
    mutation.mutate(user);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:grid-cols-2 gap-4 lg:gap-6"
      >
        <div className="">
          <label htmlFor="name" className="block text-sm text-gray-500">
            Nombre
          </label>
          <div className="mt-1">
            <input
              {...register("name")}
              type="text"
              className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-gray-900"
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="surname" className="block text-sm text-gray-500">
            Apellidos
          </label>
          <div className="mt-1">
            <input
              {...register("surname")}
              type="text"
              className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-gray-900"
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="phone" className="block text-sm text-gray-500">
            Teléfono
          </label>
          <div className="mt-1">
            <input
              {...register("phone")}
              type="text"
              className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-gray-900"
            />
          </div>
        </div>

        <div className="">
          <label htmlFor="dni" className="block text-sm text-gray-500">
            DNI
          </label>
          <div className="mt-1">
            <input
              disabled
              {...register("dni")}
              type="text"
              className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-gray-900"
            />
          </div>
        </div>

        <div className="lg:col-span-2 border-t border-gray-100 pt-4 flex justify-end space-x-4">
          <button
            disabled={mutation.isLoading}
            type="submit"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary w-40 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 disabled:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            {mutation.isLoading ? (
              <div className="py-0.5">
                <Ring size={16} color="#fff" />
              </div>
            ) : (
              "Guardar cambios"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClientForm;
