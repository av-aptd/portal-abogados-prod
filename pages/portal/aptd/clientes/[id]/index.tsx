import React, { useState } from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import type { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { usePortalStore } from "store/portal";
import { getProfile } from "apis/client";
import PortalHeader from "components/portal/layout/header";
import { tenant_has_permission } from "vars/portal/vars";
import ClientLayout from "components/layouts/client";
import EditClientForm from "components/portal/clients/editClientForm";
import EditEmailClientForm from "components/portal/clients/editClientEmailForm";
import { usePreguntasStore } from "store/preguntas";
import { loginImpersonate } from "apis/auth";
import { validateLeadByEmail } from "apis/leads";
import { ArrowNext } from "components/icons";
import Link from "next/link";

const ClientDetail: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();
  const setUserId = usePreguntasStore((state) => state.setUserId);
  const setToken = usePreguntasStore((state) => state.setToken);
  const setImpersonate = usePortalStore((state) => state.setImpersonate);
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const setOriginalProfile = usePortalStore(
    (state) => state.setOriginalProfile
  );
  const setOriginalDataProfile = usePortalStore(
    (state) => state.setOriginalDataProfile
  );

  const setProfile = usePortalStore((state) => state.setProfile);

  const userInfoQuery = useQuery(["userInfo", router.query.id], async () =>
    getProfile(profile.token, router.query.id)
  );

  const leadQuery = useQuery(
    ["leadInfo", userInfoQuery?.data?.emailaddress],
    () => validateLeadByEmail(userInfoQuery.data.emailaddress),
    {
      enabled: !!userInfoQuery.data,
    }
  );

  const showImpersonate = () => {
    if (dataProfile) {
      console.log(dataProfile.groups[0].groupName);

      return dataProfile?.groups?.filter(
        (item: any) =>
          item.groupName == "Admin" && item.groupName == "Retención"
      );
    }
    return false;
  };

  const impersonate = async () => {
    const res = await loginImpersonate(router.query.id, profile.token);

    setOriginalProfile(profile);
    setOriginalDataProfile(dataProfile);

    setImpersonate();

    setProfile({
      AuthId: res.user.AuthId,
      email: res.user.emailaddress,
      name: res.user.name,
      isActive: res.user.isactive,
      groups: res.groups,
      token: res.token,
      id: res.user.id,
    });
    setUserId(res.user.id);
    setToken(res.token);
    router.push("/portal");
  };

  return (
    <>
      <PortalHeader
        title={
          userInfoQuery.isLoading
            ? ""
            : `${userInfoQuery.data.name} ${userInfoQuery.data.surname}`
        }
      />

      <div className="flex justify-between items-center border-b border-gray-100 px-4 pb-4">
        <p className="text-sm font-medium">Información básica</p>
        <div className="">
          {/* {showImpersonate() &&
            tenant_has_permission(
              "PORTAL.CLIENTS.IMPERSONATE",
              dataProfile.tenantid
            ) && ( */}
          <button
            className="text-white text-sm px-4 py-1 rounded-md flex justify-center items-center bg-secondary"
            onClick={() => impersonate()}
          >
            Impersonate
          </button>
          {/* )} */}
        </div>
      </div>
      <div className="p-4">
        <EditClientForm client={userInfoQuery.data} />
        <EditEmailClientForm client={userInfoQuery.data} />
        {leadQuery?.data?.childLead != null && (
          <div className="mt-8">
            <p className="text-sm font-medium">
              Información del cónyuge secundario
            </p>
            <div className="flex flex-col lg:flex-row justify-between space-y-2 lg:space-y-0 lg:items-center border rounded-lg mt-2 text-sm p-2">
              <p>
                {leadQuery.data.childLead.name}{" "}
                {leadQuery.data.childLead.surname}
              </p>
              <p>{leadQuery.data.childLead.email}</p>
              <p>{leadQuery.data.childLead.phone}</p>
              <p>{leadQuery.data.childLead.dni}</p>
              <Link
                href={`/portal/aptd/comercial/leads/${leadQuery.data.childLead.id}`}
                className="bg-gray-100 hover:bg-gray-200 duration-150 p-1 rounded-lg"
              >
                <ArrowNext className="w-6 h-6 text-gray-500" />
              </Link>
            </div>
          </div>
        )}
        {leadQuery?.data?.parentLead != null && (
          <div className="mt-8">
            <p className="text-sm font-medium">
              Información del cónyuge primario
            </p>
            <div className="flex flex-col lg:flex-row justify-between space-y-2 lg:space-y-0 lg:items-center border rounded-lg mt-2 text-sm p-2">
              <p>
                {leadQuery.data.parentLead.name}{" "}
                {leadQuery.data.parentLead.surname}
              </p>
              <p>{leadQuery.data.parentLead.email}</p>
              <p>{leadQuery.data.parentLead.phone}</p>
              <p>{leadQuery.data.parentLead.dni}</p>

              <Link
                href={`/portal/aptd/comercial/leads/${leadQuery.data.parentLead.id}`}
                className="bg-gray-100 hover:bg-gray-200 duration-150 p-1 rounded-lg flex justify-center"
              >
                <ArrowNext className="w-6 h-6 text-gray-500" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

ClientDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ClientLayout>{page}</ClientLayout>
    </PortalLayout>
  );
};

export default ClientDetail;
