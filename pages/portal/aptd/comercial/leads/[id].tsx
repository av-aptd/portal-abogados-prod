import React, { use, useState } from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import type { ReactElement } from "react";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getLeadbyId,
  getLeadSurvey,
  sendEmailToLead,
  sendHojaEncargoToLead,
} from "apis/leads";
import { usePortalStore } from "store/portal";
import LoadingContainer from "components/portal/loading";
import LeadInfoQuestions from "components/portal/estudio/questions";
import { Ring } from "@uiball/loaders";
import clsx from "clsx";
import { CheckFilled } from "components/icons";
import { getPlans } from "apis/pricing";
import { useUIStore } from "store/ui";
import { ModalExtended } from "components/portal/estudio/modalExtended";
import { Switch } from "@headlessui/react";
import PortalHeader from "components/portal/layout/header";
import EditLeadForm from "components/portal/leads/editLeadForm";
import ListPlans from "components/portal/plans/listPlans";
import { getTenantName, isAPTDTenant } from "shared/helpers";
import LeadNotation from "../components/leadNotation";
import { getTenants } from "apis/tenants";
import SendLinkForm from "components/portal/leads/sendLinkForm";

const LeadDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const [body, setBody] = useState<any>(null);
  const [body2, setBody2] = useState<any>(null);
  const [filter, setFilter] = useState<any>("");
  const [value, setValue] = useState<any>("");
  const showModalExtended: any = useUIStore((state) => state.showModalExtended);
  const [planId, setPlanId] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [online, setOnline] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  var queryParams = `searchBy=${filter}&searchValue=${value}`;

  const leadQuery = useQuery(["leadInfo", router.query.id], () =>
    getLeadbyId(router.query.id, profile.token)
  );

  const tenantsQuery = useQuery(["tenants"], () => getTenants(profile.token));

  const questionsQuery = useQuery(
    ["questions", router.query.id],
    () => getLeadSurvey(leadQuery.data?.email),
    {
      enabled: !!leadQuery.data,
      onSuccess: (data) => {
        setBody({
          email: leadQuery.data.email,
          message: {
            name: leadQuery.data.name,
            email: leadQuery.data.email,
            nameLawyer: dataProfile.name,
            surnameLawyer: dataProfile.surname,
            authId: profile.AuthId,
            showOnline: online ? 1 : 0,
            source: "lead",
            tenant: getTenantName({
              tenantId: dataProfile.tenantid,
              tenants: tenantsQuery.data,
            }),
            dev:
              process.env.NEXT_PUBLIC_PLATFORM == "development" ? true : false,
          },
        });

        if (
          data?.answers?.filter(
            (item: any) => item.nextQuestionKey === "resultado"
          ).length > 0
        ) {
          setFinalizado(true);
        }
      },
    }
  );

  const mutation = useMutation(
    async (body) => sendEmailToLead(body, profile.token),
    {
      onSuccess: (data) => {
        // console.log("respuesta", data);
        // console.log("hola");
      },
      onError: (error) => {
        // console.log("error", error);
      },
    }
  );

  var queryParams = `searchBy=${filter}&searchValue=${value}&tenantId=1  `;
  const pricingsQuery = useQuery(["pricings", queryParams], () =>
    getPlans(profile.token, queryParams)
  );

  const sendLinkToClient = async () => {
    mutation.mutate(body);
  };

  const copyLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_ESTUDIO}/resultado?email=${
        leadQuery.data?.email
      }&authId=${profile.AuthId}&online=${online ? 1 : 0}&source=lead`
    );
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const copyLinkHE = () => {
    setCopied(true);
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_ESTUDIO}/planes/firmar?email=${leadQuery.data?.email}&planId=${planId}&comercialId=${profile.AuthId}&token=${profile.token}`
    );
    setTimeout(() => {
      setCopied(false);
      showModalExtended();
      setPlanId(null);
    }, 2000);
  };

  const volver = () => {
    router.back();
  };

  const selectPlan = () => {
    showModalExtended();
  };

  const sendHojadeEncargo = async () => {
    await sendHojaEncargoToLead(
      {
        email: leadQuery.data.email,
        message: {
          name: leadQuery.data.name,
          email: leadQuery.data.email,
          nameLawyer: dataProfile.name,
          surnameLawyer: dataProfile.surname,
          authId: profile.AuthId,
          planId: planId,
          token: profile.token,
        },
      },
      profile.token
    );
    showModalExtended();
  };

  const comparteDeudas = questionsQuery.data?.answers?.find(
    (item: any) => item.questionKey === "compartestusdeudas"
  )
    ? questionsQuery.data?.answers?.find(
        (item: any) => item.questionKey === "compartestusdeudas"
      ).selected
    : "no";

  return (
    <>
      <PortalHeader title="Detalle lead" />

      <div className="mx-auto max-w-7xl py-6">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col space-y-4">
            <SectionBloc title="Detalle lead">
              {leadQuery.isLoading ? (
                <LoadingContainer />
              ) : (
                <EditLeadForm lead={leadQuery.data} />
              )}
            </SectionBloc>
            <SectionBloc title="Envíos">
              {leadQuery.isLoading ? (
                <LoadingContainer />
              ) : (
                <>
                  <>
                    {finalizado && (
                      <>
                        {isAPTDTenant(dataProfile.tenants) ? (
                          <div className="pb-4">
                            <SendLinkForm
                              lead={leadQuery.data}
                              type={comparteDeudas == "si" ? "LSO-UF" : "LSO"}
                              plans={pricingsQuery?.data}
                            />
                          </div>
                        ) : (
                          <div className="bopy-4 flex items-cente justify-between items-center">
                            <p className="text-sm text-gray-500">
                              Estudio económico
                            </p>
                            <div className="flex space-x-4">
                              <button
                                className={clsx(
                                  copied
                                    ? "bg-green-100 text-green-500 border-green-100"
                                    : "bg-transparent text-gray-500 border-gray-300",
                                  "border   text-sm w-32 py-2 rounded-md flex justify-center items-center duration-150"
                                )}
                                onClick={() => copyLink()}
                              >
                                {copied ? "Copiado" : "Copiar Link"}
                              </button>
                              <button
                                disabled={mutation.isLoading}
                                className={clsx(
                                  mutation.isSuccess
                                    ? "bg-green-500"
                                    : "bg-secondary",
                                  " text-white text-sm w-32 py-2 rounded-md flex justify-center items-center"
                                )}
                                onClick={() => sendLinkToClient()}
                              >
                                {mutation.isLoading ? (
                                  <Ring size={20} color="#fff" />
                                ) : mutation.isSuccess ? (
                                  <>
                                    <CheckFilled className="w-4 h-4 mr-2 text-white" />
                                    Enviada
                                  </>
                                ) : (
                                  "Reenviar"
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {leadQuery.data.dni &&
                      isAPTDTenant(dataProfile.tenants) && (
                        <div className="border-t py-4 flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Hoja de encargo personalizada
                          </p>
                          <button
                            className={clsx(
                              " text-white text-sm w-40 py-2 rounded-md flex justify-center items-center bg-secondary"
                            )}
                            onClick={selectPlan}
                          >
                            Seleccionar plan
                          </button>
                        </div>
                      )}
                  </>
                </>
              )}
            </SectionBloc>
          </div>
          <div className="flex flex-col space-y-4">
            <SectionBloc title="Observaciones">
              <LeadNotation lead={leadQuery.data} />
            </SectionBloc>

            <SectionBloc title="Preguntas lead">
              {questionsQuery.isLoading ? (
                <LoadingContainer />
              ) : (
                <>
                  <LeadInfoQuestions questions={questionsQuery.data.answers} />
                </>
              )}
            </SectionBloc>
          </div>
        </div>
        <ModalExtended size="huge">
          <ListPlans
            planId={planId}
            setPlanId={setPlanId}
            copied={copied}
            setCopied={setCopied}
            copyLinkHE={copyLinkHE}
            sendHojadeEncargo={sendHojadeEncargo}
            mutation={mutation}
            typeList="lead"
            plans={pricingsQuery?.data}
          />
        </ModalExtended>
      </div>
    </>
  );
};
LeadDetail.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default LeadDetail;
