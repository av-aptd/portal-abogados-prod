import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useUIStore } from "store/ui";
import { Close } from "components/icons";
import { useForm } from "react-hook-form";
import { usePortalStore } from "store/portal";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicket } from "apis/tickets";
import { getListGroups, getUsers } from "apis/users";
import { Ring } from "@uiball/loaders";
import { typeTicket } from "shared/helpers";
import UploadBloc from "./uploadBloc";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const schema = z.object({
  ticket_type: z.number().optional(),
  assigned_to_user_id: z.number().optional(),
  assigned_to_group_id: z.number().optional(),
  title: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const IncidentSlideOver = () => {
  const queryClient = useQueryClient();
  const openNewIncident: any = useUIStore((state) => state.openNewIncident);
  const showNewIncident: any = useUIStore((state) => state.showNewIncident);
  const profile: any = usePortalStore((state) => state.profile);
  const [attachment, setAttachment] = useState<any>(null);
  const [content, setContent] = useState("");

  const userQuery = useQuery({
    queryKey: ["usersListAPTD", "group=1&op=neq&limit=100&page=1"],
    queryFn: async () =>
      getUsers(profile.token, "group=1&op=neq&limit=100&page=1"),
  });

  const groupsQuery = useQuery({
    queryKey: ["groupsListAPTD"],
    queryFn: async () => getListGroups(profile.token),
  });

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const isSuperAdmin = () => {
    return profile?.groups?.some((item: any) => item == "Super Admin");
  };

  const closeCreditorModal = () => {
    showNewIncident();
    reset();
  };

  const mutation = useMutation({
    mutationFn: (body: any) => createTicket(profile.token, body),
    onSuccess: () => {
      showNewIncident();
      reset();
      setContent("");
      setAttachment(null);
      queryClient.invalidateQueries(["incidencias"]);
    },
  });

  const onSubmit = async (data: any) => {
    const body = {
      ticket_type: data.ticket_type,
      title: data.title,
      description: content,
      assigned_to_user_id: data.assigned_to_user_id,
      assigned_to_group_id: data.assigned_to_group_id,
      attachments: [attachment],
    };

    mutation.mutate(body);
  };

  return (
    <Transition.Root show={openNewIncident} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={showNewIncident}>
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                  >
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-primary py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            Nueva incidencia
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-primary text-indigo-200 hover:text-white focus:outline-none"
                              onClick={() => showNewIncident()}
                            >
                              <span className="sr-only">Close panel</span>
                              <Close className="h-8 w-8" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-white/60">
                            A continuación rellena la siguiente información de
                            la incidencia.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pt-6 pb-5">
                            <div>
                              <label
                                htmlFor="ticket_type"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Tipo
                              </label>
                              <select
                                {...register("ticket_type", {
                                  valueAsNumber: true,
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                              >
                                {typeTicket?.map((type: any) => (
                                  <option key={type.id} value={type.id}>
                                    {type.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* <div>
                              <label
                                htmlFor="assigned_to_user_id"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Asignar a
                              </label>
                              <select
                                {...register("assigned_to_user_id", {
                                  valueAsNumber: true,
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                              >
                                {userQuery?.data?.users
                                  .filter((u: any) => u.isactive == true)
                                  .sort((a: any, b: any) =>
                                    a.name.localeCompare(b.name)
                                  )
                                  .map((user: any) => (
                                    <option key={user.id} value={user.id}>
                                      {user.name} {user.surname}
                                    </option>
                                  ))}
                              </select>
                            </div> */}
                            <div>
                              <label
                                htmlFor="assigned_to_user_id"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Asignar a
                              </label>
                              <select
                                {...register("assigned_to_group_id", {
                                  valueAsNumber: true,
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                              >
                                {groupsQuery?.data
                                  ?.filter(
                                    (group: any) => group.name != "Super Admin"
                                  )
                                  .sort((a: any, b: any) =>
                                    a.name.localeCompare(b.name)
                                  )
                                  .map((group: any) => (
                                    <option key={group.id} value={group.id}>
                                      {group.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div>
                              <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Título
                              </label>
                              <div className="mt-1">
                                <input
                                  {...register("title")}
                                  type="text"
                                  className="block w-full rounded-md border-gray-300 focus:border-secondary focus:ring-secondary sm:text-sm"
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Descripción
                              </label>
                              <div className="mt-1">
                                <ReactQuill
                                  theme="snow"
                                  value={content}
                                  onChange={setContent}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Adjuntar archivos
                              </label>
                              <div className="mt-1">
                                <UploadBloc
                                  attachment={attachment}
                                  setAttachment={setAttachment}
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
                        disabled={mutation.isLoading}
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
                      >
                        {mutation.isLoading ? (
                          <Ring size={18} color="#fff" />
                        ) : (
                          "Crear incidencia"
                        )}
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

export default IncidentSlideOver;
