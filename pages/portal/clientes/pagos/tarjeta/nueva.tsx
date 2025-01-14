import PortalLayout from "components/layouts/portal";
import React, { useEffect } from "react";
import type { NextPageWithLayout } from "../../../../_app";
import type { ReactElement } from "react";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import CCForm from "components/portal/payments/CCform";
import { usePortalStore } from "store/portal";
import { getClientAddress } from "apis/client";
import { getProvinceName } from "vars/shared";
import { getStripeCustomerId } from "apis/leads";
import { getProfile } from "apis/auth";

const NewCard: NextPageWithLayout = () => {
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const setDataProfile = usePortalStore((state) => state.setDataProfile);
  const profile = usePortalStore((state) => state.profile);

  useEffect(() => {
    if (dataProfile.stripeCustomerId == null) {
      createStripeCustomer();
    }
  }, [dataProfile]);

  const createStripeCustomer = async () => {
    const address = await getClientAddress(profile.token, profile.id);

    const body = {
      email: dataProfile.emailaddress,
      dni: dataProfile.dni,
      address: {
        street: address.address,
        city: address.city,
        state: getProvinceName(address.province),
        zip: address.zip,
      },
    };

    await getStripeCustomerId(body, dataProfile.id);

    const infoClient = await getProfile(profile.id, profile.token);
    setDataProfile(infoClient);
  };

  return (
    <div className="pt-6 mx-auto max-w-3xl">
      <SectionBloc title="Añadir tarjeta">
        <CCForm />
      </SectionBloc>
    </div>
  );
};

NewCard.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default NewCard;
