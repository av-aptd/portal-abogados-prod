import React from "react";
import { usePreguntasStore } from "store/preguntas";
import { usePortalStore } from "store/portal";
import Question from "../question";
import { QuestionType } from "../question";
import Nav from "../nav";

const ConfirmaSituacionInsolvencia = () => {
  const answer = usePreguntasStore((state) => state.answer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const profile = usePortalStore((state) => state.profile);
  const answers = usePortalStore((state) => state.answers);

  let initial: any;

  if (answers.length > 0) {
    const q1 = answers?.filter(
      (f: any) => f.questionKey == "estasalcorrientedepago"
    )[0].selected;

    if (q1 == "no") {
      initial = "actual";
    } else {
      initial = "inminente";
    }
  }

  const nextStep = () => {
    insertAnswer({
      userId: profile.id,
      groupValue: answer.title,
      groupKey: "confirmasituacioninsolvencia",
      groupNextKey: "motivossituacioninsolvencia",
      properties: [
        {
          propertyKey: "tipoInsolvencia",
          propertyValue: answer.selected,
        },
      ],
    });

    setCurrentQuestion("motivossituacioninsolvencia");
  };

  return (
    <>
      <Question
        title="Según tus respuestas anteriores tienes una insolvencia"
        type={QuestionType.Buttons}
        initial={initial}
        options={[
          { label: "Actual", value: "actual" },
          { label: "Inminente", value: "inminente" },
        ]}
        nextStep={nextStep}
      />
    </>
  );
};

export default ConfirmaSituacionInsolvencia;
