import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { DownloadFile, Check } from "components/icons";
import { ModalExtended } from "components/portal/estudio/modalExtended";
import { useUIStore } from "store/ui";
import { usePortalStore } from "store/portal";
import { infoForDocuments } from "shared/helpers";
import { saveAs } from "file-saver";
import BoxDocument from "./components/box";
import clsx from "clsx";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import {
  getDocsToValidate,
  requiredDocsByProcessIdAsAdmin,
  uploadDocByProcessId,
} from "apis/processes";

import LoadingContainer from "components/portal/loading";
import { getUserProcesses } from "apis/client";
import MiniLoading from "components/portal/miniLoading";
import PortalHeader from "components/portal/layout/header";

const DocumentacionCliente: NextPageWithLayout = () => {
  const showModalExtended = useUIStore((state) => state.showModalExtended);
  const [file, setFile] = useState<any>();
  const [name, setName] = useState<string>("");
  const profile = usePortalStore((state) => state.profile);
  const [title, setTitle] = useState<string>("");
  const [fileToUpload, setFileToUpload] = useState<any>(null);
  const clientInfo = usePortalStore((state) => state.clientInfo);
  const queryClient = useQueryClient();
  const [uploaded, setUploaded] = useState<boolean>(false);

  const processesQuery = useQuery(["userProcesses"], () =>
    getUserProcesses(profile.token, profile.id)
  );

  const userProfileDocs = useQuery(["userProfileDocs"], () =>
    infoForDocuments(clientInfo, profile.token, profile.id)
  );

  const userTotalDocs = useQuery(
    ["userTotalDocs"],
    () =>
      requiredDocsByProcessIdAsAdmin(profile.token, processesQuery.data[0].id),
    {
      enabled: !!processesQuery.data && !!userProfileDocs,
    }
  );

  const filesUploaded = useQuery(
    ["filesUploaded"],
    () => getDocsToValidate(profile.token, processesQuery.data[0].id),
    {
      enabled: !!processesQuery.data,
    }
  );

  const showModalUpload = (title: any, fileToUpload: any) => {
    setFileToUpload(fileToUpload);
    setTitle(title);
    showModalExtended();
  };

  const mutation = useMutation({
    mutationFn: ({ formData }: any) =>
      uploadDocByProcessId(profile.token, processesQuery.data[0].id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filesUploaded"] });
      setUploaded(true);
      setFile(null);
      showModalExtended();
    },
  });

  const uploadDoc = async (e: any) => {
    e.preventDefault();

    setName(e.target.files[0].name);
    setFile(e.target.files[0]);

    const docReplace = filesUploaded.data.filter(
      (d: any) => d.status == 2 && d.documentType.id == fileToUpload
    );

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    formData.append("fileName", title);
    formData.append("fileTypeId", fileToUpload);
    formData.append("processId", processesQuery.data[0].id);
    formData.append("clientId", profile.id?.toString()!);
    formData.append("signed", "1");

    if (docReplace.length > 0) {
      formData.append("rel_doc_id", docReplace[0].id);
    }

    mutation.mutate({ formData });
  };

  const subirDocumento = async () => {
    showModalExtended();
    setFile(null);
    setUploaded(false);
  };

  return (
    <>
      <PortalHeader title="Documentación cliente" />
      <div className="mx-auto max-w-7xl pt-6 flex-col space-y-8">
        <SectionBloc
          title="Subir documentación"
          description="Sube aquí toda tu documentación de forma rápida, facil y segura."
        >
          {userTotalDocs.isLoading || filesUploaded.isLoading ? (
            <LoadingContainer />
          ) : (
            <>
              {userTotalDocs.data.map((doc: any) => (
                <BoxDocument
                  key={doc.docTypeId}
                  filesUploaded={filesUploaded.data}
                  docType={doc}
                  showModalUpload={showModalUpload}
                />
              ))}
            </>
          )}
        </SectionBloc>
      </div>
      <ModalExtended>
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
                {mutation.isLoading ? (
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
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none sm:text-sm"
              onClick={() => subirDocumento()}
            >
              Cerrar ventana
            </button>
          </div>
        </div>
      </ModalExtended>
    </>
  );
};

DocumentacionCliente.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default DocumentacionCliente;
