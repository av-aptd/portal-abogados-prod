import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const ClientNavBar = () => {
  const router = useRouter();
  const clientSections = [
    {
      id: 1,
      name: "Información",
      value: "info-cliente",
      path: "/",
    },
    {
      id: 2,
      name: "Expedientes",
      value: "expedientes",
      path: "/expedientes",
    },
    {
      id: 3,
      name: "Acreedores",
      value: "acreedores",
      path: "/acreedores",
    },
    {
      id: 4,
      name: "Pagos",
      value: "pagos",
      path: "/pagos",
    },
    {
      id: 5,
      name: "Estudio económico",
      value: "preguntas",
      path: "/estudio",
    },
    {
      id: 6,
      name: "Notificaciones",
      value: "notificaciones",
      path: "/notificaciones",
    },
  ];

  const goToSection = (path: string) => {
    router.push(`/portal/aptd/clientes/${router.query.id}${path}`);
  };

  const activeTab = (path: any) => {
    if (router.asPath.includes(path) && path.length > 1) {
      return true;
    } else {
      if (path.length === 1 && router.asPath.length < 28) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="">
      <div className="lg:hidden">
        <select
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-secondary focus:outline-none focus:ring-secondary text-sm"
          onChange={(e) => goToSection(e.target.value)}
        >
          {clientSections?.map((section: any) => (
            <option key={section.id}>{section.name}</option>
          ))}
        </select>
      </div>

      <div className="hidden lg:flex flex-col text-sm space-y-2 px-4 py-4 border bg-white rounded-lg w-[200px]">
        {clientSections.map((sec: any) => (
          <Link
            href={`/portal/aptd/clientes/${router.query.id}${sec.path}`}
            key={sec.id}
            className={clsx(
              activeTab(sec.path)
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
  );
};

export default ClientNavBar;
