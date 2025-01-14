import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { usePortalStore } from "store/portal";

import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { getReport } from "apis/reports";
import ListReportFAC_RE from "components/reports/listReportFAC_RE";

const Reports: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);

  const reportQuery = useQuery(["reports"], () =>
    getReport({ reportName: "FAC_RE" })
  );

  console.log("reportQuery:", reportQuery.data);

  return (
    <>
      <Head>
        <title>Reportes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="pt-6 mx-auto">
        <ListReportFAC_RE />
      </div>
    </>
  );
};

export default Reports;

Reports.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};
