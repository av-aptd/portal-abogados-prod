import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useState } from "react";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { usePortalStore } from "store/portal";

import { useUIStore } from "store/ui";
import Head from "next/head";
import { sendWebNotification } from "apis/notifications";
import { useMutation } from "@tanstack/react-query";
import SectionBloc from "components/layouts/components/section/sectionBloc";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const Notificaciones: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const setInfoAlertNotification = useUIStore(
    (state) => state.setInfoAlertNotification
  );
  const showNotification = useUIStore((state) => state.showNotification);
  const [content, setContent] = useState("");

  const users_dev = [60000];

  const { handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: (info: any) => sendWebNotification(info.user, info.data),
  });

  const onSubmit = async () => {
    for (let i = 0; i < users_dev.length; i++) {
      mutation.mutate(
        { user: users_dev[i], data: { message: content } },
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
          },
        }
      );
    }
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
            <div>
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

Notificaciones.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Notificaciones;
