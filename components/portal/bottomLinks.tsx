import {
  Panel,
  Expediente,
  Caso,
  Payments,
  Trial,
  Sales,
  Retention,
  Marketing,
  Accounting,
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
  Creditors,
  Reports,
  Changelog,
  Incidents,
  AdminTools,
} from "components/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

export const BottomLink = ({ link, isCompleted }: any) => {
  const router = useRouter();

  return (
    <Link
      href={isCompleted ? link.path : ""}
      className={clsx(
        router.asPath.startsWith(link.path) ? "text-white/100" : "text-white/40"
      )}
    >
      <div className="flex justify-center">
        {link.value == "panel" && <Panel className="h-6 w-6 " />}
        {link.value == "expediente" && <Expediente className="h-6 w-6" />}
        {link.value == "caso" && <Caso className="h-6 w-6" />}
        {link.value == "pagos" && <Payments className="h-6 w-6" />}
        {link.value == "clientes" && <Clients className="h-6 w-6" />}
        {link.value == "usuarios" && <Users className="h-6 w-6" />}
        {link.value == "validar-docs" && (
          <MenuValidarDocs className="h-6 w-6" />
        )}
        {link.value == "crear-usuario" && <MenuAddUser className="h-6 w-6" />}
        {link.value == "leads" && <MenuLeads className="h-6 w-6" />}
        {link.value == "acreedores" && <Creditors className="h-6 w-6" />}
        {link.value == "comercial" && <Sales className="h-6 w-6" />}
        {link.value == "contabilidad" && (
          <MenuPaymentsSituation className="h-6 w-6" />
        )}
        {link.value == "crear-pago" && <MenuAddPayment className="h-6 w-6" />}
        {link.value == "retencion" && <Retention className="h-6 w-6" />}
        {link.value == "admin" && <Admin className="h-6 w-6" />}
        {link.value == "herramientas-procesal" && (
          <MenuTools className="h-6 w-6" />
        )}
        {link.value == "herramientas-admin" && (
          <AdminTools className="h-6 w-6" />
        )}
        {link.value == "changelog" && <Changelog className="h-6 w-6" />}

        {link.value == "incidencias" && <Incidents className="h-6 w-6" />}
        {link.value == "reports" && <Reports className="h-6 w-6" />}
        {link.value == "notificaciones-procesal" && (
          <MenuNotifications className="h-6 w-6" />
        )}
        {link.value == "documentacion-procesal" && (
          <MenuDocsGeneration className="h-6 w-6" />
        )}
        {link.value == "marketing" && <Marketing className="h-6 w-6" />}
        {link.value == "admin" && <Admin className="h-6 w-6" />}
        {link.value == "notificaciones" && (
          <Notifications className="h-6 w-6" />
        )}
        {link.value == "mailing" && <Mailing className="h-6 w-6" />}
        {link.value == "transcripciones" && <Transcripts className="h-6 w-6" />}
      </div>

      <p
        className={clsx(
          "text-[12px] text-white text-center pt-1",
          router.asPath.startsWith(link.path)
            ? "text-white/100"
            : "text-white/40"
        )}
      >
        {link.name}
      </p>
    </Link>
  );
};
