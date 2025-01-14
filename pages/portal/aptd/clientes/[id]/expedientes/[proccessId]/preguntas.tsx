import React from "react";
import PortalLayout from "components/layouts/portal";
import ClientLayout from "components/layouts/client";
import type { NextPageWithLayout } from "../../../../../../_app";
import type { ReactElement } from "react";
import { EmptyFolder } from "components/icons";
import LoadingContainer from "components/portal/loading";
import ClientInfoQuestions from "components/portal/info";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getProfile } from "apis/auth";
import { usePortalStore } from "store/portal";
import { getInfoUser } from "apis/client";
import PortalHeader from "components/portal/layout/header";
import ProcessLayout from "components/layouts/process";

const QuestionsUserAdmin: NextPageWithLayout = () => {
  const router = useRouter();

  const profile = usePortalStore((state) => state.profile);
  const setClientInfo = usePortalStore((state) => state.setClientInfo);

  const userInfoQuery = useQuery(["userInfo", router.query.id], async () =>
    getProfile(router.query.id, profile.token)
  );

  const userQuestionsQuery = useQuery(
    ["userQuestions", router.query.id],
    async () => getInfoUser(profile.token, router.query.id),
    {
      onSuccess(data) {
        setClientInfo(data);
      },
    }
  );

  console.log(userQuestionsQuery.data);

  return (
    <div>
      <PortalHeader title="Preguntas cliente" />

      <div className="p-4">
        <>
          {userQuestionsQuery.isLoading || userInfoQuery.isLoading ? (
            <LoadingContainer />
          ) : (
            <>
              {userInfoQuery.data.isProfileCompleted ? (
                <>
                  {userQuestionsQuery.data.length > 0 ? (
                    <ClientInfoQuestions type="detailed" />
                  ) : (
                    <div className="text-gray-500 text-center text-sm">
                      Cliente antiguo revisar
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8">
                  <EmptyFolder className="text-gray-500 w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 text-center">
                    Todavía no ha finalizado todas las preguntas iniciales.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

QuestionsUserAdmin.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ClientLayout>
        <ProcessLayout>{page}</ProcessLayout>
      </ClientLayout>
    </PortalLayout>
  );
};

export default QuestionsUserAdmin;
