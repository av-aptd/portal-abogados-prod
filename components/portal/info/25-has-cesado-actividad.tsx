import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";
import { getValueInfo } from "shared/info/helpers";

const HasCesadoActividad = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.HAS_CESADO_ACTIVIDAD
  )[0];

  return (
    <>
      {question !== undefined && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.HAS_CESADO_ACTIVIDAD}
          question={question}
          cols={1}
        />
      )}
    </>
  );
};

export default HasCesadoActividad;
