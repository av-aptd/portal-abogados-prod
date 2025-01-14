import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Ring } from "@uiball/loaders";
import { formatDate } from "shared/helpers";
import { editLead } from "apis/leads";
import { getTenants } from "apis/tenants";
import { usePortalStore } from "store/portal";

const schema = z.object({
  name: z.string(),
  surname: z.string(),
  phone: z.string(),
  email: z.string().email(),
  dni: z.string(),
  created_at: z.string(),
  debtValue: z.string(),
  tenantid: z.number(),
});

type FormData = z.infer<typeof schema>;

const EditLeadForm = ({ lead }: any) => {
  const queryClient = useQueryClient();
  const profile = usePortalStore((state) => state.profile);
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const router = useRouter();
  useEffect(() => {
    setValue("name", lead.name);
    setValue("surname", lead.surname);
    setValue("phone", lead.phone);
    setValue("email", lead.email);
    setValue("dni", lead.dni);
    setValue("debtValue", lead.debtValue);
    setValue("created_at", lead.created_at);
    setValue("tenantid", lead.tenantid);
  }, []);

  console.log(dataProfile);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const tenantsQuery = useQuery(["tenants"], async () =>
    getTenants(profile.token)
  );

  const mutation = useMutation({
    mutationFn: (user) => editLead(user, lead.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leadInfo"],
      });

      queryClient.invalidateQueries({
        queryKey: ["leadInfo", router.query.id],
      });
    },
  });

  const onSubmit = async (data: any) => {
    let user = { ...lead, ...data };
    delete user.tenant;
    mutation.mutate(user);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-2 items-center text-sm text-gray-500 pb-3 border-b">
          <label htmlFor="name" className="block text-sm">
            Nombre
          </label>
          <input
            {...register("name")}
            type="text"
            className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-right text-gray-700"
          />
        </div>
        <div className="grid grid-cols-2 items-center text-sm text-gray-500 py-3 border-b">
          <label htmlFor="surname" className="block text-sm">
            Apellidos
          </label>
          <input
            {...register("surname")}
            type="text"
            className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-right text-gray-700"
          />
        </div>
        <div className="grid grid-cols-2 items-center text-sm text-gray-500 py-3 border-b">
          <label htmlFor="phone" className="block text-sm">
            Teléfono
          </label>
          <input
            {...register("phone")}
            type="text"
            className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-right text-gray-700"
          />
        </div>
        <div className="grid grid-cols-2 items-center text-sm text-gray-500 py-3 border-b">
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-right text-gray-700"
          />
        </div>
        <div className="grid grid-cols-2 items-center text-sm text-gray-500 py-3 border-b">
          <label htmlFor="dni" className="block text-sm">
            DNI
          </label>
          <input
            {...register("dni")}
            type="text"
            className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-right text-gray-700"
          />
        </div>
        <div className="grid grid-cols-2 items-center text-sm text-gray-500 py-3 border-b">
          <label htmlFor="debtValue" className="block text-sm">
            Deuda
          </label>
          <div className="relative rounded-md">
            <input
              {...register("debtValue")}
              type="text"
              className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-right text-gray-700 pr-6"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-700" id="price-currency">
                €
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center text-sm text-gray-500 py-3 border-b">
          <label htmlFor="created_at" className="block text-sm">
            Fecha creación
          </label>
          <input
            disabled
            defaultValue={formatDate(lead.created_at, "short", "es")}
            type="text"
            className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-right text-gray-700"
          />
        </div>
        {dataProfile.tenantid == 1 && (
          <div className="grid grid-cols-2 items-center text-sm text-gray-500 py-3 border-b">
            <label htmlFor="tenantid" className="block text-sm">
              Entidad
            </label>

            <select
              {...register("tenantid", { required: true, valueAsNumber: true })}
              id="tenantid"
              name="tenantid"
              className="block w-full max-w-lg rounded-md border-gray-300 focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
            >
              {tenantsQuery.isLoading ? (
                <option>Cargando...</option>
              ) : (
                <>
                  {tenantsQuery.data.map((tenant: any) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        )}

        <div className="mt-4 flex justify-end space-x-4">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            onClick={() => router.back()}
          >
            Volver
          </button>
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

export default EditLeadForm;
