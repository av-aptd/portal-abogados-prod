import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";
import { getValueInfo } from "shared/info/helpers";

const CopropietariosViviendaHabitual = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.COPROPIETARIOS_VIVIENDA_HABITUAL
  )[0];

  return (
    <>
      {question !== undefined && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.COPROPIETARIOS_VIVIENDA_HABITUAL}
          question={question}
          cols={1}
        />
      )}
    </>
  );
};

export default CopropietariosViviendaHabitual;
