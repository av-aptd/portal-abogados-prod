import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";

const help = [
  `
  <p>Indica si también tu cónyuge está haciendo la Ley de la Segunda Oportunidad actualmente.</p>
`,
];

const HaSolicitadoConyugeConcurso = () => {
  const answer = usePreguntasStore((state) => state.answer);
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
      groupKey: "hasolicitadoconyugeconcurso",
      groupNextKey: "autonomoopersonafisica",
      properties: [
        {
          propertyKey: "haSolicitadoConyugeConcurso",
          propertyValue: answer.selected,
        },
      ],
    });
    setCurrentQuestion("autonomoopersonafisica");
  };

  return (
    <>
      <Question
        title="¿ha solicitado el conyuge el concurso?"
        type={QuestionType.Buttons}
        options={[
          { label: "Sí", value: "yes" },
          { label: "No", value: "no" },
        ]}
        nextStep={nextStep}
      />
    </>
  );
};

export default HaSolicitadoConyugeConcurso;
