import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";

import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { usePortalStore } from "store/portal";
import { formatDate } from "shared/helpers";
import { Avatar, BigCheck, EmptyNotifications } from "components/icons";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import LoadingContainer from "components/portal/loading";
import clsx from "clsx";
import {
  getProcessInfo,
  statusRequiredDocsByProcessId,
  processesByUserId,
} from "apis/processes";
import { getUserAnnotations } from "apis/annotations";

const Caso: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);

  const processesQuery = useQuery(["userProcesses"], () =>
    processesByUserId(profile.token, profile.id)
  );

  const processInfoQuery = useQuery(
    ["notationsProcess"],
    async () => getProcessInfo(profile.token, processesQuery.data[0].id),
    {
      enabled: !!processesQuery.data,
    }
  );

  const annotationsQuery = useQuery(
    ["userAnnotations"],
    async () => getUserAnnotations(profile.token, processesQuery.data[0].id),
    {
      enabled: !!processesQuery.data,
    }
  );

  const statusProcessQuery = useQuery(
    ["statusProcess"],
    () =>
      statusRequiredDocsByProcessId(profile.token, processesQuery.data[0].id),
    {
      enabled: !!processInfoQuery.data,
      onError: (error) => {
        console.log("error:", error);
      },
      onSuccess: (data) => {},
    }
  );

  const isNextStep = (step: any, steps: any) => {
    // TO CHANGE LATER
    // return (
    //   step.status === false && steps[Number(step.step - 2)].status === true
    // );
    return true;
  };

  console.log("statusProcessQuery.data:", statusProcessQuery.data);

  return (
    <>
      <Head>
        <title>Mi caso</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="pt-6 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <SectionBloc
            title="Estado de mi caso"
            description="Situación actual de tu caso."
          >
            {statusProcessQuery.isLoading ? (
              <LoadingContainer />
            ) : (
              <nav aria-label="Progress">
                <ol role="list" className="overflow-hidden">
                  {statusProcessQuery?.data?.map((step: any, stepIdx: any) => (
                    <li
                      key={step.name}
                      className={clsx(
                        stepIdx !== statusProcessQuery.data.length - 1
                          ? "pb-10"
                          : "",
                        "relative"
                      )}
                    >
                      {step.status === true ? (
                        <>
                          {stepIdx !== statusProcessQuery.data.length - 1 ? (
                            <div
                              className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-secondary"
                              aria-hidden="true"
                            />
                          ) : null}
                          <a
                            href={step.href}
                            className="group relative flex items-start"
                          >
                            <span className="flex h-9 items-center">
                              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-secondary group-hover:bg-secondary">
                                <BigCheck
                                  className="h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                              </span>
                            </span>
                            <span className="ml-4 mt-2 flex min-w-0 flex-col">
                              <span className="text-sm font-medium text-secondary">
                                {step.name}
                              </span>
                            </span>
                          </a>
                        </>
                      ) : isNextStep(step, statusProcessQuery.data) ? (
                        <>
                          {stepIdx !== statusProcessQuery.data.length - 1 ? (
                            <div
                              className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                              aria-hidden="true"
                            />
                          ) : null}
                          <a
                            href={step.href}
                            className="group relative flex items-start"
                            aria-current="step"
                          >
                            <span
                              className="flex h-9 items-center"
                              aria-hidden="true"
                            >
                              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-400 bg-white">
                                <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                              </span>
                            </span>
                            <span className="ml-4 mt-2 flex min-w-0 flex-col">
                              <span className="text-sm font-medium text-gray-500">
                                {step.name}
                              </span>
                            </span>
                          </a>
                        </>
                      ) : (
                        <>
                          {stepIdx !== statusProcessQuery.data.length - 1 ? (
                            <div
                              className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                              aria-hidden="true"
                            />
                          ) : null}
                          <a
                            href={step.href}
                            className="group relative flex items-start"
                          >
                            <span
                              className="flex h-9 items-center"
                              aria-hidden="true"
                            >
                              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                              </span>
                            </span>
                            <span className="ml-4 mt-2 flex min-w-0 flex-col">
                              <span className="text-sm font-medium text-gray-500">
                                {step.name}
                              </span>
                            </span>
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </SectionBloc>
          <SectionBloc
            title="Notificaciones de mi caso"
            description="Listado de las útimas notificaciones de tu caso."
          >
            {annotationsQuery.isLoading ? (
              <LoadingContainer />
            ) : (
              <>
                {annotationsQuery.data.length > 0 ? (
                  <div className="flow-root">
                    <ul role="list" className="-mb-8">
                      {annotationsQuery.data.map(
                        (annotation: any, activityItemIdx: any) => (
                          <li key={annotation.id}>
                            <div className="relative pb-8">
                              {activityItemIdx !==
                              annotationsQuery.data.length - 1 ? (
                                <span
                                  className="absolute top-5 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div className="relative flex items-start space-x-3">
                                <>
                                  <Avatar className="h-8 w-8 rounded-full bg-white text-gray-500" />

                                  <div className="min-w-0 flex-1">
                                    <div>
                                      <div className="text-sm"></div>
                                      <p className="mt-0.5 text-sm text-gray-500">
                                        {formatDate(
                                          annotation.creationDate,
                                          "medium",
                                          "es"
                                        )}
                                      </p>
                                    </div>
                                    <div
                                      className="mt-2 text-sm text-gray-700"
                                      dangerouslySetInnerHTML={{
                                        __html: annotation.text,
                                      }}
                                    ></div>
                                  </div>
                                </>
                              </div>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-12 rounded-lg bg-gray-50">
                    <div>
                      <div className="flex justify-center pb-2">
                        <EmptyNotifications className="text-secondary h-12 w-12" />
                      </div>
                      <p className="text-gray-500 text-sm text-center">
                        Todavía no tienes notificaciones
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </SectionBloc>
        </div>
      </div>
    </>
  );
};

Caso.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Caso;
