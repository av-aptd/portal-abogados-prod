import React, { useState } from "react";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import clsx from "clsx";
import LeadInfoQuestions from "components/portal/estudio/questions";
import LoadingContainer from "../loading";
import ClientInfoQuestions from "components/portal/info";
import { EmptyFolder } from "components/icons";

const QuestionsBloc = ({
  questionsEstudioEconomicoQuery,
  userQuestionsQuery,
  userInfoQuery,
}: any) => {
  const [statusQuestions, setStatusQuestions] = useState<number>(0);

  const tabsQuestions = [
    { name: "Estudio económico", value: 0 },
    { name: "Portal", value: 1 },
  ];

  return (
    <SectionBloc
      title="Preguntas"
      description="Listado de las preguntas respondidas por el cliente."
    >
      <div className="mb-4">
        <div className="sm:hidden">
          <label htmlFor="tabsQuestions" className="sr-only">
            Select a tab
          </label>

          <select
            id="tabsQuestions"
            name="tabsQuestions"
            onChange={(e) => setStatusQuestions(Number(e.target.value))}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
          >
            {tabsQuestions.map((tab) => (
              <option key={tab.name} value={tab.value}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabsQuestions.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setStatusQuestions(tab.value)}
                  className={clsx(
                    tab.value == statusQuestions
                      ? "border-secondary text-secondary"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {statusQuestions == 0 && (
        <>
          {questionsEstudioEconomicoQuery.isLoading ? (
            <></>
          ) : (
            <div className="">
              <LeadInfoQuestions
                questions={questionsEstudioEconomicoQuery.data.answers}
              />
            </div>
          )}{" "}
        </>
      )}

      {statusQuestions == 1 && (
        <>
          {userQuestionsQuery.isLoading || userInfoQuery.isLoading ? (
            <LoadingContainer />
          ) : (
            <>
              {userInfoQuery.data.isProfileCompleted ? (
                <>
                  {userQuestionsQuery.data.length > 0 ? (
                    <ClientInfoQuestions type="detailed" />
                  ) : (
                    <div className="text-gray-500 text-center text-sm">
                      Cliente antiguo revisar
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8">
                  <EmptyFolder className="text-gray-500 w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 text-center">
                    Todavía no ha finalizado todas las preguntas iniciales.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </SectionBloc>
  );
};

export default QuestionsBloc;
