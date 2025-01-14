import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";
import { getValueInfo } from "shared/info/helpers";

const InscritaParejaRegistroCivil = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.INSCRITA_PAREJA_REGISTRO_CIVIL
  )[0];

  return (
    <>
      {question !== undefined && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.INSCRITA_PAREJA_REGISTRO_CIVIL}
          question={question}
          cols={1}
        />
      )}
    </>
  );
};

export default InscritaParejaRegistroCivil;
