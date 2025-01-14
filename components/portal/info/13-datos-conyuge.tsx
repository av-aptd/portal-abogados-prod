import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";

const DatosConyuge = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOS_CONYUGE
  )[0];

  return (
    <>
      {question != undefined && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.DATOS_CONYUGE}
          question={question}
          cols={1}
        />
      )}
    </>
  );
};

export default DatosConyuge;
