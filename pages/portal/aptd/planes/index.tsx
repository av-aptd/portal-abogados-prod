import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { usePortalStore } from "store/portal";
import { Check, Search } from "components/icons";
import clsx from "clsx";
import Link from "next/link";
import LoadingContainer from "components/portal/loading";

import { getPlans } from "apis/pricing";
import Head from "next/head";
import LsoPricingsList from "components/portal/pricings/lsoPricingsList";

const Planes: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const { pathname } = useRouter();
  const [filter, setFilter] = useState<any>("");
  const [value, setValue] = useState<any>("");

  var queryParams = `searchBy=${filter}&searchValue=${value}`;

  const pricingsQuery = useQuery(["pricings", queryParams], () =>
    getPlans(profile.token, queryParams)
  );

  return (
    <>
      <Head>
        <title>Planes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="pt-6 mx-auto max-w-7xl">
        <LsoPricingsList section="comercial" />
      </div>
    </>
  );
};

export default Planes;

Planes.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};
