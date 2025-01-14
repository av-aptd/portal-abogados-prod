import { getQuestionLead, QUESTION_OPERATORS } from "shared/helpers";
import React from "react";
import DisplayLeadQuestion from "./components/displayLeadQuestion";
import { LEAD_QUESTIONS_GROUP_KEY } from "enums/questionsLeadGroupKey.enum";
import { LEAD_COLUMNS_DISPLAY } from "./colNamesLead.enum";

const LeadIngresosPareja = ({ questions }: any) => {
  const leadQuestions = questions.questions;

  const question = getQuestionLead(
    leadQuestions,
    LEAD_QUESTIONS_GROUP_KEY.INGRESOS_PAREJA
  )[0];

  return (
    <>
      {question !== undefined && (
        <DisplayLeadQuestion
          colNames={LEAD_COLUMNS_DISPLAY.INGRESOS_PAREJA}
          question={question}
          cols={1}
          valueType="number"
          suffix="€"
        />
      )}
    </>
  );
};

export default LeadIngresosPareja;
