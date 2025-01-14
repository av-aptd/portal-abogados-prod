import React, { useRef, useState } from "react";
import PortalLayout from "components/layouts/portal";
import ProcessLayout from "components/layouts/process";
import type { NextPageWithLayout } from "../../../../../../_app";
import type { ReactElement } from "react";
import LoadingContainer from "components/portal/loading";
import clsx from "clsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  deleteDocument,
  downloadDocById,
  getDocsToValidate,
  requiredDocsByProcessId,
  requiredDocsByProcessIdAsAdmin,
  setStatusDocument,
  uploadDocByProcessId,
} from "apis/processes";
import { usePortalStore } from "store/portal";
import { formatDate } from "shared/helpers";
import {
  Check,
  Cross,
  DocToValidate,
  DownloadFile,
  Trash,
} from "components/icons";
import { saveAs } from "file-saver";
import { useUIStore } from "store/ui";
import { ModalExtended } from "components/portal/estudio/modalExtended";
import { Ring } from "@uiball/loaders";
import PortalHeader from "components/portal/layout/header";
import ClientLayout from "components/layouts/client";
import ModalNewDoc from "./components/modalNewDoc";
import {
  sendPushNotification,
  sendRejectEmailNotification,
} from "apis/notifications";
import { getUserById } from "apis/users";
import MiniLoading from "components/portal/miniLoading";
import Link from "next/link";
import IframeResizer from "iframe-resizer-react";
import { getBankflipSession, syncBankflip } from "apis/docs";

