import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import type { ReactElement } from "react";
import { usePortalStore } from "store/portal";

import Breadcrumbs from "components/portal/breadCrumbs";
import ClientInfoQuestions from "components/portal/info";
import Link from "next/link";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { getInfoUser } from "apis/client";
import { useQuery } from "@tanstack/react-query";

const Cuestionario: NextPageWithLayout = () => {
  const dataProfile = usePortalStore((state) => state.dataProfile);

  return (
    <>
      <div className="pt-6 mx-auto max-w-5xl">
        <SectionBloc
          title={
            dataProfile.isProfileCompleted
              ? "Cuestionario respuestas iniciales"
              : "Cuestionario preguntas iniciales"
          }
        >
          {dataProfile.isProfileCompleted ? (
            <ClientInfoQuestions type="detailed" />
          ) : (
            <div className="bg-white px-8 py-16 rounded-lg flex justify-center items-center border">
              <div className="text-center">
                <h1 className="text-primary font-bold text-xl pb-2">
                  Preguntas iniciales no completadas
                </h1>
                <p className="text-gray-500 pb-8">
                  Por favor, finaliza las preguntas para acceder a esta sección.
                </p>
                <Link
                  href="/portal/clientes/preguntas"
                  className="bg-secondary text-white px-4 py-2 rounded"
                >
                  Finalizar preguntas
                </Link>
              </div>
            </div>
          )}
        </SectionBloc>
      </div>
    </>
  );
};

Cuestionario.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Cuestionario;
