import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";

const PersonaFisicaOAutonomo = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.AUTONOMO_O_PERSONA_FISICA
  )[0];

  return (
    <>
      {question !== undefined && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.AUTONOMO_O_PERSONA_FISICA}
          question={question}
          cols={4}
        />
      )}
    </>
  );
};

export default PersonaFisicaOAutonomo;
