import { getQuestionLead, QUESTION_OPERATORS } from "shared/helpers";
import React from "react";

import { LEAD_QUESTIONS_GROUP_KEY } from "enums/questionsLeadGroupKey.enum";
import { LEAD_COLUMNS_DISPLAY } from "./colNamesLead.enum";
import DisplayLeadQuestion from "./components/displayLeadQuestion";

const Leadtienes2MasDeudas = ({ questions }: any) => {
  const leadQuestions = questions.questions;

  const question = getQuestionLead(
    leadQuestions,
    LEAD_QUESTIONS_GROUP_KEY.DOS_O_MAS_DEUDAS
  )[0];

  return (
    <>
      {question !== undefined && (
        <DisplayLeadQuestion
          colNames={LEAD_COLUMNS_DISPLAY.DOS_O_MAS_DEUDAS}
          question={question}
          cols={1}
        />
      )}
    </>
  );
};
export default Leadtienes2MasDeudas;
