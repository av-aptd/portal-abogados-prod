import clsx from "clsx";
import { Questions, Check, Warning } from "components/icons";
import Link from "next/link";
import React from "react";
import { usePortalStore } from "store/portal";

const PreguntasPanel = () => {
  const clientInfo = usePortalStore((state) => state.clientInfo);

  const isQuestionsAnswered = () => {
    if (clientInfo?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b flex justify-between items-center p-4 bg-gray-50">
        <div className="flex space-x-2 items-center">
          <Questions className="w-6 h-6 text-gray-400" />
          <h3 className="text-gray-700">Preguntas requeridas</h3>
        </div>
        <div>
          {isQuestionsAnswered() ? (
            <Check className="w-6 h-6 text-secondary" />
          ) : (
            <Warning className="w-6 h-6 text-red-400" />
          )}
        </div>
      </div>
      <div className="p-4">
        <p
          className={clsx(
            isQuestionsAnswered() ? "text-gray-500" : "text-red-400",
            "text-sm"
          )}
        >
          {isQuestionsAnswered()
            ? "Has respondido a todas las preguntas."
            : "Todavía no has finalizado las preguntas requeridas."}
        </p>

        <div className="flex justify-end">
          <Link
            href={
              isQuestionsAnswered()
                ? `/portal/clientes/panel/cuestionario`
                : `/portal/clientes/preguntas`
            }
            className="border text-sm p-2 rounded-lg mt-4 inline-block text-gray-500 hover:bg-gray-50 duration-150"
          >
            {isQuestionsAnswered() ? "ver preguntas" : "Finalizar preguntas"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PreguntasPanel;
