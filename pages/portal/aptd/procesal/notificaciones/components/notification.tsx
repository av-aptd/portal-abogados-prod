import { Ring } from "@uiball/loaders";
import clsx from "clsx";
import React from "react";
import { formatDate } from "shared/helpers";

const getNotificationPropertyValue = (body: any, property: string) => {
  try {
    return body[property];
  } catch {
    return "";
  }
};

const AtomianNotification = ({
  notification,
  mutation,
  personIdx,
  locale,
  mostrarModal,
  showResult,
  getDocs,
  procesar,
  showRetry,
}: any) => {
  console.log(notification.errorMessage);

  return (
    <div
      key={notification.id}
      className="flex mb-4 space-x-4 rounded-lg border"
    >
      <div className="flex-1 p-4 border-r">
        <div className="grid grid-cols-3">
          <div className="pb-2">
            <p className="text-gray-400 text-sm">Fecha</p>
            <p className="text-sm">
              {formatDate(notification.created_at, "short", locale)}
            </p>
          </div>

          <div className="pb-2">
            <p className="text-gray-400 text-sm">Resolución</p>
            <p className="text-sm">
              {JSON.parse(notification.body).resolucion["fecha resolucion"]}
            </p>
          </div>

          <div className="pb-2">
            <p className="text-gray-400 text-sm">Requerimientos</p>
            <p className="text-sm">
              {getNotificationPropertyValue(
                JSON.parse(notification.body).resolucion["requerimientos"][0],
                "plazo"
              )}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3">
          {getNotificationPropertyValue(
            JSON.parse(notification.body).procedimiento.partes.filter(
              (f: any) => f["tipo parte"] === "demandante"
            )[0],
            "nombre"
          ) && (
            <div className="pb-2">
              <p className="text-gray-400 text-sm">Demandante</p>
              <p className="text-gray-700 text-sm">
                {getNotificationPropertyValue(
                  JSON.parse(notification.body).procedimiento.partes.filter(
                    (f: any) => f["tipo parte"] === "demandante"
                  )[0],
                  "nombre"
                )}
              </p>
            </div>
          )}

          {getNotificationPropertyValue(
            JSON.parse(notification.body).procedimiento.partes.filter(
              (f: any) => f["tipo parte"] === "demandada"
            )[0],
            "nombre"
          ) && (
            <div className="pb-2">
              <p className="text-gray-400 text-sm">Demandado</p>
              <p className="text-gray-700 text-sm">
                {getNotificationPropertyValue(
                  JSON.parse(notification.body).procedimiento.partes.filter(
                    (f: any) => f["tipo parte"] === "demandada"
                  )[0],
                  "nombre"
                )}
              </p>
            </div>
          )}

          <div className="pb-2">
            <p className="text-gray-400 text-sm">Núm. autos</p>
            <p className="text-gray-700 text-sm">
              {" "}
              {JSON.parse(notification.body).procedimiento["numero autos"]}
            </p>
          </div>
        </div>

        {JSON.parse(notification.body).resolucion["hito"] && (
          <div className="pb-2">
            <p className="text-gray-400 text-sm">Hito</p>
            <p className="text-sm">
              {JSON.parse(notification.body).resolucion["hito"]}
            </p>
          </div>
        )}

        {JSON.parse(notification.body).resolucion["hito_origin"] && (
          <div className="pb-2">
            <p className="text-gray-400 text-sm">Hito Origin</p>
            <p className="text-sm">
              {JSON.parse(notification.body).resolucion["hito_origin"]}
            </p>
          </div>
        )}
        {notification.errorMessage?.length > 0 && (
          <p className="text-red-400 text-sm">
            Error: {notification.errorMessage}
          </p>
        )}
      </div>

      <div className="flex flex-col space-y-2 p-4">
        <button onClick={() => showResult(notification)}>
          <span
            className={clsx(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ",

              notification.status === 0 && "bg-yellow-100 text-yellow-800",
              notification.status === 1 && "bg-green-100 text-green-800"
            )}
          >
            {notification.status === 0
              ? "Pendiente"
              : notification.status === 1 && "Ejecutado"}
          </span>
        </button>

        <button
          onClick={() => getDocs(notification.id)}
          className="border text-xs p-2 bg-white rounded-lg"
        >
          ver documentos
        </button>

        {notification.status == 0 && (
          <button
            disabled={mutation.isLoading}
            onClick={() => procesar(notification.id)}
            className="bg-secondary text-xs text-white p-2 rounded-lg flex justify-center"
          >
            {mutation.isLoading ? <Ring color="#fff" size={16} /> : "Procesar"}
          </button>
        )}
        {notification.status == 2 && (
          <button
            onClick={() => showRetry(notification)}
            className="text-secondary hover:text-blue-700"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};

export default AtomianNotification;
