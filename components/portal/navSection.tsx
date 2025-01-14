import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const contabilidadLinks = [
  {
    id: 1,
    name: "Añadir pago",
    path: "/portal/aptd/contabilidad/pago",
  },
  {
    id: 2,
    name: "Situación pagos",
    path: "/portal/aptd/contabilidad/situacion-pagos",
  },
];

const NavSection = () => {
  const router = useRouter();

  console.log(router);

  return (
    <div className="bg-white rounded-lg flex py-2 border px-4 space-x-4 text-sm">
      {contabilidadLinks.map((link) => (
        <Link
          href={link.path}
          key={link.id}
          className={clsx(
            router.pathname == link.path ? "text-secondary" : "text-gray-500",
            ""
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavSection;
