import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";

import { useUIStore } from "store/ui";
import Head from "next/head";
import {
  sendPushNotification,
  sendAllPushNotification,
} from "apis/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const schema = z
  .object({
    title: z.string(),
    body: z.string(),
  })
  .required();

type formData = z.infer<typeof schema>;

const NotificacionesPush: NextPageWithLayout = () => {
  const setInfoAlertNotification = useUIStore(
    (state) => state.setInfoAlertNotification
  );
  const showNotification = useUIStore((state) => state.showNotification);
  const [content, setContent] = useState("");

  const users_dev = [6748];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: (info: any) => sendAllPushNotification(info.data),
  });

  const onSubmit = async (info: any) => {
    mutation.mutate(
      {
        data: {
          title: info.title,
          body: info.body,
          subtitle: info.body,
          data: {
            url: "/(app)/notificaciones/{notification_id}",
            content: content,
          },
        },
      },
      {
        onSuccess: () => {
          setInfoAlertNotification({
            title: "Notificación enviada",
            message:
              "Todos los clientes han recibido la notificación correctamente.",
            icon: "good",
          });
          showNotification();
          setContent("");
          reset();
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Enviar notificación</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="pt-6 mx-auto max-w-3xl">
        <SectionBloc title="Enviar notificación">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="lg:col-span-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <div className="mt-1">
                <input
                  {...register("title")}
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <div className="mt-1">
                <input
                  {...register("body")}
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Mensaje
              </label>
              <div className="mt-1">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="text-sm text-gray-500"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                disabled={mutation.isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
              >
                {mutation.isLoading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </SectionBloc>
      </div>
    </>
  );
};

NotificacionesPush.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default NotificacionesPush;
