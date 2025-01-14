import React from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import type { ReactElement } from "react";
import Department from "components/portal/changelog/department";
import PortalHeader from "components/portal/layout/header";
import VersionsLayout from "components/layouts/versions";

const ChangeLog: NextPageWithLayout = () => {
  return (
    <>
      <PortalHeader title="Cambios portal" />
    </>
  );
};

ChangeLog.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <VersionsLayout>{page}</VersionsLayout>
    </PortalLayout>
  );
};

export default ChangeLog;
