import React, { use, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePortalStore } from "store/portal";
import { ArrowBack } from "components/icons";

const ProcessNavBar = () => {
  const router = useRouter();
  const process = usePortalStore((state) => state.process);

  const processSections = [
    {
      id: 1,
      name: "Información",
      path: "",
    },
    {
      id: 3,
      name: "Documentos",
      path: "/documentos",
    },
    {
      id: 4,
      name: "Cuotas",
      path: "/cuotas",
    },
    {
      id: 5,
      name: "Preguntas",
      path: "/preguntas",
    },
    {
      id: 6,
      name: "Anotaciones",
      path: "/anotaciones",
    },
  ];

  const goToSection = (path: string) => {
    router.push(
      `/portal/aptd/clientes/${router.query.id}/expedientes/${router.query.proccessId}${path}`
    );
  };

  return (
    <div className="border-b">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4">
        <div className="flex items-center space-x-2">
          <Link
            href={`/portal/aptd/clientes/${router.query.id}/expedientes`}
            className="bg-gray-50 p-1 rounded-lg hover:bg-gray-100 duration-150"
          >
            <ArrowBack className="w-5 h5 text-gray-500" />
          </Link>
          <h3 className="font-medium">
            <span className="font-base">Expediente</span>{" "}
            {process.codigo_generado}
          </h3>
        </div>

        <div className="p-4 lg:hidden">
          <select
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-secondary focus:outline-none focus:ring-secondary text-sm"
            onChange={(e) => goToSection(e.target.value)}
          >
            {processSections?.map((section: any) => (
              <option key={section.id} value={section.path}>
                {section.name}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden lg:flex text-sm space-x-2">
          {processSections.map((sec: any) => (
            <Link
              href={`/portal/aptd/clientes/${router.query.id}/expedientes/${router.query.proccessId}${sec.path}`}
              key={sec.id}
              className={clsx(
                router.asPath ===
                  `/portal/aptd/clientes/${router.query.id}/expedientes/${router.query.proccessId}${sec.path}`
                  ? "text-secondary bg-secondary/10 font-medium"
                  : "text-gray-700",
                "cursor-pointer px-3 py-1.5 rounded-lg"
              )}
            >
              {sec.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessNavBar;
