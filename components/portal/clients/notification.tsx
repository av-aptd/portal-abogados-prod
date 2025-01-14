import React from "react";
import MessageClient from "components/portal/messageClient";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { usePortalStore } from "store/portal";

const NotificationBloc = ({ userInfoQuery }: any) => {
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const profile = usePortalStore((state) => state.profile);

  return (
    <SectionBloc
      title="Enviar notificación"
      description="Enviar notificación al cliente"
    >
      <MessageClient
        user={userInfoQuery.isLoading ? "" : userInfoQuery.data}
        token={profile.token}
        owner={`${dataProfile.name} ${dataProfile.surname}`}
      />
    </SectionBloc>
  );
};

export default NotificationBloc;
