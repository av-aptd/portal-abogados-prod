import React from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import type { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  formatDate,
  formatTime,
  getSettings,
  getSettingsSecure,
} from "shared/helpers";
import { useRouter } from "next/router";
import { usePortalStore } from "store/portal";

const MailingDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);

  const getMailingInfo = async () => {
    const getOptions = getSettings("GET");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/webinars/${router.query.id}`,
      getOptions
    );
    return await response.json();
  };

  const getListRegistered = async () => {
    const getOptions = getSettingsSecure("GET", profile.token);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/webinars/${router.query.id}/registrations`,
      getOptions
    );
    return await response.json();
  };

  const { data: mailing, isSuccess: mailSucces } = useQuery({
    queryKey: ["mailingInfo"],
    queryFn: () => getMailingInfo(),
  });

  const { data: listUSers, isSuccess: listSucces } = useQuery({
    queryKey: ["listUsers"],
    queryFn: () => getListRegistered(),
  });

  return (
    <div className="pt-6 mx-auto max-w-7xl">
      <h1 className="font-bold text-2xl mb-2 text-primary">
        Detalles del webinar
      </h1>
      {mailSucces && (
        <div className="my-4 bg-white p-4 grid lg:grid-cols-3 gap-8 rounded-lg border">
          <div>
            <p className="text-gray-500 text-sm">Título</p>
            <p>{mailing.name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Día y hora</p>
            <p>
              {formatDate(mailing.date, "noYear", "es")} a las{" "}
              {formatTime(mailing.date, "es")}h.
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Presentador/a</p>
            <p>{mailing.presenterName}</p>
          </div>
        </div>
      )}
      {listSucces && (
        <div className="my-4">
          <h3 className="text-primary font-xl font-semibold pb-2">
            {listUSers.length} Usuarios registrados
          </h3>

          {listUSers.map((user: any) => (
            <div
              key={user.id}
              className="bg-white p-2 rounded-lg mb-2 border flex justify-between"
            >
              {user.name} {user.surname} - {user.email}
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => router.push("/portal/aptd/mailing")}
        className="bg-secondary text-white px-4 py-2 text-sm rounded-md"
      >
        Volver
      </button>
    </div>
  );
};

export default MailingDetails;

MailingDetails.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};
