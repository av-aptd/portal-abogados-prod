import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const ClientSidebar = () => {
  const router = useRouter();
  const clientSections = [
    {
      id: 1,
      name: "Información",
      path: "",
    },
    {
      id: 2,
      name: "Expedientes",
      path: "/expedientes",
    },
    {
      id: 3,
      name: "Acreedores",
      path: "/acreedores",
    },
    {
      id: 4,
      name: "Pagos",
      path: "/pagos",
    },
    {
      id: 5,
      name: "Preguntas",
      path: "/preguntas",
    },
    {
      id: 6,
      name: "Notificaciones",
      path: "/notificaciones",
    },
  ];

  const goToSection = (path: string) => {
    router.push(`/portal/aptd/clientes/${router.query.id}${path}`);
  };

  return (
    <div className="">
      <div className="p-4 lg:hidden">
        <select
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-secondary focus:outline-none focus:ring-secondary text-sm"
          onChange={(e) => goToSection(e.target.value)}
        >
          {clientSections?.map((section: any) => (
            <option key={section.id} value={section.path}>
              {section.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden lg:flex flex-col text-sm space-y-2 px-4 py-4 bg-white border rounded-lg">
        {clientSections.map((sec: any) => (
          <Link
            href={`/portal/aptd/clientes/${router.query.id}${sec.path}`}
            key={sec.id}
            className={clsx(
              router.asPath ===
                `/portal/aptd/clientes/${router.query.id}${sec.path}`
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

export default ClientSidebar;
