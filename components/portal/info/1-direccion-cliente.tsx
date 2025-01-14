import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";

const DireccionCliente = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOSRESIDENCIA
  )[0];

  return (
    <>
      {question !== undefined && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.DIRECCION_CLIENTE}
          question={question}
          cols={4}
        />
      )}
    </>
  );
};

export default DireccionCliente;
