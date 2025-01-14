import React, { useEffect } from "react";
import { usePortalStore } from "store/portal";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { useUIStore } from "store/ui";

const help = [
  `<p>Indícanos cuál ha sido tu situación laboral durante los últimos 3 años: si has estado trabajando o no todo este tiempo, si eras autónomo o tenías una empresa, si te quedaste en el paro, etc.</p>
`,
];

const CualHaSidoTuActividadUltimos = () => {
  const answer = usePreguntasStore((state) => state.answer);
  const answers = usePortalStore((state) => state.answers);
  const addAnswer = usePreguntasStore((state) => state.addAnswer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const profile = usePortalStore((state) => state.profile);
  const setHelp = useUIStore((state) => state.setHelp);

  useEffect(() => {
    setHelp(help);
  }, []);

  const nextStep = () => {
    addAnswer({
      title: answer.title,
      selected: answer.selected,
      questionKey: "actividadlosultimos3",
      nextQuestionKey: "confirmasituacioninsolvencia",
    });

    insertAnswer({
      userId: profile.id,
      groupValue: answer.title,
      groupKey: "actividadlosultimos3",
      groupNextKey: "confirmasituacioninsolvencia",
      properties: [
        {
          propertyKey: "actividadLosUltimos3",
          propertyValue: answer.selected,
        },
      ],
    });

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

    insertAnswer({
      userId: profile.id,
      groupValue: "Según tus respuestas anteriores tienes una insolvencia",
      groupKey: "confirmasituacioninsolvencia",
      groupNextKey: "motivossituacioninsolvencia",
      properties: [
        {
          propertyKey: "tipoInsolvencia",
          propertyValue: initial,
        },
      ],
    });

    setCurrentQuestion("motivossituacioninsolvencia");
  };

  return (
    <>
      <Question
        title="¿Cuál ha sido tu actividad en los últimos 3 años?"
        type={QuestionType.Text}
        size="large"
        nextStep={nextStep}
      />
    </>
  );
};

export default CualHaSidoTuActividadUltimos;
