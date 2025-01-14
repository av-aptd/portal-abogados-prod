import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../../_app";
import React, { useState } from "react";
import type { ReactElement } from "react";
import { usePortalStore } from "store/portal";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import InstallmentsUserInfo from "components/portal/user/installments";

import {
  getDocsToValidate,
  getProcessInfo,
  getBalance,
  getRequiredDocsByProcessId,
  setStatusDocument,
} from "apis/processes";
import clsx from "clsx";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import MessageClient from "components/portal/messageClient";
import LoadingContainer from "components/portal/loading";
import { infoForDocuments } from "shared/helpers";
import { useUIStore } from "store/ui";
import { ModalExtended } from "components/portal/estudio/modalExtended";

import DocCard from "components/portal/documents/docCard";
import PortalHeader from "components/portal/layout/header";

const Cuestionario: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const { query } = useRouter();
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const clientInfo = usePortalStore((state) => state.clientInfo);
  const [status, setStatus] = useState<number>(0);
  const [difDocs, setDifDocs] = useState<any>([]);
  const [motivo, setMotivo] = useState<string>("");
  const showModalExtended = useUIStore((state) => state.showModalExtended);
  const docId = usePortalStore((state) => state.docId);

  const tabs = [
    { name: "Pendientes", value: 0 },
    { name: "Aprobados", value: 1 },
    { name: "Rechazados", value: 2 },
    { name: "Por subir", value: 3 },
  ];

  const queryClient = useQueryClient();

  const rejectMutation = useMutation(
    async () =>
      setStatusDocument(
        profile.token,
        query.processId,
        docId,
        JSON.stringify({ status: 2, statusReason: motivo })
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["documents"] });
        showModalExtended();
        setMotivo("");
      },
    }
  );

  const { data: statusPayment, isSuccess } = useQuery({
    queryKey: ["installements", query.processId],
    queryFn: () => getProcessInfo(profile.token, query.processId),
  });

  const { data: balance } = useQuery({
    queryKey: ["balance", statusPayment?.client?.id],
    queryFn: () => getBalance(profile.token, statusPayment.client.id),
    enabled: !!statusPayment?.client?.id,
  });

  const docsValidateQuery = useQuery({
    queryKey: ["documents", query.processId],
    queryFn: () => getDocsToValidate(profile.token, query.processId),
  });

  const userProfileDocs = useQuery(["userProfileDocs", profile.id], () =>
    infoForDocuments(clientInfo, profile.token, profile.id)
  );

  useQuery(
    ["userTotalDocs", query.processId],
    () => getRequiredDocsByProcessId(profile.token, query.processId),
    {
      enabled: !!userProfileDocs,
      onSuccess: (data) => showDifDocs(data),
    }
  );

  const showDifDocs = (data: any) => {
    setDifDocs(
      data.filter((doc: any) =>
        docsValidateQuery?.data?.every(
          (docV: any) => doc.docTypeId != docV.documentType.id
        )
      )
    );
  };

  return (
    <>
      <PortalHeader title="Retención - validar docs" />
      <div className="mx-auto max-w-7xl pt-6 pb-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex-col space-y-8">
          <SectionBloc title="Documentos para validar">
            {docsValidateQuery.isLoading ? (
              <LoadingContainer />
            ) : (
              <div>
                <div className="mb-8">
                  <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                      Select a tab
                    </label>

                    <select
                      id="tabs"
                      name="tabs"
                      onChange={(e) => setStatus(Number(e.target.value))}
                      className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                    >
                      {tabs.map((tab) => (
                        <option key={tab.name} value={tab.value}>
                          {tab.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                          <button
                            key={tab.name}
                            onClick={() => setStatus(tab.value)}
                            className={clsx(
                              tab.value == status
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

                {(status == 0 || status == 1 || status == 2) && (
                  <>
                    {docsValidateQuery.data
                      .filter((item: any) => item.status == status)
                      .map((doc: any) => (
                        <DocCard
                          doc={doc}
                          processId={query.processId}
                          customerId={query.customerId}
                          key={doc.id}
                        />
                      ))}
                  </>
                )}
                {status == 3 && (
                  <>
                    {difDocs?.map((doc: any) => (
                      <div
                        className="bg-white mb-3 last:mb-0 rounded-lg border p-3 text-sm flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center"
                        key={doc.name}
                      >
                        <p className="flex-1">{doc.name}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </SectionBloc>
        </div>
        <div className="flex-col space-y-8">
          <SectionBloc title="Enviar mensaje a cliente">
            <MessageClient
              user={statusPayment?.client}
              token={profile.token}
              owner={dataProfile}
            />
          </SectionBloc>
          <InstallmentsUserInfo info={statusPayment} loaded={isSuccess} />
        </div>
      </div>
      <ModalExtended>
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
              Rechazar documento
            </button>
          </div>
        </div>
      </ModalExtended>
    </>
  );
};

Cuestionario.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Cuestionario;
