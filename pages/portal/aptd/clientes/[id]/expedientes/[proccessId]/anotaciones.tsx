import React from "react";
import PortalLayout from "components/layouts/portal";
import ProcessLayout from "components/layouts/process";
import type { NextPageWithLayout } from "../../../../../../_app";
import type { ReactElement } from "react";
import PortalHeader from "components/portal/layout/header";
import ClientLayout from "components/layouts/client";
import clsx from "clsx";
import { Annotation, Day, Notifications } from "components/icons";
import { formatDate } from "shared/helpers";
import AnnotationBloc from "components/portal/anotation";

import { usePortalStore } from "store/portal";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getAnnotationsByProcess } from "apis/processes";

const AnnotationsProcess: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();

  const annotationsQuery = useQuery(
    ["annotationsProcess", router.query.proccessId],
    async () => getAnnotationsByProcess(profile.token, router.query.proccessId)
  );

  console.log(annotationsQuery.data);

  return (
    <div>
      <PortalHeader title="Anotaciones expediente" />

      <div className="grid lg:grid-cols-3 lg:gap-8 items-start p-4">
        <div className="lg:col-span-2">
          {annotationsQuery.isLoading ? (
            <p>Cargando</p>
          ) : (
            <>
              {annotationsQuery.data.length > 0 ? (
                annotationsQuery.data.map((annotation: any) => (
                  <div
                    key={annotation.id}
                    className="border p-4 mb-4 rounded-lg relative bg-gray-50/50"
                  >
                    <div className="flex space-x-2 items-center">
                      <Day className="w-5 h-5 text-secondary" />
                      <p className="text-xs text-secondary">
                        {formatDate(annotation.created_at, "es", "short")}
                      </p>
                    </div>

                    <div
                      className="pt-0 text-sm text-gray-600 mt-4"
                      dangerouslySetInnerHTML={{
                        __html: annotation.comment,
                      }}
                    ></div>
                  </div>
                ))
              ) : (
                <div className="border p-8 mb-4 rounded-lg flex justify-center items-center bg-gray-50/50">
                  <div className="">
                    <Annotation className="w-8 h-8 text-secondary mx-auto" />
                    <p className="text-sm text-gray-500 text-center pt-4">
                      Todavía no se han añadido anotaciones a este expediente
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="p-4 rounded-lg border sticky top-20">
          <p className="text-sm pb-2 text-gray-500">
            Añadir anotación al expediente
          </p>
          <AnnotationBloc token={profile.token} />
        </div>
      </div>
    </div>
  );
};

AnnotationsProcess.getLayout = function getLayout(page: ReactElement) {
  return (
    <PortalLayout>
      <ClientLayout>
        <ProcessLayout>{page}</ProcessLayout>
      </ClientLayout>
    </PortalLayout>
  );
};

export default AnnotationsProcess;