const DocumentsProcess: NextPageWithLayout = () => {
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);
  const clientInfo = usePortalStore((state) => state.clientInfo);
  const [statusDocs, setStatusDocs] = useState<number>(0);
  const [difDocs, setDifDocs] = useState<any>([]);
  const setTypeModal = useUIStore((state) => state.setTypeModal);
  const showModalExtended = useUIStore((state) => state.showModalExtended);
  const [docToAdd, setDocToadd] = useState<any>(null);
  const queryClient = useQueryClient();
  const setDocId = usePortalStore((state) => state.setDocId);
  const docId = usePortalStore((state) => state.docId);
  const [modalType, setModalType] = useState<string>("");
  const [motivo, setMotivo] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [fileToUpload, setFileToUpload] = useState<any>(null);
  const [file, setFile] = useState<any>();
  const [name, setName] = useState<string>("");
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const iframeRef = useRef(null);
  const [showFrame, setShowFrame] = useState(false);
  const { client } = usePortalStore((state) => state);

  const docsValidateQuery = useQuery(
    ["docsUser", router.query.proccessId],
    async () => getDocsToValidate(profile.token, router.query.proccessId)
  );

  const bankflipQuery = useQuery(
    ["banflipSession", router.query.proccessId],
    async () => getBankflipSession(profile.token, router.query.proccessId),
    {
      enabled: !!showFrame == true,
    }
  );

  const { data: user } = useQuery(["userAPTD", router.query.id], () =>
    getUserById(profile.token, router.query.id)
  );

  const descargarDocumento = async (docId: number) => {
    const docToDownload = await downloadDocById(
      profile.token,
      router.query.proccessId,
      docId
    );

    saveAs(docToDownload.data, docToDownload.name);
  };

  const totalDocsQuery = useQuery(
    ["userTotalDocs", router.query.id],
    () =>
      requiredDocsByProcessIdAsAdmin(profile.token, router.query.proccessId),
    {
      enabled: !!docsValidateQuery.data,
    }
  );

  const mutation = useMutation(
    () =>
      requiredDocsByProcessId(
        profile.token,
        router.query.proccessId,
        JSON.stringify(clientInfo)
      ),
    {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ["docsUser", router.query.proccessId],
        });
        queryClient.invalidateQueries({
          queryKey: ["userTotalDocs", router.query.id],
        });
      },
    }
  );

  const showModalDocs = () => {
    setTypeModal("documents");
    setModalType("add");
    showModalExtended();
  };

  const sendAllNotifications = async () => {
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

    await sendPushNotification(router.query.id, data);
    await sendRejectEmailNotification(user, owner, {
      title: "Documento subido rechazado",
      content: motivo,
    });

    return true;
  };

  const rejectMutation = useMutation(
    async () =>
      setStatusDocument(
        profile.token,
        router.query.proccessId,
        docId,
        JSON.stringify({ status: 2, statusReason: motivo })
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["docsUser", router.query.proccessId],
        });
        sendAllNotifications();
        showModalExtended();
        setMotivo("");
      },
    }
  );

  const rejectDoc = async (docId: string) => {
    setModalType("reject");
    setDocId(docId);
    showModalExtended();
  };

  const tabsDocs = [
    { name: "Pendientes", value: 0 },
    { name: "Aprobados", value: 1 },
    { name: "Rechazados", value: 2 },
    { name: "Por subir", value: 3 },
  ];

  const showModalUpload = (title: any, fileToUpload: any) => {
    setModalType("upload");
    setFileToUpload(fileToUpload);
    setTitle(title);
    showModalExtended();
  };

  const uploadMutation = useMutation({
    mutationFn: ({ formData }: any) =>
      uploadDocByProcessId(profile.token, router.query.proccessId, formData),
    onSuccess: (data) => {
      if (dataProfile.tenantid == 1) {
        aproveMutation.mutate(data.id);
      } else {
        queryClient.invalidateQueries({
          queryKey: ["docsUser", router.query.proccessId],
        });
        queryClient.invalidateQueries({
          queryKey: ["userTotalDocs", router.query.id],
        });
      }
      showModalExtended();
      setFile(null);
    },
  });

  const bankflipMutation = useMutation({
    mutationFn: () =>
      syncBankflip(profile.token, router.query.proccessId, client.dni),
    onSuccess: (data) => {
      console.log("Resultado:", data);
    },
  });

  const aproveMutation = useMutation(
    (id) =>
      setStatusDocument(
        profile.token,
        router.query.processId,
        id,
        JSON.stringify({ status: 1 })
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["docsUser", router.query.proccessId],
        });
        queryClient.invalidateQueries({
          queryKey: ["userTotalDocs", router.query.id],
        });
      },
    }
  );

  const deleteMutation = useMutation(
    async (docId) =>
      deleteDocument(profile.token, router.query.proccessId, docId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["docsUser", router.query.proccessId],
        });
        queryClient.invalidateQueries({
          queryKey: ["userTotalDocs", router.query.id],
        });
      },
    }
  );

  const deleteDoc = async (docId: any) => {
    deleteMutation.mutate(docId);
  };

  const uploadDoc = async (e: any) => {
    e.preventDefault();
    setName(e.target.files[0].name);
    setFile(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    formData.append("fileName", title);
    formData.append("fileTypeId", fileToUpload);
    formData.append("processId", router.query.proccessId?.toString()!);
    formData.append("clientId", profile.id?.toString()!);
    formData.append("signed", "1");

    uploadMutation.mutate({ formData });
  };

  const canUseBankflip = () => {
    // let isAllowed = false;
    // if (bankFlipUsers.includes(dataProfile.emailaddress)) {
    //   isAllowed = true;
    // }

    return true;
  };

  return (
    <div>
      {showFrame && (
        <IframeResizer
          forwardRef={iframeRef}
          heightCalculationMethod="lowestElement"
          autoResize={true}
          inPageLinks
          log
          checkOrigin={["https://bkfp.io", "https://widget.bankflip.io"]}
          src={bankflipQuery?.data?.widgetLink}
          style={{ width: "1px", minWidth: "100%" }}
        />
      )}

      <PortalHeader title="Documentos expediente" />
      <div className="flex flex-col lg:flex-row justify-between mb-4 items-center border-b border-gray-100 pb-4">
        <p className="text-sm font-medium">Documentos requeridos</p>
        <div className="flex flex-col w-full lg:w-auto lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 pt-4 lg:pt-0 lg:items-center">
          {canUseBankflip() && (
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0 lg:items-center">
              <button
                className="inline-flex items-center justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none"
                disabled={bankflipQuery.isFetching}
                onClick={() => setShowFrame(true)}
              >
                {bankflipQuery.isFetching ? (
                  <Ring size={16} color="#333" />
                ) : (
                  "Abrir sincronizador"
                )}
              </button>

              <button
                className="inline-flex items-center justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none"
                onClick={() => bankflipMutation.mutate()}
              >
                {bankflipMutation.isLoading ? (
                  <Ring size={16} color="#333" />
                ) : (
                  "Sincronizar documentos"
                )}
              </button>
            </div>
          )}

          <button
            className="inline-flex items-center justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none"
            onClick={() => mutation.mutate()}
          >
            Recalcular docs
          </button>
          <button
            onClick={() => showModalDocs()}
            className=" text-white text-sm px-4 py-2 rounded-md flex justify-center items-center bg-secondary"
          >
            Añadir documento requerido
          </button>
        </div>
      </div>
      {docsValidateQuery.isLoading ? (
        <LoadingContainer />
      ) : (
        <div>
          <div className="mb-8">
            <div className="sm:hidden">
              <label htmlFor="tabsDocs" className="sr-only">
                Select a tab
              </label>

              <select
                id="tabsDocs"
                name="tabsDocs"
                onChange={(e) => setStatusDocs(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-secondary focus:outline-none focus:ring-secondary text-sm"
              >
                {tabsDocs.map((tab) => (
                  <option key={tab.name} value={tab.value}>
                    {tab.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {tabsDocs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setStatusDocs(tab.value)}
                      className={clsx(
                        tab.value == statusDocs
                          ? "border-secondary text-secondary"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                      )}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {(statusDocs == 0 || statusDocs == 1 || statusDocs == 2) && (
            <>
              {docsValidateQuery?.data && (
                <>
                  {docsValidateQuery?.data
                    .filter((item: any) => item.status == statusDocs)
                    .map((doc: any) => (
                      <div
                        className="bg-white mb-3 last:mb-0 rounded-lg border p-3 text-sm flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center"
                        key={doc.id}
                      >
                        <div>
                          <p className="flex-1">
                            {doc.documentType
                              ? doc.documentType?.name
                              : doc.name}
                          </p>

                          {doc?.status == 2 && (
                            <p className="text-xs text-red-500 pt-1 max-w-lg">
                              Motivo del rechazo: {doc.status_reason}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <p className="w-20 text-xs text-gray-500">
                            {formatDate(doc.uploadedDate, "short", "es")}
                          </p>
                          <p className="pr-10">
                            <span
                              className={clsx(
                                doc.status == 0 &&
                                  "text-yellow-800 bg-yellow-100",
                                doc.status == 1 &&
                                  "text-green-800 bg-green-100",
                                doc.status == 2 && "text-red-800 bg-red-100",
                                "px-4 rounded-full py-1 text-xs"
                              )}
                            >
                              {doc.status == 0 && "Pendiente"}
                              {doc.status == 1 && "Validado"}
                              {doc.status == 2 && "Rechazado"}
                            </span>
                          </p>
                          {doc.status == 0 && (
                            <Link
                              href={{
                                pathname: `/portal/aptd/retencion/validar-documentacion/[processId]/[documentId]`,
                                query: {
                                  processId: router.query.proccessId,
                                  documentId: doc.id,
                                  // customerId: customerId,
                                },
                              }}
                              className=""
                            >
                              <DocToValidate className="w-6 h-6 text-green-500" />
                            </Link>
                          )}
                          {doc.status == 1 && dataProfile.tenantid == 1 && (
                            <button
                              onClick={() => rejectDoc(doc.id)}
                              className="p-0.5"
                            >
                              <Cross className="w-5 h-5 text-red-500" />
                            </button>
                          )}

                          {doc.status == 2 && (
                            <button
                              onClick={() => deleteDoc(doc.id)}
                              disabled={deleteMutation.isLoading}
                              className=""
                            >
                              {deleteMutation.isLoading ? (
                                <Ring size={20} color="#9DA3B0" />
                              ) : (
                                <Trash className="w-6 h-6 text-gray-400" />
                              )}
                            </button>
                          )}

                          <button
                            onClick={() => descargarDocumento(doc.id)}
                            className="ml-4"
                          >
                            <DownloadFile className="w-6 h-6 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </>
          )}
          {statusDocs == 3 && (
            <>
              {totalDocsQuery.isLoading ? (
                <p>Cargando</p>
              ) : (
                <>
                  {totalDocsQuery.data
                    .filter((doc: any) =>
                      docsValidateQuery?.data?.every(
                        (docV: any) => doc.docTypeId != docV.documentType?.id
                      )
                    )
                    .map((doc: any) => (
                      <div
                        className="bg-white mb-3 last:mb-0 rounded-lg border p-3 text-sm flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center"
                        key={doc.docTypeId}
                      >
                        <p className="flex-1">{doc.name}</p>
                        <div className="flex justify-end mt-4 md:mt-0">
                          <button
                            type="button"
                            onClick={() =>
                              showModalUpload(doc.name, doc.docTypeId)
                            }
                            className={clsx(
                              "rounded-lg px-4 py-1.5 bg-gray-700 w-full md:w-auto disabled:opacity-20"
                            )}
                          >
                            <p className="text-xs text-white">
                              subir documento
                            </p>
                          </button>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </>
          )}
        </div>
      )}
      <ModalExtended size={modalType == "add" ? "big" : "small"}>
        {modalType == "add" && (
          <>
            <ModalNewDoc docToAdd={docToAdd} setDocToadd={setDocToadd} />
          </>
        )}
        {modalType == "reject" && (
          <>
            <div className="border-b py-4 px-8">
              <h3 className="font-semibold text-gray-700">
                Rechazar documento
              </h3>
            </div>
            <div className="py-4 px-8">
              <div>
                <div className="mt-1 mb-4">
                  <textarea
                    onChange={(e) => setMotivo(e.target.value)}
                    placeholder="Motivo de rechazo"
                    value={motivo}
                    className="block border-gray-300 w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-400 focus:outline-none sm:text-sm duration-150"
                  onClick={() => rejectMutation.mutate()}
                >
                  {rejectMutation.isLoading ? (
                    <Ring size={16} color="#fff" />
                  ) : (
                    "Rechazar"
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        {modalType == "upload" && (
          <div className="py-4 px-8">
            <div className="">
              <label
                htmlFor="cover-photo"
                className="block text-lg text-center pb-4 font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Subir {title}
              </label>

              {file ? (
                <>
                  {uploadMutation.isLoading ? (
                    <>
                      <div className="bg-white mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 py-6">
                        <MiniLoading color="#19ABE3" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 py-6">
                        <div>
                          <div className="flex justify-center pb-2">
                            <Check className="h-12 w-12 text-green-500" />
                          </div>
                          <p className="text-sm text-gray-500">
                            Documento subido correctamente
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="mt-2">
                    <div className="bg-white flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="imageFile"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-secondary focus-within:outline-none hover:text-blue-600"
                          >
                            <span>Subir documento</span>
                            <input
                              id="imageFile"
                              name="imageFile"
                              type="file"
                              className="sr-only"
                              accept="image/*,.pdf"
                              onChange={uploadDoc}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">Hasta 50MB</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </ModalExtended>
    </div>
  );
};

DocumentsProcess.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ClientLayout>
        <ProcessLayout>{page}</ProcessLayout>
      </ClientLayout>
    </PortalLayout>
  );
};

export default DocumentsProcess;
