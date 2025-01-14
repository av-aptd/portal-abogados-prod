import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";

const TienesTrabajadores = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.TIENES_TRABAJADORES
  )[0];

  return (
    <>
      {question !== undefined && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.TIENES_TRABAJADORES}
          question={question}
          cols={1}
        />
      )}
    </>
  );
};

export default TienesTrabajadores;