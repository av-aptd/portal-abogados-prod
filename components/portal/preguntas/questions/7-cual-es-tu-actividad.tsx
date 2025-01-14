import React, { useEffect } from "react";
import { usePortalStore } from "store/portal";
import { usePreguntasStore } from "store/preguntas";
import Nav from "../nav";
import Question from "../question";
import { QuestionType } from "../question";
import { useUIStore } from "store/ui";

const help = [
  `<p>Indica cuál es tu profesión o actividad económica.</p>
  <p>Si actualmente no estás trabajando, haznos saber cuál es tu situación: desempleado, jubliado, etc.</p>
`,
];

const CualEsTuActividad = () => {
  const answer = usePreguntasStore((state) => state.answer);
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
    insertAnswer({
      userId: profile.id,
      groupValue: answer.title,
      groupKey: "cualestuactividad",
      groupNextKey: "actividadlosultimos3",
      properties: [
        {
          propertyKey: "cualEsTuActividad",
          propertyValue: answer.selected,
        },
      ],
    });

    setCurrentQuestion("actividadlosultimos3");
  };

  return (
    <>
      <Question
        title="¿Cuál es tu actividad profesional, empresarial o asimilada?"
        type={QuestionType.Text}
        nextStep={nextStep}
      />
    </>
  );
};

export default CualEsTuActividad;
