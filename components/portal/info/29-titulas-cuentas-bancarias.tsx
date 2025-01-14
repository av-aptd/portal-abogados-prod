import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";

const EresTitularCuentasBancarias = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.TITULAR_CUENTAS_BANCARIAS
  )[0];

  return (
    <>
      {question !== undefined && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.TITULAR_CUENTAS_BANCARIAS}
          question={question}
          cols={1}
        />
      )}
    </>
  );
};

export default EresTitularCuentasBancarias;
