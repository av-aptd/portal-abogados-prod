import {
  Panel,
  Expediente,
  Caso,
  Payments,
  Trial,
  Sales,
  Retention,
  Marketing,
  Creditors,
  Processes,
  Mailing,
  Admin,
  Notifications,
  Transcripts,
  Users,
  Clients,
  Pricing,
  MenuValidarDocs,
  MenuAddUser,
  MenuTools,
  MenuNotifications,
  MenuDocsGeneration,
  MenuAddPayment,
  MenuPaymentsSituation,
  MenuLeads,
  Reports,
  Changelog,
  Incidents,
  AdminTools,
} from "./../../components/icons";

import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import React from "react";

export const SidebarLink = ({ section, isCompleted }: any) => {
  const router = useRouter();

  return (
    <div
      className={clsx(
        "rounded-lg  duration-150",
        router.asPath.startsWith(section.path) ? "bg-gray-50" : ""
      )}
    >
      <Link
        href={isCompleted ? section.path : ""}
        className="flex items-center space-x-3 py-2 px-2 text-white/70 "
      >
        {section.value == "panel" && (
          <Panel
            className={clsx(
              "h-6 w-6 text-secondary",
              !isCompleted && "text-[#eee]",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "expediente" && (
          <Expediente
            className={clsx(
              "h-6 w-6 text-secondary",
              !isCompleted && "text-[#eee]",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "caso" && (
          <Caso
            className={clsx(
              "h-6 w-6 text-secondary",
              !isCompleted && "text-[#eee]",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "reports" && (
          <Reports
            className={clsx(
              "h-6 w-6 text-secondary",
              !isCompleted && "text-[#eee]",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "pagos" && (
          <Payments
            className={clsx(
              "h-6 w-6 text-secondary",
              !isCompleted && "text-[#eee]",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "clientes" && (
          <Clients
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "expedientes" && (
          <Processes
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "usuarios" && (
          <Users
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "leads" && (
          <MenuLeads
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "contabilidad" && (
          <MenuPaymentsSituation
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "crear-pago" && (
          <MenuAddPayment
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "validar-docs" && (
          <MenuValidarDocs
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "acreedores" && (
          <Creditors
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}

        {section.value == "herramientas-procesal" && (
          <MenuTools
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "notificaciones-procesal" && (
          <MenuNotifications
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "documentacion-procesal" && (
          <MenuDocsGeneration
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "marketing" && (
          <Marketing
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "admin" && (
          <Admin
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "planes" && (
          <Pricing
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "notificaciones" && (
          <Notifications
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "mailing" && (
          <Mailing
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "transcripciones" && (
          <Transcripts
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "incidencias" && (
          <Incidents
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "herramientas-admin" && (
          <AdminTools
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}
        {section.value == "changelog" && (
          <Changelog
            className={clsx(
              "h-6 w-6 text-secondary",
              router.asPath.startsWith(section.path)
                ? "text-secondary"
                : "text-[#bbb]"
            )}
          />
        )}

        <p
          className={clsx(
            "text-sm",
            !isCompleted && "text-[#ccc]",
            router.asPath.startsWith(section.path)
              ? "text-gray-900 font-medium"
              : "text-gray-500"
          )}
        >
          {section.name}
        </p>
      </Link>
    </div>
  );
};
