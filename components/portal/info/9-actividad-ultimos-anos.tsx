import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";

const ActividadUltimosAnos = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.ACTIVIDAD_ULTIMOS
  )[0];

  return (
    <>
      {question !== undefined && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.ACTIVIDAD_ULTIMOS}
          question={question}
          cols={1}
        />
      )}
    </>
  );
};

export default ActividadUltimosAnos;
