import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";

const help = [
  `
  <p>Marca <strong>SI</strong> si a día de hoy la empresa tiene en nómina a algún trabajador. En tal caso, rellena la información solicitada.</p>
`,
];

const TienesTrabajadores = () => {
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
    if (answer.selected === "yes") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "tienestrabajadores",
        groupNextKey: "plantillatrabajadores",
        properties: [
          {
            propertyKey: "tienesTrabajadores",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("plantillatrabajadores");
    }
    if (answer.selected === "no") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "tienestrabajadores",
        groupNextKey: "tienesbienesactivos",
        properties: [
          {
            propertyKey: "tienesTrabajadores",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("tienesbienesactivos");
    }
  };

  return (
    <>
      <Question
        title="¿Tienes trabajadores?"
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

export default TienesTrabajadores;
