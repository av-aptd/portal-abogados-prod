import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";

import SectionBloc from "components/layouts/components/section/sectionBloc";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createUser,
  getListGroups,
  getListRoles,
  uploadAvatarUser,
} from "apis/users";
import { usePortalStore } from "store/portal";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { getTenants } from "apis/tenants";
import PortalHeader from "components/portal/layout/header";

const NuevoUsuario: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState("");

  const groupsQuery = useQuery({
    queryKey: ["groups"],
    queryFn: async () => getListGroups(profile.token),
  });

  const rolesQuery = useQuery(["roles"], async () =>
    getListRoles(profile.token)
  );

  const tenantsQuery = useQuery(["tenants"], async () =>
    getTenants(profile.token)
  );

  const mutation = useMutation({
    mutationFn: async (data) => createUser(profile.token, data),
    onSuccess: () => router.push("/portal/aptd/usuarios"),
  });

  const uploadAvatar = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    const responseUrl = await uploadAvatarUser(profile.token, formData);
    setAvatarUrl(responseUrl.url);
  };

  type FormData = {
    roleId: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    dni: string;
    groups: number[];
    collegiatenumber: string;
    lawSchool: string;
    numInscripcion: string;
    tenantid: number;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tenantid: 1,
    },
  });
  const onSubmit = async (data: any) => {
    const body = {
      ...data,
      avatarUrl,
      isProfileCompleted: true,
    };
    mutation.mutate(body);
  };

  const roleId = watch("roleId");

  useEffect(() => {
    isLawyer();
  }, [roleId]);

  const isLawyer = () => {
    let name = "";
    if (!rolesQuery?.data) return false;

    name = rolesQuery.data.find(
      (item: any) => item.id == roleId
    )?.normalizedName;

    return name == "LEGALLAWYER" || name == "COMMERCIALLAWYER";
  };

  return (
    <>
      <PortalHeader title="Nuevo usuario" />

      <div className="pt-6 mx-auto max-w-7xl">
        <SectionBloc
          title="Añadir nuevo usuario"
          description="Rellena los siguientes campos"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Avatar
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <div className="flex items-center">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            className="h-12 w-12 overflow-hidden rounded-full object-cover"
                          />
                        ) : (
                          <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                        )}
                        <div className=" ml-4 flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 hover:text-secondary"
                          >
                            <span>Añadir foto</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={uploadAvatar}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Nombre
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="surname"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Apellidos
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        {...register("surname", { required: true })}
                        type="text"
                        name="surname"
                        id="surname"
                        autoComplete="family-name"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Teléfono
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        {...register("phone", { required: true })}
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Dirección de correo
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        {...register("email", { required: true })}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="dni"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      DNI/NIE
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        {...register("dni", { required: true })}
                        type="text"
                        name="dni"
                        id="dni"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="tenantid"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Entidad
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <select
                        {...register("tenantid", { required: true })}
                        id="tenantid"
                        name="tenantid"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                      >
                        {tenantsQuery.isLoading ? (
                          <></>
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
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="roleId"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Rol
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <select
                        {...register("roleId", { required: true })}
                        id="roleId"
                        name="roleId"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                      >
                        {rolesQuery.isLoading ? (
                          <option>Cargando...</option>
                        ) : (
                          <>
                            {rolesQuery.data.map((role: any) => (
                              <option key={role.id} value={role.id}>
                                {role.displayName}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">
                    <div className=" sm:border-t sm:border-gray-200 sm:pt-5">
                      <div role="group" aria-labelledby="label-email">
                        <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                          <div>
                            <div
                              className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                              id="label-email"
                            >
                              Grupos
                            </div>
                          </div>
                          <div className="mt-4 sm:col-span-2 sm:mt-0">
                            <div className="max-w-lg grid lg:grid-cols-2 gap-4">
                              {groupsQuery.isSuccess && (
                                <>
                                  {groupsQuery.data.map((group: any) => (
                                    <div
                                      className="relative flex items-start"
                                      key={group.id}
                                    >
                                      <div className="flex h-5 items-center">
                                        <input
                                          {...register("groups", {
                                            required: true,
                                          })}
                                          id="groups"
                                          name="groups"
                                          type="checkbox"
                                          value={group.id}
                                          className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                                        />
                                      </div>
                                      <div className="ml-3 text-sm">
                                        <label
                                          htmlFor="groups"
                                          className="font-medium text-gray-700"
                                        >
                                          {group.name}
                                        </label>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isLawyer() && (
                    <>
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="collegiatenumber"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Número colegiado
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                          <input
                            {...register("collegiatenumber", {
                              required: true,
                            })}
                            type="text"
                            name="collegiatenumber"
                            id="collegiatenumber"
                            autoComplete="address-level2"
                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="lawSchool"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Colegio abogados
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                          <input
                            {...register("lawSchool", { required: true })}
                            type="text"
                            name="lawSchool"
                            id="lawSchool"
                            autoComplete="address-level1"
                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  onClick={() => router.back()}
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  disabled={mutation.isLoading}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  {mutation.isLoading ? "Creando usuario ..." : "Crear usuario"}
                </button>
              </div>
            </div>
          </form>
        </SectionBloc>
      </div>
    </>
  );
};

NuevoUsuario.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default NuevoUsuario;
