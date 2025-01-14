import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React from "react";
import type { ReactElement } from "react";

import Head from "next/head";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import Link from "next/link";
import { Questions, UploadFile, Creditors, DocuSigned } from "components/icons";

const Expediente: NextPageWithLayout = () => {
  const steps = [
    {
      id: "Paso 1",
      name: "Responder preguntas",
      href: "#",
      status: "complete",
    },
    { id: "Paso 2", name: "Subir acreedores", href: "#", status: "upcoming" },
    {
      id: "Paso 3",
      name: "Subir documentación",
      href: "#",
      status: "upcoming",
    },
    { id: "Paso 4", name: "Firmar expediente", href: "#", status: "upcoming" },
  ];

  return (
    <>
      <Head>
        <title> Mi expediente</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="pt-6 mx-auto max-w-7xl">
        <SectionBloc
          title="Mi Expediente"
          description="La documentación que te solicitamos a continuación, es necesaria para tramitar tu expediente."
        >
          <div className="mt-8">
            <nav aria-label="Progress">
              <ol
                role="list"
                className="space-y-4 md:flex md:space-y-0 md:space-x-8"
              >
                {steps.map((step) => (
                  <li key={step.name} className="md:flex-1">
                    {step.status === "complete" ? (
                      <a
                        href={step.href}
                        className="group flex flex-col border-l-4 border-secondary py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                      >
                        <span className="text-sm font-medium text-secondary group-hover:text-indigo-800">
                          {step.id}
                        </span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </a>
                    ) : step.status === "current" ? (
                      <a
                        href={step.href}
                        className="flex flex-col border-l-4 border-secondary py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                        aria-current="step"
                      >
                        <span className="text-sm font-medium text-secondary">
                          {step.id}
                        </span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </a>
                    ) : (
                      <a
                        href={step.href}
                        className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                      >
                        <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                          {step.id}
                        </span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <Link
              href="/portal/clientes/panel/cuestionario"
              className="bg-gray-50 rounded-lg p-8 hover:bg-gray-100 duration-150"
            >
              <Questions className="mx-auto w-10 h-10 text-secondary mb-4" />
              <p className="text-gray-700 text-center text-sm">
                Preguntas requeridas
              </p>
            </Link>
            <Link
              href="/portal/clientes/panel/listado-acreedores"
              className="bg-gray-50 rounded-lg p-8 hover:bg-gray-100 duration-150"
            >
              <Creditors className="mx-auto w-10 h-10 text-secondary mb-4" />
              <p className="text-gray-700 text-center text-sm">
                Listado acreedores
              </p>
            </Link>
            <Link
              href="/portal/clientes/panel/documentacion"
              className="bg-gray-50 rounded-lg p-8 hover:bg-gray-100 duration-150"
            >
              <UploadFile className="mx-auto w-10 h-10 text-secondary mb-4" />
              <p className="text-gray-700 text-center text-sm">
                Subir documentación
              </p>
            </Link>
            <Link
              href="/portal/clientes/preguntas"
              className="bg-gray-50 rounded-lg p-8 hover:bg-gray-100 duration-150"
            >
              <DocuSigned className="mx-auto w-10 h-10 text-secondary mb-4" />
              <p className="text-gray-700 text-center text-sm">
                Documentación generada
              </p>
            </Link>
          </div>
        </SectionBloc>
      </div>
    </>
  );
};

Expediente.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Expediente;
