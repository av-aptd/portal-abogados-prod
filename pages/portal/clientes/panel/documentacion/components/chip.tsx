import clsx from "clsx";
import { Check, Pending, Warning } from "components/icons";
import React from "react";

const ChipStatus = ({ filesUploaded, docType, index }: any) => {
  const status = (index: any) => {
    if (
      filesUploaded.filter(
        (doc: any) =>
          doc.status == 0 && doc.name == `${docType.name} - ${index + 1}`
      ).length > 0
    )
      return "revision";

    if (
      filesUploaded.filter(
        (doc: any) =>
          doc.status == 1 && doc.name == `${docType.name} - ${index + 1}`
      ).length > 0
    )
      return "aprobado";

    if (
      filesUploaded.filter(
        (doc: any) =>
          doc.status == 2 && doc.name == `${docType.name} - ${index + 1}`
      ).length > 0
    )
      return "rechazado";

    return "pendiente";
  };

  return (
    <>
      {status(index) == "pendiente" && (
        <div
          className={clsx("px-2 py-1 bg-gray-200 rounded-full inline-block")}
        >
          <h3 className="text-xs text-center text-gray-700">
            Pendiente de subir
          </h3>
        </div>
      )}
      {status(index) == "revision" && (
        <div
          className={clsx(
            "px-2 py-1 bg-yellow-100 rounded-full inline-flex items-center space-x-2"
          )}
        >
          <Pending className="w-5 h-5 text-yellow-700" />
          <h3 className="text-xs text-center text-yellow-800">En revisión</h3>
        </div>
      )}
      {status(index) == "aprobado" && (
        <div
          className={clsx(
            "px-2 py-1 bg-green-100 rounded-full inline-flex items-center space-x-2"
          )}
        >
          <Check className="w-5 h-5 text-green-700" />
          <h3 className="text-xs text-center text-green-800">Aprobado</h3>
        </div>
      )}
      {status(index) == "rechazado" && (
        <div
          className={clsx(
            "px-2 py-1 bg-red-100 rounded-full inline-flex items-center space-x-2"
          )}
        >
          <Warning className="w-5 h-5 text-red-700" />
          <h3 className="text-xs text-center text-red-800">Rechazado</h3>
        </div>
      )}
    </>
  );
};

export default ChipStatus;
