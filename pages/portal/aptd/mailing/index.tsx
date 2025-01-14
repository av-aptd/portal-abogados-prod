import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useLayoutEffect, useRef, useState } from "react";
import type { ReactElement } from "react";

import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { usePortalStore } from "store/portal";
import { formatDate, getSettings, getSettingsSecure } from "shared/helpers";
import { useRouter } from "next/router";
import clsx from "clsx";
import LoadingContainer from "components/portal/loading";
import DatePicker from "react-datepicker";

import {
  cerrado1,
  cerrado11,
  cerrado22,
  cerrado3,
  cerrado33,
  cerrado4,
  cerrado5,
  cerrado6,
  cerrado7,
  cerrado8,
  pagosUser,
  webinar3,
  enero,
  seguimiento1,
  huelga,
  promo999,
  promoGenerica1,
  promoGenerica2,
  webinar,
  pago2,
} from "vars/mailings";

import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import { ArrowNext } from "components/icons";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  surname: string;
  debtValue: string;
  isNotified: boolean;
  created_at: string;
  source: string;
  status: string;
}

const Mailing: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);

  const getMailings = async () => {
    const getOptions = getSettings("GET");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/webinars`,
      getOptions
    );
    return await response.json();
  };

  const {
    data: mailings,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["mailings"],
    queryFn: () => getMailings(),
  });

  console.log(mailings);

  const webinar2 = [
    "alex@wualia.com",
    "alex.verdaguer@abogadosparatusdeudas.es",
    "roger@abogadosparatusdeudas.es",
  ];

  async function sendNotification() {
    let messages = [];

    let counter = 1;

    for (const lead of pago2) {
      messages.push({
        source: "Mailing",
        From: "noreply@abogadosparatusdeudas.es",
        To: lead,
        TemplateAlias: "recordatorio-2o-pago",
        templateModel: {
          subject: "Te animamos a continuar con el proceso",
        },
        messageStream: "outbound",
      });

      if (counter == 400) {
        const options = getSettingsSecure(
          "POST",
          profile.token,
          JSON.stringify(messages)
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/email-notification/bulk`,
          options
        );

        messages = [];

        counter = 1;
      }
      counter++;
    }

    if (messages.length > 0) {
      const options = getSettingsSecure(
        "POST",
        profile.token,
        JSON.stringify(messages)
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/email-notification/bulk`,
        options
      );
    }
  }

  return (
    <>
      <Head>
        <title>Marketing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="pt-6">
        <h1 className="font-bold text-2xl mb-2 text-primary">Mailings</h1>
        <div className="">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4 pb-8">
              <h1 className="text-xl font-medium text-gray-500">
                Listado de mailings enviados.
              </h1>
              {/* {webinar2.length > 0 && (
                <div className="bg-secondary/10 text-secondary font-medium px-2 py-1 rounded-full flex items-center justify-center text-xs">
                  {webinar2.length}
                </div>
              )} */}
            </div>
            {/* <button
              onClick={() => sendNotification()}
              type="button"
              className="inline-flex items-center rounded border border-secondary bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
            >
              Mailing manual
            </button> */}
            <Link
              href="/portal/aptd/mailing/plantillas"
              // onClick={() => sendNotification()}
              // type="button"
              className="inline-flex items-center rounded border border-secondary bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
            >
              Nuevo mailing
            </Link>
          </div>
          {isSuccess && (
            <>
              {mailings.map((mailing: any) => (
                <div
                  className="bg-white mb-2 p-2 rounded border flex justify-between item-center"
                  key={mailing.id}
                >
                  <p className="text-sm font-bold text-gray-800 flex-1">
                    {mailing.name}
                  </p>
                  <p className="text-sm text-gray-500 flex-1">
                    {formatDate(mailing.date, "medium", "es")}
                  </p>
                  <Link href={`/portal/aptd/mailing/${mailing.id}`}>
                    <ArrowNext className="h-5 w-5 text-gray-500" />
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

Mailing.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Mailing;
