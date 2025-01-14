import React from "react";
import PortalLayout from "components/layouts/portal";
import ClientLayout from "components/layouts/client";
import type { NextPageWithLayout } from "../../../../../_app";
import type { ReactElement } from "react";
import LeadInfoQuestions from "components/portal/estudio/questions";
import { useQuery } from "@tanstack/react-query";
import { getLeadSurvey } from "apis/leads";
import { useRouter } from "next/router";
import { getProfile } from "apis/auth";
import { usePortalStore } from "store/portal";
import { getInfoUser } from "apis/client";
import PortalHeader from "components/portal/layout/header";

const QuestionsUserAdmin: NextPageWithLayout = () => {
  const router = useRouter();

  const profile = usePortalStore((state) => state.profile);
  const setClientInfo = usePortalStore((state) => state.setClientInfo);

  const userInfoQuery = useQuery(["userInfo", router.query.id], async () =>
    getProfile(router.query.id, profile.token)
  );

  const questionsEstudioEconomicoQuery = useQuery(
    ["questions", router.query.id],
    () => getLeadSurvey(userInfoQuery.data.emailaddress),
    {
      enabled: !!userInfoQuery.data,
    }
  );

  useQuery(
    ["userQuestions", router.query.id],
    async () => getInfoUser(profile.token, router.query.id),
    {
      onSuccess(data) {
        setClientInfo(data);
      },
    }
  );

  return (
    <div>
      <PortalHeader title="Preguntas cliente" />
      <div className="flex justify-between items-baseline border-b border-gray-100 px-4 pb-4">
        <p className="text-sm font-medium pt-1">
          Preguntas del Estudio Económico
        </p>
      </div>

      <div className="p-4">
        <>
          {questionsEstudioEconomicoQuery.isLoading ? (
            <></>
          ) : (
            <div className="">
              <LeadInfoQuestions
                questions={questionsEstudioEconomicoQuery.data.answers}
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

QuestionsUserAdmin.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ClientLayout>{page}</ClientLayout>
    </PortalLayout>
  );
};

export default QuestionsUserAdmin;
