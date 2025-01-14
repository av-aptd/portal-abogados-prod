import React from "react";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";

import { usePreguntasStore } from "store/preguntas";
import { usePortalStore } from "store/portal";
import { loginImpersonate } from "apis/auth";
import { useRouter } from "next/router";
import EditClientForm from "./editClientForm";
import EditEmailClientForm from "./editClientEmailForm";
import { tenant_has_permission } from "vars/portal/vars";

const InfoClientBloc = ({ userInfoQuery }: any) => {
  const setUserId = usePreguntasStore((state) => state.setUserId);
  const setToken = usePreguntasStore((state) => state.setToken);
  const setImpersonate = usePortalStore((state) => state.setImpersonate);
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const profile = usePortalStore((state) => state.profile);
  const setOriginalProfile = usePortalStore(
    (state) => state.setOriginalProfile
  );

  const router = useRouter();

  const setOriginalDataProfile = usePortalStore(
    (state) => state.setOriginalDataProfile
  );

  const setProfile = usePortalStore((state) => state.setProfile);

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

  const showImpersonate = () => {
    if (profile.email) {
      return process.env.NEXT_PUBLIC_ALLOW_IMPERSONATE_EMAILS?.toLowerCase().includes(
        profile.email.toLowerCase()
      );
    }
    return false;
  };

  return (
    <ComplexSectionBloc>
      <HeaderSection
        title="Cliente"
        description="Información básica del cliente"
        hasActions
      >
        {showImpersonate() &&
          tenant_has_permission(
            "PORTAL.CLIENTS.IMPERSONATE",
            dataProfile.tenantid
          ) && (
            <button
              className="text-white text-sm px-4 py-1 rounded-md flex justify-center items-center bg-secondary"
              onClick={() => impersonate()}
            >
              Impersonate
            </button>
          )}
      </HeaderSection>
      <BodySection>
        <EditClientForm client={userInfoQuery.data} />
        <EditEmailClientForm client={userInfoQuery.data} />
      </BodySection>
    </ComplexSectionBloc>
  );
};

export default InfoClientBloc;
