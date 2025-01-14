import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";

const help = [
  `
  <p>En el caso de la pareja de hecho, no es obligatorio inscribirse en el Registro Civil. Indica si en tu caso os habéis inscrito o no.</p>
`,
];

const InscritaParejaRegistroCivil = () => {
  const answer = usePreguntasStore((state) => state.answer);
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const profile = usePortalStore((state) => state.profile);
  const setHelp = useUIStore((state) => state.setHelp);

  useEffect(() => {
    setHelp(help);
  }, []);

  const nextStep = () => {
    if (answer.selected === "yes") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "inscritaparejaregistrocivil",
        groupNextKey: "fechainscripcion",
        properties: [
          {
            propertyKey: "inscritaParejaRegistroCivil",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("fechainscripcion");
    }
    if (answer.selected === "no") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "inscritaparejaregistrocivil",
        groupNextKey: "cuantaspersonasdependendeti",
        properties: [
          {
            propertyKey: "inscritaParejaRegistroCivil",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("cuantaspersonasdependendeti");
    }
  };

  return (
    <>
      <Question
        title="¿Esta inscrita la pareja de hecho en el registro civil?"
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

export default InscritaParejaRegistroCivil;
