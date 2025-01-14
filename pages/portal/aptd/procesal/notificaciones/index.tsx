import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";

import { formatDate, getSettingsSecure } from "shared/helpers";
import { usePortalStore } from "store/portal";
import { useRouter } from "next/router";

import clsx from "clsx";
import { useUIStore } from "store/ui";
import { ModalExtended } from "components/portal/estudio/modalExtended";
import { saveAs } from "file-saver";
import { CheckFilled, DownloadFile } from "components/icons";
import {
  getAtomianDocs,
  getAtomianNotifications,
  processNotification,
  getAtomianNotification,
  selectAtomianFile,
  retryAtomianNotification,
} from "apis/atomian";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingContainer from "components/portal/loading";
import AtomianNotification from "./components/notification";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import PortalHeader from "components/portal/layout/header";

const ProcesalNotifications: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const [notifications, setNotifications] = useState<any>([]);
  const queryClient = useQueryClient();

  const showModalExtended = useUIStore((state) => state.showModalExtended);

  const [projectId, setProjectId] = useState<any>(null);
  const [idFile, setIdFile] = useState<any>(null);
  const [notificationId, setNotificationId] = useState<any>(null);
  const [notification, setNotification] = useState<any>([]);
  const [projectsAvailables, setProjectsAvailables] = useState<any>([]);
  const [docsAvailables, setDocsAvailables] = useState<any>([]);

  const [status, setStatus] = useState<number>(0);
  const [modalType, setModalType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { locale } = useRouter();

  const notisQuery = useQuery(["notifications", status], () =>
    getAtomianNotifications(profile.token, status)
  );

  const projectsQuery = useQuery(
    ["ProjectsAvailables", notificationId],
    () => getAtomianNotification(profile.token, notificationId),
    {
      enabled: modalType === "projectsAvailable",
      onSuccess: async (data) => {
        console.log("data", data);
      },
    }
  );

  const mutation = useMutation(
    (id: any) => processNotification(profile.token, id),
    {
      onSuccess: async (data) => {
        const response = await data.json();

        if (response.statusCode === 400) {
          showModalExtended();
          setModalType("projectsAvailable");
          // setModalType("error");
          // setTitle("Error");
          // setMessage(response.message);
        } else {
          notisQuery.refetch();
        }
      },
    }
  );

  const docMutation = useMutation(
    ({ notificationId, body }: any) =>
      retryAtomianNotification(profile.token, notificationId, body),
    {
      onSuccess: () => {
        showModalExtended();
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        setProjectId(null);
      },
    }
  );

  const procesar = async (id: number) => {
    setNotificationId(id);
    mutation.mutate(id);
  };

  const getDocs = async (id: any) => {
    setLoading(true);
    setModalType("docsAvailable");
    setTitle("Documentos disponibles");
    showModalExtended();
    setNotificationId(id);
    const data = await getAtomianDocs(profile.token, id);
    setDocsAvailables(data.data);
    setLoading(false);
  };

  const showRetry = async (notification: any) => {
    setModalType("projectsAvailable");
    setNotificationId(notification.id);
    showModalExtended();
  };

  const mostrarModal = (message: any, title: any) => {
    setProjectId(null);
    setMessage(message);
    setTitle(title);
    setModalType("message");
    showModalExtended();
  };

  const showResult = (notification: any) => {
    if (notification.status == 1) {
      setTitle("Ejecutado");
      setMessage(notification.result);
      setModalType("message");
      showModalExtended();
    }
    if (notification.status == 2) {
      setTitle("Error");
      setMessage(notification.errorMessage);
      setModalType("message");
      showModalExtended();
    }
  };

  const ejecutar = async () => {
    const body = {
      id: notificationId,
      projectId: projectId,
    };

    docMutation.mutate({ notificationId, body });
  };

  const selectDoc = async (file: any) => {
    const docToDownload = await selectAtomianFile(
      profile.token,
      notificationId,
      file.id
    );

    saveAs(docToDownload, file.name);
  };

  const ModalMessage = () => {
    return (
      <>
        <h3 className="border-b py-3 text-center">{title}</h3>
        <div className="p-6">
          <p className="text-gray-500">{message}</p>
        </div>
      </>
    );
  };

  const GetProjectsAvailables = () => {
    return (
      <>
        <h1 className="border-b py-3 text-center">Selecciona un expediente</h1>
        <div className="p-6">
          {projectsQuery.isLoading ? (
            <LoadingContainer />
          ) : (
            <>
              {projectsQuery.data?.projects[0]?.map((project: any) => (
                <div
                  key={project.project_id}
                  className={clsx(
                    "border-2 mb-2 p-2 rounded-lg cursor-pointer relative",
                    projectId === project.project_id
                      ? "border-secondary bg-gray-50"
                      : "bg-gray-50"
                  )}
                  onClick={() => {
                    setProjectId(project.project_id);
                  }}
                >
                  <div className="grid grid-cols-4 gap-8">
                    <div>
                      <p
                        className={clsx(
                          "text-sm",
                          projectId === project.project_id
                            ? "text-gray-500"
                            : "text-gray-500"
                        )}
                      >
                        Expediente:
                      </p>
                      <p
                        className={clsx(
                          "text-sm font-medium",
                          projectId === project.project_id
                            ? "text-gray-700"
                            : "text-gray-700"
                        )}
                      >
                        {project.codigo_generado}
                      </p>
                    </div>
                    <div>
                      <p
                        className={clsx(
                          "text-sm",
                          projectId === project.project_id
                            ? "text-gray-500"
                            : "text-gray-500"
                        )}
                      >
                        Tipo asunto:
                      </p>
                      <p
                        className={clsx(
                          "text-sm font-medium",
                          projectId === project.project_id
                            ? "text-gray-700"
                            : "text-gray-700"
                        )}
                      >
                        {project.tipoasunto?.descripcion}
                      </p>
                    </div>
                    <div>
                      <p
                        className={clsx(
                          "text-sm",
                          projectId === project.project_id
                            ? "text-gray-500"
                            : "text-gray-500"
                        )}
                      >
                        Cliente KML:
                      </p>
                      {project.intervinientes && (
                        <p
                          className={clsx(
                            "text-sm font-medium",
                            projectId === project.project_id
                              ? "text-gray-700"
                              : "text-gray-700"
                          )}
                        >
                          {
                            project.intervinientes.filter(
                              (i: any) => i.categoria.codigo == 3
                            )[0].referencia.nombrecompleto
                          }
                        </p>
                      )}
                    </div>
                    {project.organismos && (
                      <div>
                        <p
                          className={clsx(
                            "text-sm",
                            projectId === project.project_id
                              ? "text-gray-500"
                              : "text-gray-500"
                          )}
                        >
                          Num. autos:
                        </p>
                        <p
                          className={clsx(
                            "text-sm font-medium",
                            projectId === project.project_id
                              ? "text-gray-700"
                              : "text-gray-700"
                          )}
                        >
                          {project.organismos[0].procedimiento.numero}
                        </p>
                      </div>
                    )}
                  </div>
                  {projectId === project.project_id && (
                    <CheckFilled className="absolute top-2 right-2 w-4 h-4 text-secondary" />
                  )}
                </div>
              ))}
            </>
          )}
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none sm:text-sm"
              onClick={() => ejecutar()}
            >
              {docMutation.isLoading ? "Ejecutando..." : "Ejecutar"}
            </button>
          </div>
        </div>
      </>
    );
  };

  const GetDocsAvailables = () => {
    return (
      <>
        <h1 className="border-b py-3 text-center">{title}</h1>
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center border mb-2 p-2 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <p className="text-sm text-gray-700">cargando...</p>
            </div>
          ) : docsAvailables.length > 0 ? (
            docsAvailables.map((doc: any) => (
              <div
                key={doc.id}
                className={clsx(
                  "border mb-2 p-2 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                )}
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-700">{doc.name}</p>
                  <button type="button" onClick={() => selectDoc(doc)}>
                    <DownloadFile className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className="flex justify-center border mb-2 p-2 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <p className="text-sm text-gray-700">
                  No hay documentos adjuntos
                </p>
              </div>
            </div>
          )}
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none sm:text-sm"
              onClick={() => showModalExtended()}
            >
              Cerrar
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <PortalHeader title="Notificaciones" />
      <div className="pt-6 mx-auto max-w-7xl">
        <ComplexSectionBloc>
          <HeaderSection title="Notificaciones" hasActions>
            <div className="flex-shrink-0 flex space-x-2">
              <span className="isolate inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setStatus(0)}
                  className={clsx(
                    "relative inline-flex items-center rounded-l-md border px-4 py-2 text-sm font-medium focus:z-10 focus:outline-none",
                    status == 0
                      ? "bg-secondary text-white border-secondary"
                      : "bg-white text-gray-700 border-gray-300"
                  )}
                >
                  Pendientes
                </button>
                <button
                  type="button"
                  onClick={() => setStatus(1)}
                  className={clsx(
                    "relative -ml-px inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-10 focus:outline-none",
                    status == 1
                      ? "bg-secondary text-white border-secondary"
                      : "bg-white text-gray-700 border-gray-300"
                  )}
                >
                  Ejecutados
                </button>
                <button
                  type="button"
                  onClick={() => setStatus(2)}
                  className={clsx(
                    "relative -ml-px inline-flex items-center rounded-r-md border   px-4 py-2 text-sm font-medium focus:z-10 focus:outline-none",
                    status == 2
                      ? "bg-secondary text-white border-secondary"
                      : "bg-white text-gray-700 border-gray-300"
                  )}
                >
                  Errores
                </button>
              </span>
            </div>
          </HeaderSection>
          <BodySection>
            <>
              {notisQuery.isLoading ? (
                <div>
                  <LoadingContainer />
                </div>
              ) : (
                <>
                  {notisQuery.data.map(
                    (notification: any, personIdx: number) => (
                      <AtomianNotification
                        key={notification.id}
                        notification={notification}
                        mutation={mutation}
                        personIdx={personIdx}
                        locale={locale}
                        mostrarModal={mostrarModal}
                        showResult={showResult}
                        getDocs={getDocs}
                        procesar={procesar}
                        showRetry={showRetry}
                      />
                    )
                  )}
                </>
              )}

              <ModalExtended size="big">
                {modalType == "projectsAvailable" && <GetProjectsAvailables />}
                {modalType == "docsAvailable" && <GetDocsAvailables />}
                {modalType == "message" && <ModalMessage />}
              </ModalExtended>
            </>
          </BodySection>
        </ComplexSectionBloc>
      </div>
    </>
  );
};

ProcesalNotifications.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default ProcesalNotifications;
