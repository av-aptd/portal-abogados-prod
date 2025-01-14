import React, { useState } from "react";
import type { NextPageWithLayout } from "../../../../../_app";
import type { ReactElement } from "react";
import PortalLayout from "components/layouts/portal";
import { getDocumentDetails, setStatusDocument } from "apis/processes";
import { usePortalStore } from "store/portal";
import { useRouter } from "next/router";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useQuery, useMutation } from "@tanstack/react-query";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { Ring } from "@uiball/loaders";
import { saveAs } from "file-saver";
import {
  sendEmailNotification,
  sendPushNotification,
  sendRejectEmailNotification,
} from "apis/notifications";
import { getUserById } from "apis/users";
import { useForm } from "react-hook-form";

const DocumentDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);
  const [docs, setDocs] = useState<any[]>([]);

  const { data: user } = useQuery(["userAPTD", router.query.id], () =>
    getUserById(profile.token, router.query.customerId)
  );

  const aproveMutation = useMutation(
    async (body: any) =>
      setStatusDocument(
        profile.token,
        router.query.processId,
        router.query.documentId,
        JSON.stringify(body)
      ),
    {
      onSuccess: () => {
        router.back();
      },
    }
  );

  const sendAllNotifications = async (motivo: any) => {
    const data = {
      title: "Documento subido rechazado",
      body: "Se ha rechazado un documento subido",
      subtitle: "Se ha rechazado un documento subido",
      data: {
        url: "/(app)/notificaciones/{notification_id}",
        content: motivo,
      },
    };

    const owner = profile.name;

    await sendPushNotification(router.query.customerId, data);
    await sendRejectEmailNotification(user, owner, {
      title: "Documento subido rechazado",
      content: motivo,
    });

    return true;
  };

  const rejectMutation = useMutation(
    async (body: any) =>
      setStatusDocument(
        profile.token,
        router.query.processId,
        router.query.documentId,
        JSON.stringify(body)
      ),
    {
      onSuccess: (data, variables) => {
        sendAllNotifications(variables.statusReason);
        router.back();
      },
    }
  );

  const aprobar = async () => {
    const body = {
      status: 1,
    };

    aproveMutation.mutate(body);
  };

  useQuery({
    queryKey: [
      "doc",
      profile.token,
      router.query.processId,
      router.query.documentId,
    ],
    queryFn: () =>
      getDocumentDetails(
        profile.token,
        router.query.processId,
        router.query.documentId
      ),
    onSuccess(data) {
      setDocs([
        {
          uri: `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${router.query.processId}/documents/${router.query.documentId}?token=${profile.token}`,
          fileName: data.documentType.name,
        },
      ]);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const info = {
      status: 2,
      statusReason: data.motivo,
    };

    rejectMutation.mutate(info);
  };

  const download = (file: any) => {
    saveAs(file.uri, file.fileName);
  };

  const MyNoRenderer = ({ document, fileName }: any) => {
    const fileText = fileName || document?.fileType || "";

    if (fileText) {
      return (
        <div className="px-4 flex justify-center items-center w-full p-4">
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h3 className="text-red-400 text-center pb-1">Error</h3>
            <p className="text-gray-700">No se ha podido abrir el archivo.</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => download(document)}
                className="bg-secondary text-white px-4 rounded-lg py-2 text-sm"
              >
                Descargar para ver
              </button>
            </div>
          </div>
        </div>
      );
    }

    return <div>No Renderer Error!</div>;
  };

  return (
    <div className="pt-10 mx-auto max-w-7xl">
      <div className="grid lg:grid-cols-4 gap-8 items-start">
        <div className="col-span-3 h-[800px] bg-gray-300 rounded-lg overflow-hidden shadow">
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            config={{
              noRenderer: {
                overrideComponent: MyNoRenderer,
              },
            }}
          />
        </div>
        <SectionBloc title="Acciones">
          <button
            type="button"
            className="inline-flex items-center w-full justify-center rounded-md border border-transparent bg-secondary px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
            onClick={aprobar}
          >
            {aproveMutation.isLoading ? (
              <Ring size={16} color="#fff" />
            ) : (
              "Aprobar"
            )}
          </button>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mt-10 mb-4">
              <label
                htmlFor="motivo"
                className="block text-sm font-medium text-gray-700"
              >
                Motivo del rechazo
              </label>
              <div className="mt-1">
                <textarea
                  {...register("motivo", { required: true })}
                  rows={3}
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm bg-gray-50"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center w-full justify-center rounded-md border border-transparent bg-red-400 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-500 focus:outline-none"
            >
              {rejectMutation.isLoading ? (
                <Ring size={16} color="#fff" />
              ) : (
                "Rechazar"
              )}
            </button>
          </form>

          <button
            type="button"
            className="mt-4 inline-flex items-center w-full justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none"
            onClick={() => router.back()}
          >
            Volver
          </button>
        </SectionBloc>
      </div>
    </div>
  );
};

export default DocumentDetail;

DocumentDetail.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};
