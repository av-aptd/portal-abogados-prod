import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";

const help = [
  `<p>Marca <strong>SI</strong> en caso de tener cualquier otro bien en propiedad, ya sea total o parcialmente: vivienda habitual, segunda vivienda, local, vehículo, suelo, plan de pensiones, parking, etc.</p>
  <p> Marca <strong>NO</strong> si no tienes ningún bien en propiedad.</p>
`,
];

const TienesBienesActivos = () => {
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
        groupKey: "tienesbienesactivos",
        groupNextKey: "eligeactivosqueposees",
        properties: [
          {
            propertyKey: "tienesBienesActivos",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("eligeactivosqueposees");
    }
    if (answer.selected === "no") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "tienesbienesactivos",
        groupNextKey: "erestitulardetcuentasbancarias",
        properties: [
          {
            propertyKey: "tienesBienesActivos",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("erestitulardetcuentasbancarias");
    }
  };

  return (
    <>
      <Question
        title="¿Tienes bienes o activos?"
        description="Coche, herencia, parking, participaciones o hipoteca."
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

export default TienesBienesActivos;
