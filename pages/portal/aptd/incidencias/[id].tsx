import React, { useEffect, useState } from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import type { ReactElement } from "react";
import PortalHeader from "components/portal/layout/header";
import { useRouter } from "next/router";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  downloadAttachmentById,
  editTicketById,
  getTasksByTicket,
  getTicketById,
} from "apis/tickets";
import { usePortalStore } from "store/portal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ring } from "@uiball/loaders";
import { nameTicketState, ticketStates, typeTicket } from "shared/helpers";
import { getListGroups, getUsers } from "apis/users";
import { useUIStore } from "store/ui";
import TaskForm from "components/portal/incidencias/taskForm";
import TaskBloc from "components/portal/incidencias/taskBloc";
import { DownloadFile } from "components/icons";
import { saveAs } from "file-saver";
import { ModalExtended } from "components/portal/estudio/modalExtended";
import DotStatus from "components/portal/incidencias/dot";

const schema = z.object({
  ticket_type: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  created_by: z.number(),
  assigned_to_user_id: z.number(),
  assigned_to_group_id: z.number(),
});

type FormData = z.infer<typeof schema>;

const DetalleIncidencia: NextPageWithLayout = () => {
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);
  const showModalExtended = useUIStore((state) => state.showModalExtended);
  const [ticket, setTicket] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);

  useQuery(
    ["ticketInfo", router.query.id],
    async () => getTicketById(profile.token, router.query.id),
    {
      onSuccess(data) {
        setTicket(data);
        setValue("ticket_type", data?.ticket_type);
        setValue("title", data?.title);
        setValue("description", data?.description);
        setValue("status", data?.status);
        setValue("created_by", data?.created_by);
        setValue("assigned_to_user_id", data?.assigned_to_user_id);
        setValue("assigned_to_group_id", data?.assigned_to_group_id);
      },
    }
  );

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const group = watch("assigned_to_group_id");

  useEffect(() => {
    if (group != undefined) {
      getUsersList();
    }
  }, [group]);

  const getUsersList = async () => {
    const users = await getUsers(
      profile.token,
      `group=${group}&op=eq&limit=100&page=1`
    );

    console.log("users", users.users);

    setUsers(users.users);
  };

  const taskQuery = useQuery({
    queryKey: ["tasksByTicket", router.query.id],
    queryFn: async () => getTasksByTicket(profile.token, router.query.id),
  });

  const groupsQuery = useQuery({
    queryKey: ["groupsListAPTD"],
    queryFn: async () => getListGroups(profile.token),
  });

  const ticketMutation = useMutation({
    mutationFn: (body: any) =>
      editTicketById(profile.token, body, router.query.id),
    onSuccess: () => {
      router.back();
    },
  });

  const onSubmit = async (data: any) => {
    const body = {
      ticket_type: data.ticket_type,
      title: data.title,
      description: data.description,
      assigned_to_user_id: data.assigned_to_user_id,
      assigned_to_group_id: data.assigned_to_group_id,
      status: data.status,
    };

    ticketMutation.mutate(body);
  };

  const downloadAttachment = async (id: number) => {
    const doc = await downloadAttachmentById(
      profile.token,
      router.query.id,
      id
    );

    saveAs(doc.data, doc.name);
  };

  return (
    <>
      <PortalHeader title={`Incidencia ${router.query.id?.slice(0, 8)}`} />

      <div className="mx-auto max-w-7xl py-6 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SectionBloc
            title={router.query.id?.slice(0, 8)}
            description="detalle de la incidencia"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="flex justify-between items-center text-sm text-gray-500 pb-4 border-b">
                <label htmlFor="ticket_type" className="block text-sm">
                  Título
                </label>
                <p className="text-gray-700">{ticket?.title}</p>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 py-4 border-b">
                <label htmlFor="ticket_type" className="block text-sm">
                  Creado por
                </label>
                <p className="text-gray-700">{ticket?.created_by_user}</p>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 py-3 border-b">
                <label htmlFor="ticket_type" className="block text-sm">
                  Tipo
                </label>
                <select
                  {...register("ticket_type", {
                    valueAsNumber: true,
                  })}
                  className="block w-64 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                >
                  {typeTicket?.map((type: any) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 py-3 border-b">
                <label htmlFor="assigned_to_user_id" className="block text-sm">
                  Asignado al grupo{" "}
                </label>
                <select
                  {...register("assigned_to_group_id", {
                    valueAsNumber: true,
                  })}
                  className="block w-64 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                >
                  {groupsQuery?.data
                    ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                    .map((group: any) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                </select>
              </div>
              {users?.length > 0 && (
                <div className="flex justify-between items-center text-sm text-gray-500 py-3 border-b">
                  <label
                    htmlFor="assigned_to_user_id"
                    className="block text-sm"
                  >
                    Asignado al usuario{" "}
                  </label>
                  <select
                    {...register("assigned_to_user_id", {
                      valueAsNumber: true,
                    })}
                    className="block w-64 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                  >
                    {users
                      .filter((u: any) => u.isactive == true)
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((user: any) => (
                        <option key={user.id} value={user.id}>
                          {user.name} {user.surname}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div className="flex justify-between items-center text-sm text-gray-500 py-3 border-b">
                <label htmlFor="status" className="block text-sm">
                  Estado
                </label>
                <div className="flex items-center space-x-2">
                  <DotStatus status={ticket?.status} />
                  <select
                    {...register("status")}
                    className=" block w-40 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                  >
                    {ticketStates?.map((status: any) => (
                      <option key={status} value={status}>
                        {nameTicketState(status)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-sm text-gray-500 py-3 border-b">
                <label htmlFor="description" className="block text-sm">
                  Descripción
                </label>
                <div
                  className="prose prose-sm prose-p:m-0 mt-2 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: ticket?.description,
                  }}
                ></div>
              </div>
              {ticket?.attachments?.length > 0 && (
                <div className="pt-4">
                  <label
                    htmlFor="status"
                    className="block text-sm text-gray-500 pb-4"
                  >
                    Adjuntos
                  </label>
                  {ticket.attachments.map((attachment: any) => (
                    <div
                      key={attachment.id}
                      onClick={() => downloadAttachment(attachment.id)}
                      className=""
                    >
                      {attachment.content_type.includes("image") ? (
                        <img
                          src={attachment.url}
                          className="w-20 h-20 object-cover rounded-lg border shadow-sm cursor-pointer"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-lg border flex justify-center items-center cursor-pointer bg-gray-50">
                          <div>
                            <DownloadFile className="h-6 w-6 text-gray-600 mx-auto" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
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
                  disabled={ticketMutation.isLoading}
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary w-40 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 disabled:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  {ticketMutation.isLoading ? (
                    <div className="py-0.5">
                      <Ring size={16} color="#fff" />
                    </div>
                  ) : (
                    "Guardar cambios"
                  )}
                </button>
              </div>
            </form>
          </SectionBloc>
        </div>
        <div>
          <SectionBloc title="Tareas" description="Listado de tareas">
            <div>
              {taskQuery?.data?.map((task: any) => (
                <TaskBloc task={task} key={task.id} />
              ))}
            </div>
            <button
              onClick={() => showModalExtended()}
              type="button"
              className="w-full items-center justify-center rounded-md border border-secondary bg-white py-2 text-sm font-medium text-secondary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              nueva tarea
            </button>
          </SectionBloc>
        </div>
      </div>
      <ModalExtended>
        <div className="">
          <div className="border-b p-4 pb-4">
            <h3 className="">Nueva tarea</h3>
          </div>
          <div className="p-4">
            <TaskForm ticketId={router.query.id} />
          </div>
        </div>
      </ModalExtended>
    </>
  );
};

DetalleIncidencia.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default DetalleIncidencia;
