import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient, QUESTION_OPERATORS } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";

const PlantillaTrabajadores = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.PLANTILLA_TRABAJADORES,
    QUESTION_OPERATORS.STARTS_WITH
  );

  return (
    <>
      {question.length > 0 && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.PLANTILLA_TRABAJADORES}
          question={question}
          cols={6}
          isMultiple
        />
      )}
    </>
  );
};

export default PlantillaTrabajadores;
