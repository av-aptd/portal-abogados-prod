import React from "react";
import PortalLayout from "components/layouts/portal";
import ProcessLayout from "components/layouts/process";
import type { NextPageWithLayout } from "../../../../../../_app";
import type { ReactElement } from "react";
import PortalHeader from "components/portal/layout/header";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getProcessInstallments } from "apis/processes";
import { usePortalStore } from "store/portal";
import LoadingContainer from "components/portal/loading";
import LineMultiItem from "components/portal/user/lineMultiItem";
import ClientLayout from "components/layouts/client";

const PagosProcess: NextPageWithLayout = () => {
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);

  const installmentsQuery = useQuery(
    ["installmentsProccess", router.query.proccessId],
    () => getProcessInstallments(profile.token, router.query.proccessId),
    {
      onSuccess: (data) => {
        // setProcess(data);
      },
    }
  );

  return (
    <>
      <PortalHeader title="Plan de pagos expediente" />
      {installmentsQuery.isLoading ? (
        <LoadingContainer />
      ) : (
        <>
          {installmentsQuery.data &&
            installmentsQuery.data
              .sort((a: any, b: any) => a.ordernumber - b.ordernumber)
              .map((installment: any) => (
                <LineMultiItem key={installment.id} installment={installment} />
              ))}
        </>
      )}
    </>
  );
};

PagosProcess.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ClientLayout>
        <ProcessLayout>{page}</ProcessLayout>
      </ClientLayout>
    </PortalLayout>
  );
};

export default PagosProcess;
