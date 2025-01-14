import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient, QUESTION_OPERATORS } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";

const NumerosCuentasSaldo = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.NUMEROS_CUENTAS_SALDO,
    QUESTION_OPERATORS.STARTS_WITH
  );

  return (
    <>
      {question.length > 0 && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.NUMEROS_CUENTAS_SALDO}
          question={question}
          cols={6}
          isMultiple
        />
      )}
    </>
  );
};

export default NumerosCuentasSaldo;
