import React from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import type { ReactElement } from "react";
import ListLeads from "components/portal/leads/listLeads";
import PortalHeader from "components/portal/layout/header";

const Leads: NextPageWithLayout = () => {
  return (
    <>
      <PortalHeader title="Listado de leads" />
      <div className="mx-auto max-w-7xl py-6">
        <ListLeads />
      </div>
    </>
  );
};

Leads.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Leads;
