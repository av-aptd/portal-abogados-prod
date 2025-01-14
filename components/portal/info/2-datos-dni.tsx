import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient } from "shared/helpers";
import React from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";

const DatosDNI = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.DATOSDNI
  )[0];

  return (
    <>
      {question !== undefined && (
        <DisplayQuestion
          colNames={COLUMNS_DISPLAY.DNI_CLIENTE}
          question={question}
          cols={4}
          isMultiple={false}
          valueTypes={[
            {
              valueType: "date",
              suffix: "",
              key: "dniExpiration",
            },
            {
              valueType: "string",
              suffix: "",
              key: "dni",
            },
            {
              valueType: "date",
              suffix: "",
              key: "birthDate",
            },
            {
              valueType: "string",
              suffix: "",
              key: "birthPlace",
            },
            {
              valueType: "string",
              suffix: "",
              key: "nationality",
            },
          ]}
        />
      )}
    </>
  );
};

export default DatosDNI;
